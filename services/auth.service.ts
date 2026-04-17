/**
 * 认证服务 - API 调用封装
 */

interface SendCodeResponse {
  success: boolean;
  message: string;
  code?: string; // 仅开发环境返回
  error?: string;
}

interface LoginResponse {
  success: boolean;
  message?: string;
  user?: {
    userId: string;
    phone: string;
    role: string;
    name: string;
  };
  error?: string;
}

export const authService = {
  /**
   * 发送验证码
   */
  async sendCode(phone: string): Promise<SendCodeResponse> {
    const response = await fetch('/api/auth/send-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || '发送验证码失败');
    }

    return response.json();
  },

  /**
   * 验证码登录
   */
  async login(phone: string, code: string, role: string): Promise<LoginResponse> {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ phone, code, role }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.error };
    }

    return data;
  },

  /**
   * 退出登录
   */
  async logout(): Promise<void> {
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
  },

  /**
   * 验证登录状态
   */
  async verify(): Promise<{ authenticated: boolean; user: any }> {
    const response = await fetch('/api/auth/verify', {
      method: 'GET',
      credentials: 'include',
    });

    return response.json();
  },
};
