/**
 * 登录验证 Hook
 */
'use client';

import { useState } from 'react';
import { authService } from '@/services/auth.service';

interface UseLoginParams {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export function useLogin(options?: UseLoginParams) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [codeSending, setCodeSending] = useState(false);
  const [codeCountdown, setCodeCountdown] = useState(0);

  // 发送验证码
  const sendCode = async (phone: string) => {
    if (!phone || !/^1[3-9]\d{9}$/.test(phone)) {
      setError('请输入有效的手机号码');
      return false;
    }

    setCodeSending(true);
    setError('');

    try {
      const result = await authService.sendCode(phone);
      
      // 启动倒计时
      setCodeCountdown(60);
      const interval = setInterval(() => {
        setCodeCountdown(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '发送验证码失败';
      setError(errorMessage);
      options?.onError?.(errorMessage);
      return false;
    } finally {
      setCodeSending(false);
    }
  };

  // 验证码登录
  const login = async (phone: string, code: string, role: string) => {
    if (!phone || !/^1[3-9]\d{9}$/.test(phone)) {
      setError('请输入有效的手机号码');
      return false;
    }

    if (!code || !/^\d{6}$/.test(code)) {
      setError('请输入6位验证码');
      return false;
    }

    setLoading(true);
    setError('');

    try {
      const result = await authService.login(phone, code, role);

      if (!result.success) {
        const errorMessage = result.error || '登录失败，请稍后重试';
        setError(errorMessage);
        options?.onError?.(errorMessage);
        return false;
      }

      options?.onSuccess?.();
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '登录异常';
      setError(errorMessage);
      options?.onError?.(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    codeSending,
    codeCountdown,
    sendCode,
    login,
    setError,
  };
}
