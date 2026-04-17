import { NextRequest, NextResponse } from 'next/server';
import { sendVerificationCode } from '@/lib/auth';

/**
 * POST /api/auth/send-code
 * 发送验证码到手机号
 */
export async function POST(request: NextRequest) {
  try {
    const { phone } = await request.json();

    const result = await sendVerificationCode(phone);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: result.error?.includes('60秒') ? 429 : 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: result.message,
        code: result.code,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('发送验证码失败:', error);
    return NextResponse.json(
      { error: '发送验证码失败，请稍后重试' },
      { status: 500 }
    );
  }
}
