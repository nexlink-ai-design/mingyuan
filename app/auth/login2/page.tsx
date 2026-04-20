'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLogin } from '@/hooks/useLogin';
import { useAuth } from '@/contexts/auth';
import {  Eye, EyeOff } from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isAuthenticated } = useAuth();
  const { sendCode, login, loading, error, codeSending, codeCountdown, setError } = useLogin({
    onSuccess: () => {
      const callbackUrl = searchParams.get('callbackUrl') || '/';
      router.push(callbackUrl);
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState('user');
  const [agreed, setAgreed] = useState(false);
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [devCodeDisplay, setDevCodeDisplay] = useState('');

  // 如果已登录，重定向到首页
  useEffect(() => {
    if (isAuthenticated && user) {
      router.push('/');
    }
  }, [isAuthenticated, user, router]);

  const roles = [
    { id: 'user', label: '普通用户', desc: '找寻陪伴与乐趣' },
    { id: 'companion', label: '名媛陪玩', desc: '展示魅力与才艺' },
    { id: 'agent', label: '王牌经纪', desc: '管理资源与团队' },
  ];

  const currentRole = roles.find(r => r.id === selectedRole);

  const handleSendCode = async () => {
    const success = await sendCode(phone);
    if (success) {
      // 开发环境：显示测试验证码
      if (process.env.NODE_ENV === 'development') {
        try {
          const response = await fetch('/api/auth/send-code', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone }),
          });
          const data = await response.json();
          if (data.code) {
            setDevCodeDisplay(data.code);
          }
        } catch (err) {
          console.error('获取测试验证码失败:', err);
        }
      }
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreed) {
      setError('请阅读并同意服务条款');
      return;
    }

    await login(phone, code, selectedRole);
  };

  return (
    <main className="w-full max-w-md px-6 pt-12 pb-8 flex flex-col items-center md:max-w-2xl lg:max-w-4xl lg:pt-20">
      {/* Logo Section */}
      <div className="w-[72px] h-[72px] bg-[#E05299] rounded-[14px] flex items-center justify-center mb-6 shadow-lg">
        <span className="text-white text-3xl font-bold">名</span>
      </div>

      <h1 className="text-2xl font-bold text-[#1C1A17] mb-2">欢迎加入</h1>
      <p className="text-sm text-[#655E58] mb-4">开启您的尊贵社交与游戏体验</p>

      {/* Error Message */}
      {error && (
        <div className="w-full mt-4 mb-0 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Role Selection Section */}
      <div className="w-full mb-2">
      </div>

      {/* Form Section */}
      <form onSubmit={handleLogin} className="w-full space-y-4 md:max-w-sm">
            {/* Nickname */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">昵称</label>
              <input
                type="text"
                name="nickname"
                // value={formData.nickname}
                // onChange={handleInputChange}
                placeholder="请输入您的昵称"
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:border-[#E05299] focus:outline-none text-sm"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">设置密码</label>
              <div className="relative">
                <input
                  // type={showPassword ? 'text' : 'password'}
                  name="password"
                  // value={formData.password}
                  // onChange={handleInputChange}
                  placeholder="请设置6位以上密码"
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:border-[#E05299] focus:outline-none text-sm pr-10"
                />
                <button
                  // onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

        {/* Dev Code Display
        {process.env.NODE_ENV === 'development' && devCodeDisplay && (
          <div className="p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-600 text-center">
            测试验证码：{devCodeDisplay}
          </div>
        )} */}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !phone || !code || !agreed}
          className="w-full h-14 bg-[#E05299] rounded-2xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-shadow mt-4 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-lg"
        >
          {loading ? '登录中...' : '立即登录'}
        </button>
      </form>

      {/* Footer Links */}
      <div className="mt-8 text-center space-y-2">
        <p className="text-xs text-[#655E58]">
          已有账户？
          <Link href="/auth/register" className="text-[#E05299] font-bold ml-1">
            立即注册
          </Link>
        </p>
      </div>
      {/* Third Party Login */}
      <div className="w-full mt-16 md:max-w-sm">
        <div className="relative flex items-center justify-center mb-8">
          <div className="absolute w-full h-px bg-[#E3E0DE]"></div>
          <span className="relative bg-white px-4 text-xs font-medium text-[#655E58] uppercase tracking-wider">
            第三方账号快捷登录
          </span>
        </div>

        <div className="flex justify-center gap-8 md:gap-12">
          {['WeChat', 'Apple', 'QQ'].map((item) => (
            <button
              key={item}
              type="button"
              className="flex flex-col items-center gap-2 cursor-not-allowed opacity-60"
            >
              <div className="w-12 h-12 rounded-full border border-[#E3E0DE] flex items-center justify-center hover:bg-gray-50 transition-colors">
                <span className="text-xl font-bold text-[#1C1A17]">{item.charAt(0)}</span>
              </div>
              <span className="text-xs font-medium text-[#655E58]">{item}</span>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center font-sans">
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">加载中...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
