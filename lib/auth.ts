/**
 * 认证核心逻辑库
 * 服务器端使用，提供所有认证相关的函数
 */

import { cookies } from 'next/headers';

// 类型定义
export interface User {
  userId: string;
  phone: string;
  role: string;
  name: string;
}

export interface AuthResult {
  authenticated: boolean;
  user: User | null;
}

export interface VerificationCode {
  code: string;
  expires: number;
  attempts: number;
}

// 模拟数据存储（生产环境应使用数据库）
const verificationCodes = new Map<string, VerificationCode>();
const users = new Map<string, User>();

/**
 * 发送验证码
 * @param phone 手机号
 * @returns { success, error?, code? }
 */
export async function sendVerificationCode(phone: string) {
  // 验证手机号格式
  if (!phone || !/^1[3-9]\d{9}$/.test(phone)) {
    return { success: false, error: '无效的手机号码' };
  }

  // 检查是否频繁请求
  const stored = verificationCodes.get(phone);
  if (stored && Date.now() < stored.expires - 55000) {
    return {
      success: false,
      error: '验证码已发送，请稍候再试（60秒内只能发送一次）',
    };
  }

  // 生成6位验证码
  const code = Math.floor(Math.random() * 900000 + 100000).toString();
  const expiresIn = 10 * 60 * 1000; // 10分钟过期

  // 存储验证码
  verificationCodes.set(phone, {
    code,
    expires: Date.now() + expiresIn,
    attempts: 0,
  });

  // TODO: 调用真实的短信服务（腾讯云、阿里云等）
  console.log(`[DEBUG] 验证码已发送到 ${phone}：${code}`);

  return {
    success: true,
    message: '验证码已发送',
    code: process.env.NODE_ENV === 'development' ? code : undefined,
  };
}

/**
 * 验证验证码并登录
 * @param phone 手机号
 * @param code 验证码
 * @param role 用户身份
 * @returns { success, user?, error? }
 */
export async function verifyAndLogin(phone: string, code: string, role: string) {
  // 参数验证
  if (!phone || !code || !role) {
    return { success: false, error: '缺少必要参数' };
  }

  if (!/^1[3-9]\d{9}$/.test(phone)) {
    return { success: false, error: '无效的手机号码' };
  }

  if (!/^\d{6}$/.test(code)) {
    return { success: false, error: '验证码格式错误' };
  }

  // 检查验证码
  const stored = verificationCodes.get(phone);
  if (!stored) {
    return { success: false, error: '验证码已过期或未发送' };
  }

  if (Date.now() > stored.expires) {
    verificationCodes.delete(phone);
    return { success: false, error: '验证码已过期' };
  }

  if (stored.attempts >= 5) {
    verificationCodes.delete(phone);
    return { success: false, error: '验证码尝试次数过多，请重新发送' };
  }

  if (stored.code !== code) {
    stored.attempts += 1;
    return { success: false, error: '验证码错误' };
  }

  // 验证码正确，清理存储
  verificationCodes.delete(phone);

  // 获取或创建用户
  let user = users.get(phone);
  if (!user) {
    // 新用户自动注册
    user = {
      userId: `user_${Date.now()}`,
      phone,
      role,
      name: `用户${phone.slice(-4)}`,
    };
    users.set(phone, user);
  } else {
    // 更新角色
    user.role = role;
  }

  return { success: true, user };
}

/**
 * 生成认证令牌
 * @param user 用户信息
 * @returns token
 */
export function generateAuthToken(user: User): string {
  return Buffer.from(
    JSON.stringify({
      userId: user.userId,
      phone: user.phone,
      role: user.role,
      iat: Date.now(),
    })
  ).toString('base64');
}

/**
 * 设置认证 Cookies
 * @param user 用户信息
 */
export async function setAuthCookies(user: User) {
  const cookieStore = await cookies();
  const token = generateAuthToken(user);

  // 设置 HttpOnly Cookie（认证令牌）
  cookieStore.set('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60, // 7天
    path: '/',
  });

  // 设置用户信息 Cookie（非 HttpOnly，客户端可读）
  cookieStore.set(
    'user_info',
    JSON.stringify({
      userId: user.userId,
      phone: user.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'),
      role: user.role,
      name: user.name,
    }),
    {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    }
  );
}

/**
 * 获取当前认证状态
 * @returns { authenticated, user }
 */
export async function getCurrentAuth(): Promise<AuthResult> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    const userInfo = cookieStore.get('user_info')?.value;

    if (!token || !userInfo) {
      return { authenticated: false, user: null };
    }

    // TODO: 验证 JWT token 的有效性
    const user = JSON.parse(userInfo);

    return { authenticated: true, user };
  } catch (error) {
    console.error('获取认证状态失败:', error);
    return { authenticated: false, user: null };
  }
}

/**
 * 从中间件注入的请求头中获取用户信息（推荐在 API 路由中使用）
 * @param headers 请求头
 * @returns User 或 null
 */
export function getUserFromHeaders(headers: Headers): User | null {
  try {
    const isAuthenticated = headers.get('x-authenticated') === 'true';
    
    if (!isAuthenticated) {
      return null;
    }

    const user: User = {
      userId: headers.get('x-user-id') || '',
      phone: headers.get('x-user-phone') || '',
      role: headers.get('x-user-role') || '',
      name: headers.get('x-user-name') || '',
    };

    return user;
  } catch (error) {
    console.error('从请求头获取用户信息失败:', error);
    return null;
  }
}

/**
 * 从中间件注入的请求头中要求用户已认证（推荐在 API 路由中使用）
 * @param headers 请求头
 * @returns User
 * @throws Error 如果未认证
 */
export function requireUserFromHeaders(headers: Headers): User {
  const user = getUserFromHeaders(headers);
  if (!user) {
    throw new Error('Unauthorized: 用户未登录');
  }
  return user;
}

/**
 * 获取当前用户
 * @returns User 或 null
 */
export async function getCurrentUser(): Promise<User | null> {
  const { authenticated, user } = await getCurrentAuth();
  return authenticated ? user : null;
}

/**
 * 要求认证（如果未认证则抛出错误）
 * @returns User
 * @throws Error
 */
export async function requireAuth(): Promise<User> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Unauthorized: 用户未登录');
  }
  return user;
}

/**
 * 清除认证 Cookies
 */
export async function clearAuthCookies() {
  const cookieStore = await cookies();
  cookieStore.delete('auth_token');
  cookieStore.delete('user_info');
}

/**
 * 验证用户是否具有特定角色
 * @param role 要检查的角色
 * @returns boolean
 */
export async function hasRole(role: string): Promise<boolean> {
  const user = await getCurrentUser();
  return user?.role === role;
}

/**
 * 获取所有用户（调试用）
 */
export function getAllUsers(): User[] {
  return Array.from(users.values());
}

/**
 * 清空所有数据（调试用）
 */
export function clearAllData() {
  verificationCodes.clear();
  users.clear();
}
