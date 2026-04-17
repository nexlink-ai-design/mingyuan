/**
 * Lib + API 混合模式实现示例
 * 这些示例展示了如何在实际项目中使用改造后的认证系统
 * 将这些代码复制到你的项目中即可使用
 */

// ============================================================
// 示例 1: 服务器组件中获取用户信息
// ============================================================
// 文件: app/user/profile/page.tsx

// import { getCurrentUser } from '@/lib/auth';
// import { redirect } from 'next/navigation';
// 
// export default async function UserProfilePage() {
//   const user = await getCurrentUser();
// 
//   if (!user) {
//     redirect('/auth/login?callbackUrl=/user/profile');
//   }
// 
//   return (
//     <div className="p-8 max-w-md">
//       <h1 className="text-2xl font-bold mb-4">个人资料</h1>
//       
//       <div className="bg-gray-50 p-4 rounded-lg space-y-3">
//         <div>
//           <label className="text-sm text-gray-600">用户ID</label>
//           <p className="font-mono">{user.userId}</p>
//         </div>
//         <div>
//           <label className="text-sm text-gray-600">手机号</label>
//           <p>{user.phone}</p>
//         </div>
//         <div>
//           <label className="text-sm text-gray-600">用户名</label>
//           <p>{user.name}</p>
//         </div>
//         <div>
//           <label className="text-sm text-gray-600">身份</label>
//           <p className="capitalize">{user.role}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// ============================================================
// 示例 2: Server Action 中要求认证
// ============================================================
// 文件: app/actions.ts

// 'use server';
// 
// import { requireAuth } from '@/lib/auth';
// import { revalidatePath } from 'next/cache';
// 
// export async function updateUserName(formData: FormData) {
//   // 此函数要求用户必须已登录
//   const user = await requireAuth();
// 
//   const newName = formData.get('name') as string;
//   
//   // 更新数据库
//   console.log(`用户 ${user.userId} 更新了名字为: ${newName}`);
//   
//   // 重新验证缓存
//   revalidatePath('/user/profile');
//   
//   return { success: true, message: '更新成功' };
// }
// 
// // 在页面中使用
// // export default async function EditProfilePage() {
// //   return (
// //     <form action={updateUserName}>
// //       <input type="text" name="name" placeholder="新名字" />
// //       <button type="submit">更新</button>
// //     </form>
// //   );
// // }

// ============================================================
// 示例 3: API 路由中检查权限
// ============================================================
// 文件: app/api/user/orders/route.ts

// import { NextResponse } from 'next/server';
// import { requireAuth } from '@/lib/auth';
// 
// export async function GET() {
//   try {
//     const user = await requireAuth(); // 未登录会抛出错误
//     
//     // 返回该用户的订单
//     return NextResponse.json({
//       success: true,
//       userId: user.userId,
//       orders: [
//         { id: '1', title: '订单1', status: 'completed' },
//         { id: '2', title: '订单2', status: 'pending' },
//       ],
//     });
//   } catch (error) {
//     return NextResponse.json(
//       { error: '未授权' },
//       { status: 401 }
//     );
//   }
// }

// ============================================================
// 示例 4: 条件化内容（基于用户角色）
// ============================================================
// 文件: app/dashboard/page.tsx

// import { getCurrentUser } from '@/lib/auth';
// 
// export default async function DashboardPage() {
//   const user = await getCurrentUser();
// 
//   if (!user) {
//     return <div>请先登录</div>;
//   }
// 
//   const isAgent = user.role === 'agent';
//   const isCompanion = user.role === 'companion';
// 
//   return (
//     <div className="p-8">
//       <h1>欢迎, {user.name}</h1>
//       
//       <div className="mt-8 space-y-4">
//         {/* 所有用户可见 */}
//         <section className="p-4 bg-blue-50 rounded">
//           <h2>个人中心</h2>
//           <p>用户ID: {user.userId}</p>
//         </section>
//         
//         {/* 仅代理商可见 */}
//         {isAgent && (
//           <section className="p-4 bg-green-50 rounded">
//             <h2>代理商工作台</h2>
//             <p>管理你的团队成员</p>
//           </section>
//         )}
//         
//         {/* 仅名媛/陪玩可见 */}
//         {isCompanion && (
//           <section className="p-4 bg-pink-50 rounded">
//             <h2>陪玩工作间</h2>
//             <p>查看接单和排期</p>
//           </section>
//         )}
//       </div>
//     </div>
//   );
// }

