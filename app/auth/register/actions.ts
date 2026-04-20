'use server';

import {
  registerErrorBodySchema,
  registerSchema,
  registerSuccessBodySchema,
  type RegisterInput,
  type RegisterSuccessBody,
} from './schema';

export type RegisterActionResult = {
  success: boolean;
  message: string;
  data?: RegisterSuccessBody['data'];
  fieldErrors?: Partial<Record<keyof RegisterInput, string[]>>;
};

const REGISTER_ENDPOINT = 'http://127.0.0.1:5007/api/v1/register';

async function parseResponseBody(response: Response): Promise<unknown> {
  const contentType = response.headers.get('content-type') ?? '';

  if (contentType.includes('application/json')) {
    return response.json();
  }

  const text = await response.text();
  return text ? { message: text } : null;
}

export async function registerAction(payload: RegisterInput): Promise<RegisterActionResult> {
  const validated = registerSchema.safeParse(payload);

  if (!validated.success) {
    return {
      success: false,
      message: '请求参数校验失败',
      fieldErrors: validated.error.flatten().fieldErrors,
    };
  }

  try {
    const response = await fetch(REGISTER_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validated.data),
      cache: 'no-store',
    });

    const responseBody = await parseResponseBody(response);

    // HTTP 2xx → 注册成功，宽松提取 data，不因 schema 不匹配而判定失败
    if (response.ok) {
      const parsed = registerSuccessBodySchema.safeParse(responseBody);

      if (parsed.success) {
        return {
          success: true,
          message: parsed.data.message,
          data: parsed.data.data,
        };
      }

      // schema 不完全匹配时记录日志并尝试宽松提取
      console.warn('[registerAction] response.ok but schema mismatch:', JSON.stringify(responseBody));

      const body = responseBody as Record<string, unknown> | null;
      const rawData = (body?.data ?? {}) as Record<string, unknown>;

      return {
        success: true,
        message: typeof body?.message === 'string' ? body.message : 'register success',
        data: {
          id: Number(rawData.id ?? 0),
          uid: Number(rawData.uid ?? 0),
          username: String(rawData.username ?? ''),
          nickname: String(rawData.nickname ?? ''),
        },
      };
    }

    const parsedError = registerErrorBodySchema.safeParse(responseBody);

    if (parsedError.success) {
      return {
        success: false,
        message: parsedError.data.error || parsedError.data.message,
      };
    }

    console.warn('[registerAction] non-ok response body:', JSON.stringify(responseBody));

    return {
      success: false,
      message: `注册失败，接口返回 HTTP ${response.status}`,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : '无法连接注册服务',
    };
  }
}