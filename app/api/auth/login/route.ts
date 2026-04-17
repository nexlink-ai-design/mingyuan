import { NextRequest, NextResponse } from 'next/server';
import { verifyAndLogin, setAuthCookies } from '@/lib/auth';

/**
 * POST /api/auth/login
 * 验证码登录
 */
export async function POST(request: NextRequest) {
  try {
    const { phone, code, role } = await request.json();

    // 验证和登录
    const result = await verifyAndLogin(phone, code, role);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }

    // 设置认证 Cookies
    await setAuthCookies(result.user!);

    return NextResponse.json(
      {
        success: true,
        message: '登录成功',
        user: {
          userId: result.user!.userId,
          phone: result.user!.phone,
          role: result.user!.role,
          name: result.user!.name,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('登录失败:', error);
    return NextResponse.json(
      { error: '登录失败，请稍后重试' },
      { status: 500 }
    );
  }
}
