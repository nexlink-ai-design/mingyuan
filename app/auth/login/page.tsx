'use client';

import { useState, useEffect, Suspense } from 'react';
import { Check } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLogin } from '@/hooks/useLogin';
import { useAuth } from '@/contexts/auth';

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
      <p className="text-sm text-[#655E58] mb-12">开启您的尊贵社交与游戏体验</p>

      {/* Error Message */}
      {error && (
        <div className="w-full mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Role Selection Section */}
      <div className="w-full mb-8">
        <h2 className="text-xs font-semibold text-[#655E58] uppercase tracking-wider mb-4">请选择您的身份</h2>
        <div className="grid grid-cols-3 gap-3 md:gap-6">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => setSelectedRole(role.id)}
              type="button"
              className={`flex flex-col items-center justify-center h-[86px] rounded-2xl border transition-all duration-200 ${
                selectedRole === role.id
                  ? 'bg-[#FDF2F7] border-[#E05299]'
                  : 'bg-white border-[#E3E0DE]'
              }`}
            >
              <div className={`w-9 h-9 rounded-full flex items-center justify-center mb-2 ${
                selectedRole === role.id ? 'bg-[#E05299]' : 'bg-[#F6F5F4]'
              }`}>
                <span className={`text-sm font-bold ${
                  selectedRole === role.id ? 'text-white' : 'text-[#E05299]'
                }`}>
                  {role.label.charAt(0)}
                </span>
              </div>
              <span className={`text-xs font-bold ${
                selectedRole === role.id ? 'text-[#E05299]' : 'text-[#1C1A17]'
              }`}>
                {role.label}
              </span>
            </button>
          ))}
        </div>
        <p className="text-xs text-[#655E58] text-center mt-4">
          * 您当前选择了 <span className="text-[#E05299] font-medium">{currentRole?.label}</span>：{currentRole?.desc}
        </p>
      </div>

      {/* Form Section */}
      <form onSubmit={handleLogin} className="w-full space-y-4 md:max-w-sm">
        {/* Phone Input */}
        <div className="relative flex items-center h-14 bg-[#F6F5F4]/30 border border-[#F6F5F4] rounded-2xl px-4">
          <div className="flex items-center gap-1 pr-3 border-r border-[#E3E0DE]">
            <span className="text-sm font-medium text-[#1C1A17]">+86</span>
          </div>
          <input
            type="tel"
            placeholder="请输入手机号码"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={loading || codeSending}
            className="flex-1 bg-transparent outline-none px-3 text-base text-[#655E58] placeholder:text-[#655E58]/60 disabled:opacity-50"
          />
        </div>

        {/* Verification Code Input */}
        <div className="relative flex items-center h-14 bg-[#F6F5F4]/30 border border-[#F6F5F4] rounded-2xl px-4">
          <input
            type="text"
            placeholder="请输入6位验证码"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
            maxLength={6}
            disabled={loading}
            className="flex-1 bg-transparent outline-none text-base text-[#655E58] placeholder:text-[#655E58]/60 disabled:opacity-50"
          />
          <button
            type="button"
            onClick={handleSendCode}
            disabled={codeSending || codeCountdown > 0 || !phone || loading}
            className="text-xs font-semibold text-[#E05299] whitespace-nowrap ml-2 disabled:opacity-50 disabled:cursor-not-allowed hover:text-[#c13d7a] transition-colors"
          >
            {codeCountdown > 0 ? `${codeCountdown}秒后重试` : '获取验证码'}
          </button>
        </div>

        {/* Dev Code Display */}
        {process.env.NODE_ENV === 'development' && devCodeDisplay && (
          <div className="p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-600 text-center">
            测试验证码：{devCodeDisplay}
          </div>
        )}

        {/* Agreement Checkbox */}
        <div className="flex items-start gap-2 pt-1">
          <button
            type="button"
            onClick={() => setAgreed(!agreed)}
            className={`mt-1 w-4 h-4 rounded-sm border flex items-center justify-center shrink-0 transition-colors ${
              agreed ? 'bg-[#E05299] border-[#E05299]' : 'bg-white border-[#565d6d]'
            }`}
          >
            {agreed && <Check className="text-white w-3 h-3" />}
          </button>
          <span className="text-xs text-[#655E58] leading-relaxed">
            我已阅读并同意
            <a href="#" className="text-[#E05299] hover:underline">《用户服务协议》</a>、
            <a href="#" className="text-[#E05299] hover:underline">《隐私保护指引》</a> 及
            <a href="#" className="text-[#E05299] hover:underline">《支付服务协议》</a>
          </span>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !phone || !code || !agreed}
          className="w-full h-14 bg-[#E05299] rounded-2xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-shadow mt-4 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-lg"
        >
          {loading ? '登录中...' : '立即登录 / 注册'}
        </button>
      </form>

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

      {/* Footer */}
      <footer className="mt-auto pt-16 pb-4 text-center space-y-1 opacity-60">
        <p className="text-xs text-[#655E58]">名媛陪玩 · 高端社交陪伴平台</p>
        <p className="text-xs text-[#655E58]">Version 2.4.0 (Stable Build)</p>
      </footer>
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
