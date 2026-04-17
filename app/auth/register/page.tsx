'use client';

import { useState } from 'react';
import { Check, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    phone: '',
    code: '',
    password: '',
    confirmPassword: '',
    nickname: '',
    role: 'user',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [step, setStep] = useState(1);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const roles = [
    { id: 'user', label: '普通用户', desc: '找寻陪伴与乐趣' },
    { id: 'companion', label: '名媛陪玩', desc: '展示魅力与才艺' },
    { id: 'agent', label: '王牌经纪', desc: '管理资源与团队' },
  ];

  const currentRole = roles.find(r => r.id === formData.role);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      <main className="w-full max-w-md px-6 pt-12 pb-8 flex flex-col items-center">
        {/* Logo */}
        <div className="w-[72px] h-[72px] bg-[#E05299] rounded-[14px] flex items-center justify-center mb-6 shadow-lg">
          <span className="text-white text-3xl font-bold">名</span>
        </div>

        <h1 className="text-2xl font-bold text-[#1C1A17] mb-2">创建账户</h1>
        <p className="text-sm text-[#655E58] mb-8">开启您的尊贵社交与游戏体验</p>

        {/* Step 1: Role Selection */}
        {step === 1 && (
          <div className="w-full space-y-4">
            <h2 className="text-xs font-semibold text-[#655E58] uppercase tracking-wider mb-4">请选择您的身份</h2>
            <div className="grid grid-cols-3 gap-3">
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => setFormData(prev => ({ ...prev, role: role.id }))}
                  className={`flex flex-col items-center justify-center h-[86px] rounded-2xl border transition-all duration-200 ${
                    formData.role === role.id
                      ? 'bg-[#FDF2F7] border-[#E05299]'
                      : 'bg-white border-[#E3E0DE]'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center mb-2 ${
                    formData.role === role.id ? 'bg-[#E05299]' : 'bg-[#F6F5F4]'
                  }`}>
                    <span className={`text-sm font-bold ${
                      formData.role === role.id ? 'text-white' : 'text-[#E05299]'
                    }`}>
                      {role.label.charAt(0)}
                    </span>
                  </div>
                  <span className={`text-xs font-bold ${
                    formData.role === role.id ? 'text-[#E05299]' : 'text-[#1C1A17]'
                  }`}>
                    {role.label}
                  </span>
                </button>
              ))}
            </div>
            <p className="text-xs text-[#655E58] text-center mt-4">
              * 您当前选择了 <span className="text-[#E05299] font-medium">{currentRole?.label}</span>
            </p>

            <button
              onClick={() => setStep(2)}
              className="w-full h-14 bg-[#E05299] text-white font-bold rounded-2xl mt-8 hover:shadow-lg transition-shadow"
            >
              下一步
            </button>
          </div>
        )}

        {/* Step 2: Phone & Verification */}
        {step === 2 && (
          <div className="w-full space-y-4">
            <h2 className="text-sm font-bold text-[#1C1A17] mb-4">验证手机号</h2>

            <div className="relative flex items-center h-14 bg-[#F6F5F4]/30 border border-[#F6F5F4] rounded-2xl px-4">
              <div className="flex items-center gap-1 pr-3 border-r border-[#E3E0DE]">
                <span className="text-sm font-medium text-[#1C1A17]">+86</span>
              </div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="请输入手机号码"
                className="flex-1 bg-transparent outline-none px-3 text-base text-[#655E58] placeholder:text-[#655E58]/60"
              />
            </div>

            <div className="relative flex items-center h-14 bg-[#F6F5F4]/30 border border-[#F6F5F4] rounded-2xl px-4">
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleInputChange}
                placeholder="请输入6位验证码"
                className="flex-1 bg-transparent outline-none text-base text-[#655E58] placeholder:text-[#655E58]/60"
              />
              <button className="text-xs font-semibold text-[#E05299] whitespace-nowrap ml-2">
                获取验证码
              </button>
            </div>

            <div className="flex gap-2 pt-4">
              <button
                onClick={() => setStep(1)}
                className="flex-1 px-4 py-3 bg-white border border-gray-300 text-gray-900 rounded-2xl font-bold hover:bg-gray-50"
              >
                上一步
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 px-4 py-3 bg-[#E05299] text-white rounded-2xl font-bold hover:shadow-lg transition-shadow"
              >
                下一步
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Password & Nickname */}
        {step === 3 && (
          <div className="w-full space-y-4">
            <h2 className="text-sm font-bold text-[#1C1A17] mb-4">设置密码和昵称</h2>

            {/* Nickname */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">昵称</label>
              <input
                type="text"
                name="nickname"
                value={formData.nickname}
                onChange={handleInputChange}
                placeholder="请输入您的昵称"
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:border-[#E05299] focus:outline-none text-sm"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">设置密码</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="请设置6位以上密码"
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:border-[#E05299] focus:outline-none text-sm pr-10"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">确认密码</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="请再次输入密码"
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:border-[#E05299] focus:outline-none text-sm pr-10"
                />
                <button
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Agreement */}
            <div className="flex items-start gap-2 pt-2">
              <button
                onClick={() => setAgreed(!agreed)}
                className={`mt-1 w-4 h-4 rounded-sm border flex items-center justify-center shrink-0 transition-colors ${
                  agreed ? 'bg-[#E05299] border-[#E05299]' : 'bg-white border-gray-400'
                }`}
              >
                {agreed && <Check className="text-white w-3 h-3" />}
              </button>
              <span className="text-xs text-[#655E58] leading-relaxed">
                我已阅读并同意 
                <Link href="#" className="text-[#E05299]">《用户服务协议》</Link>、
                <Link href="#" className="text-[#E05299]">《隐私保护指引》</Link> 及
                <Link href="#" className="text-[#E05299]">《支付服务协议》</Link>
              </span>
            </div>

            <div className="flex gap-2 pt-4">
              <button
                onClick={() => setStep(2)}
                className="flex-1 px-4 py-3 bg-white border border-gray-300 text-gray-900 rounded-2xl font-bold hover:bg-gray-50"
              >
                上一步
              </button>
              <Link href="/" className="flex-1">
                <button className="w-full px-4 py-3 bg-[#E05299] text-white rounded-2xl font-bold hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed" disabled={!agreed}>
                  完成注册
                </button>
              </Link>
            </div>
          </div>
        )}

        {/* Footer Links */}
        <div className="mt-8 text-center space-y-2">
          <p className="text-xs text-[#655E58]">
            已有账户？
            <Link href="/auth/login" className="text-[#E05299] font-bold ml-1">
              立即登录
            </Link>
          </p>
          <p className="text-xs text-[#655E58]">Version 2.4.0 (Stable Build)</p>
        </div>
      </main>
    </div>
  );
}