// ============================================================
// 示例 5: 当前用户数据的组件
// ============================================================
// 文件: components/current-user-card.tsx

// import { getCurrentUser } from '@/lib/auth';
// 
// export async function CurrentUserCard() {
//   const user = await getCurrentUser();
// 
//   if (!user) {
//     return null;
//   }
// 
//   return (
//     <div className="bg-white p-4 rounded-lg shadow">
//       <h3 className="font-bold">{user.name}</h3>
//       <p className="text-sm text-gray-600">{user.phone}</p>
//       <p className="text-xs text-gray-500">身份: {user.role}</p>
//     </div>
//   );
// }

// ============================================================
// 示例 6: 多个 API 路由共享逻辑
// ============================================================
// 文件: app/api/user/info/route.ts

// import { NextResponse } from 'next/server';
// import { getCurrentAuth } from '@/lib/auth';
// 
// export async function GET() {
//   const { authenticated, user } = await getCurrentAuth();
//   
//   if (!authenticated) {
//     return NextResponse.json(
//       { error: '未登录' },
//       { status: 401 }
//     );
//   }
//   
//   return NextResponse.json({
//     user,
//     timestamp: new Date().toISOString(),
//   });
// }

// ============================================================
// 示例 7: 受保护的动态路由
// ============================================================
// 文件: app/playmate/[id]/profile/page.tsx

// import { use } from 'react';
// import { getCurrentUser } from '@/lib/auth';
// import { redirect } from 'next/navigation';
// 
// export default async function PlaymateProfilePage({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const { id } = use(params);
//   const user = await getCurrentUser();
// 
//   if (!user) {
//     redirect('/auth/login');
//   }
// 
//   if (user.role !== 'companion' && user.role !== 'agent') {
//     return <div>无权访问此页面</div>;
//   }
// 
//   return (
//     <div>
//       <h1>陪玩资料 - {id}</h1>
//     </div>
//   );
// }

// ============================================================
// 示例 8: 中间件中的身份验证（高级）
// ============================================================
// 文件: middleware.ts (可选高级用法)

// import { NextRequest, NextResponse } from 'next/server';
// import { getCurrentAuth } from '@/lib/auth';
// 
// export async function middleware(request: NextRequest) {
//   const pathname = request.nextUrl.pathname;
// 
//   // 检查受保护的路由
//   if (pathname.startsWith('/user') || pathname.startsWith('/playmate')) {
//     const { authenticated } = await getCurrentAuth();
// 
//     if (!authenticated) {
//       return NextResponse.redirect(
//         new URL(
//           `/auth/login?callbackUrl=${pathname}`,
//           request.url
//         )
//       );
//     }
//   }
// 
//   return NextResponse.next();
// }
// 
// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
// };

// ============================================================
// 示例 9: 构建自定义 Hook 来包装 Lib
// ============================================================
// 文件: hooks/useCurrentUser.ts

// import { use, useState, useEffect } from 'react';
// // 注意: 这个 hook 不能在客户端使用，因为 getCurrentUser 需要在服务器端
// // 如果需要在客户端使用，应该使用 useAuth() Hook
// 
// // 对于客户端，继续使用现有的 useAuth Hook
// import { useAuth } from '@/contexts/auth';
// 
// export function useCurrentUser() {
//   return useAuth().user;
// }

// ============================================================
// 示例 10: 在 Next.js Metadata 中展示用户信息
// ============================================================
// 文件: app/user/profile/page.tsx

// import { getCurrentUser } from '@/lib/auth';
// import type { Metadata } from 'next';
// 
// export async function generateMetadata(): Promise<Metadata> {
//   const user = await getCurrentUser();
// 
//   if (!user) {
//     return {
//       title: '登录 - 名媛选妃',
//     };
//   }
// 
//   return {
//     title: `${user.name}的资料 - 名媛选妃`,
//     description: `查看${user.name}的个人资料和信息`,
//   };
// }
// 
// export default async function Page() {
//   const user = await getCurrentUser();
//   return <div>{user?.name}</div>;
// }

export {};
