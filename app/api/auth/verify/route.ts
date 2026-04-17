import { NextRequest, NextResponse } from 'next/server';
import { getCurrentAuth } from '@/lib/auth';

/**
 * GET /api/auth/verify
 * 验证用户是否已登录
 */
export async function GET(request: NextRequest) {
  try {
    const { authenticated, user } = await getCurrentAuth();

    return NextResponse.json(
      {
        authenticated,
        user,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('验证失败:', error);
    return NextResponse.json(
      { authenticated: false, user: null },
      { status: 200 }
    );
  }
}
