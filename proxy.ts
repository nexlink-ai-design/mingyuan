import { NextRequest, NextResponse } from 'next/server';
import { getCurrentAuth } from '@/lib/auth';

// 不需要认证的公开路由
const PUBLIC_ROUTES = [
  '/',
  '/auth/login',
  '/auth/register',
  '/api/auth/send-code',
  '/api/auth/login',
  '/api/auth/logout',
  '/api/auth/verify',
];

// 需要认证的受保护路由
const PROTECTED_ROUTES = [
//   '/user',
//   '/playmate',
//   '/agent',
//   '/chat',
//   '/order',
//   '/review',
//   '/complaint',
//   '/payment',
];

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 检查是否是公开路由
  const isPublicRoute = PUBLIC_ROUTES.some(route =>
    pathname === route || pathname.startsWith(route + '/')
  );

  if (isPublicRoute) {
    return NextResponse.next();
  }

  // 检查是否是受保护的路由
  const isProtectedRoute = PROTECTED_ROUTES.some(route =>
    pathname.startsWith(route)
  );

  // 如果是受保护的路由或 API，检查认证并缓存用户信息到 cookies
  if (isProtectedRoute || pathname.startsWith('/api')) {
    try {
      const { authenticated, user } = await getCurrentAuth();

      const response = NextResponse.next();

      // 如果已认证，将用户信息缓存到 cookies
      if (authenticated && user) {
        // 缓存用户信息到单个 cookie，JSON 编码
        const userCache = {
          userId: user.userId,
          phone: user.phone,
          role: user.role,
          name: user.name,
          timestamp: Date.now(),
        };

        response.cookies.set('user_cache', JSON.stringify(userCache), {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 60 * 60 * 24, // 24 小时
          path: '/',
        });
      } else if (isProtectedRoute) {
        // 受保护路由但未认证，重定向到登录
        const loginUrl = new URL('/auth/login', request.url);
        loginUrl.searchParams.set('callbackUrl', pathname);
        return NextResponse.redirect(loginUrl);
      }

      return response;
    } catch (error) {
      // 认证检查出错，如果是受保护路由则重定向
      if (isProtectedRoute) {
        const loginUrl = new URL('/auth/login', request.url);
        loginUrl.searchParams.set('callbackUrl', pathname);
        return NextResponse.redirect(loginUrl);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // 排除静态资源和 Next.js 内部文件
    '/((?!.*\\..*|_next).*)',
  ],
};