import { NextRequest, NextResponse } from 'next/server';
import { clearAuthCookies } from '@/lib/auth';

/**
 * POST /api/auth/logout
 * 退出登录
 */
export async function POST(request: NextRequest) {
  try {
    await clearAuthCookies();

    return NextResponse.json(
      { success: true, message: '已退出登录' },
      { status: 200 }
    );
  } catch (error) {
    console.error('退出登录失败:', error);
    return NextResponse.json(
      { error: '退出登录失败' },
      { status: 500 }
    );
  }
}
