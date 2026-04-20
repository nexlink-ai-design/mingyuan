'use server';

import { cookies } from 'next/headers';

import {
  loginErrorBodySchema,
  loginSchema,
  loginSuccessBodySchema,
  type LoginInput,
} from './schema';

export type LoginActionResult = {
  success: boolean;
  message: string;
  fieldErrors?: Partial<Record<keyof LoginInput, string[]>>;
};

const LOGIN_ENDPOINT = 'http://127.0.0.1:5007/api/v1/login';

async function parseResponseBody(response: Response): Promise<unknown> {
  const contentType = response.headers.get('content-type') ?? '';

  if (contentType.includes('application/json')) {
    return response.json();
  }

  const text = await response.text();
  return text ? { message: text } : null;
}

export async function loginAction(payload: LoginInput): Promise<LoginActionResult> {
  const validated = loginSchema.safeParse(payload);

  if (!validated.success) {
    return {
      success: false,
      message: '请求参数校验失败',
      fieldErrors: validated.error.flatten().fieldErrors,
    };
  }

  try {
    const response = await fetch(LOGIN_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validated.data),
      cache: 'no-store',
    });

    const responseBody = await parseResponseBody(response);

    if (response.ok) {
      const parsed = loginSuccessBodySchema.safeParse(responseBody);

      const token = parsed.success
        ? parsed.data.data?.token
        : (responseBody as Record<string, unknown> | null)?.data
            ? ((responseBody as Record<string, unknown>).data as Record<string, unknown>)?.token as string | undefined
            : undefined;

      if (!parsed.success) {
        console.warn('[loginAction] response.ok but schema mismatch:', JSON.stringify(responseBody));
      }

      if (token) {
        const cookieStore = await cookies();
        cookieStore.set('backend_auth_token', String(token), {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 7 * 24 * 60 * 60,
          path: '/',
        });
      }

      const body = responseBody as Record<string, unknown> | null;
      return {
        success: true,
        message: parsed.success
          ? parsed.data.message
          : typeof body?.message === 'string'
            ? body.message
            : 'login success',
      };
    }

    const parsedError = loginErrorBodySchema.safeParse(responseBody);

    if (parsedError.success) {
      return {
        success: false,
        message: parsedError.data.error || parsedError.data.message,
      };
    }

    return {
      success: false,
      message: `登录失败，接口返回 HTTP ${response.status}`,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : '无法连接登录服务',
    };
  }
}
