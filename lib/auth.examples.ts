/**
 * 服务器端认证使用示例
 * 展示如何在服务器组件和 Server Action 中使用 lib/auth
 */

/**
 * 例子 1: 在服务器组件中检查用户是否已登录
 * 使用方式: app/protected/page.tsx
 */
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

// export default async function ProtectedPage() {
//   const user = await getCurrentUser();
//
//   if (!user) {
//     redirect('/auth/login');
//   }
//
//   return (
//     <div>
//       <h1>欢迎, {user.name}</h1>
//       <p>用户ID: {user.userId}</p>
//     </div>
//   );
// }

/**
 * 例子 2: 在 Server Action 中要求用户必须登录
 * 使用方式: app/actions.ts
 */
// 'use server';
//
// import { requireAuth } from '@/lib/auth';
//
// export async function updateUserProfile(formData: FormData) {
//   const user = await requireAuth(); // 如果未登录会抛出错误
//
//   const name = formData.get('name');
//   console.log(`用户 ${user.userId} 更新了信息: ${name}`);
//
//   return { success: true };
// }

/**
 * 例子 3: 在 API 路由中检查权限
 * 使用方式: app/api/user/profile/route.ts
 */
// import { NextRequest, NextResponse } from 'next/server';
// import { requireAuth, hasRole } from '@/lib/auth';
//
// export async function GET(request: NextRequest) {
//   try {
//     const user = await requireAuth();
//
//     // 检查用户是否是陪玩身份
//     const isCompanion = user.role === 'companion';
//
//     return NextResponse.json({
//       user,
//       isCompanion,
//     });
//   } catch (error) {
//     return NextResponse.json(
//       { error: 'Unauthorized' },
//       { status: 401 }
//     );
//   }
// }

/**
 * 例子 4: 在中间件中检查身份验证
 * 使用方式: middleware.ts (高级用法)
 */
// import { NextRequest, NextResponse } from 'next/server';
// import { getCurrentAuth } from '@/lib/auth';
//
// export async function middleware(request: NextRequest) {
//   const pathname = request.nextUrl.pathname;
//
//   // 对于受保护的路由
//   if (pathname.startsWith('/user')) {
//     const { authenticated } = await getCurrentAuth();
//
//     if (!authenticated) {
//       return NextResponse.redirect(new URL('/auth/login', request.url));
//     }
//   }
//
//   return NextResponse.next();
// }

/**
 * 例子 5: 条件化的内容渲染
 * 使用方式: app/dashboard/page.tsx
 */
// import { getCurrentUser, hasRole } from '@/lib/auth';
//
// export default async function DashboardPage() {
//   const user = await getCurrentUser();
//   const isAgent = user && (await hasRole('agent'));
//
//   return (
//     <div>
//       {user && (
//         <div>
//           <p>欢迎 {user.name}</p>
//           {isAgent && (
//             <section>
//               <h2>代理商专区</h2>
//               {/* 仅代理商可见 */}
//             </section>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

/**
 * 例子 6: 获取多个用户数据（调试用）
 * 使用方式: app/api/debug/users/route.ts
 */
// import { getAllUsers } from '@/lib/auth';
// import { NextResponse } from 'next/server';
//
// export async function GET() {
//   if (process.env.NODE_ENV !== 'development') {
//     return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
//   }
//
//   const allUsers = getAllUsers();
//   return NextResponse.json({ users: allUsers });
// }

export {};
