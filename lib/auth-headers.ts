/**
 * @file 从中间件缓存读取用户信息的工具
 * @description 提供便利函数在服务器组件和API路由中读取中间件缓存的用户信息
 * 
 * 工作原理：
 * 1. 中间件验证用户身份后，将用户信息缓存到 user_cache cookie
 * 2. 后续服务器端代码从该 cookie 中读取用户信息
 * 
 * 使用场景：
 * 1. 在 Server Actions 中读取当前用户
 * 2. 在 API 路由中读取当前用户
 * 3. 在 Server Components 中读取当前用户
 */

import { cookies } from 'next/headers';
import { User } from '@/lib/auth';

/**
 * 从中间件缓存中获取用户信息（异步函数）
 * @description 从 user_cache cookie 中解析用户信息
 * 
 * 使用示例：
 * ```typescript
 * // 在 Server Action 中
 * 'use server';
 * import { getUserFromCache } from '@/lib/auth-headers';
 * 
 * export async function myAction() {
 *   const user = await getUserFromCache();
 *   if (!user) {
 *     return { error: '未登录' };
 *   }
 *   console.log('当前用户:', user.userId);
 * }
 * ```
 * 
 * @returns Promise<User | null> - 用户信息或 null（未登录）
 */
export async function getUserFromCache(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const userCacheStr = cookieStore.get('user_cache')?.value;

    if (!userCacheStr) {
      return null;
    }

    const userCache = JSON.parse(userCacheStr);
    const user: User = {
      userId: userCache.userId || '',
      phone: userCache.phone || '',
      role: userCache.role || '',
      name: userCache.name || '',
    };

    return user;
  } catch (error) {
    console.error('从缓存获取用户信息失败:', error);
    return null;
  }
}

/**
 * 从中间件缓存中要求用户已认证（异步函数）
 * @description 获取用户信息，如果未登录会立即抛出错误
 * 
 * 使用示例：
 * ```typescript
 * export async function protectedAction() {
 *   const user = await requireUserFromCache(); // 如果未认证会抛出错误
 *   // 这里保证 user 一定存在
 *   await deleteOrder(user.userId);
 * }
 * ```
 * 
 * @returns Promise<User> - 用户信息
 * @throws Error - 如果用户未认证或 session 已过期
 */
export async function requireUserFromCache(): Promise<User> {
  const user = await getUserFromCache();
  if (!user) {
    throw new Error('Unauthorized: 用户未登录或 session 已过期');
  }
  return user;
}

/**
 * 仅从缓存中获取用户 ID
 * @description 轻量级函数，只需要用户 ID 时使用（异步）
 * 
 * @returns Promise<string | null> - 用户 ID 或 null
 */
export async function getUserIdFromCache(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    const userCacheStr = cookieStore.get('user_cache')?.value;

    if (!userCacheStr) {
      return null;
    }

    const userCache = JSON.parse(userCacheStr);
    return userCache.userId || null;
  } catch {
    return null;
  }
}

/**
 * 检查当前用户是否已通过缓存认证
 * @description 快速检查缓存中是否存在有效的用户信息（异步）
 * 
 * @returns Promise<boolean>
 */
export async function isAuthenticatedFromCache(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const userCacheStr = cookieStore.get('user_cache')?.value;
    return !!userCacheStr;
  } catch {
    return false;
  }
}

/**
 * 从缓存中检查用户是否具有指定角色
 * @description 需要异步调用，获取缓存后检查角色
 * 
 * @param role 要检查的角色
 * @returns Promise<boolean>
 */
export async function hasRoleFromCache(role: string): Promise<boolean> {
  try {
    const user = await getUserFromCache();
    return user?.role === role;
  } catch {
    return false;
  }
}

/**
 * 从缓存中获取用户电话号码
 * @description 仅获取电话，比获取整个对象更轻量（异步）
 * 
 * @returns Promise<string | null>
 */
export async function getUserPhoneFromCache(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    const userCacheStr = cookieStore.get('user_cache')?.value;

    if (!userCacheStr) {
      return null;
    }

    const userCache = JSON.parse(userCacheStr);
    return userCache.phone || null;
  } catch {
    return null;
  }
}

