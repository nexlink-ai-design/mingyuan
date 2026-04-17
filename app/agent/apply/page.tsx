'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function AgentApplyPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1
    realName: '',
    phone: '',
    wechatQQ: '',
    // Step 2
    companyName: '',
    teamSize: '',
    businessLicense: '',
    // Step 3
    experience: '',
    referral: '',
  });

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 h-14 flex items-center">
        <Link href="/user/profile">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <span>←</span>
          </button>
        </Link>
        <h1 className="text-lg font-bold text-[#1C1A17] flex-1 text-center">经纪人入驻</h1>
      </header>

      {/* Banner */}
      <section className="bg-gradient-to-r from-[#E05299] to-pink-500 text-white p-6 m-4 rounded-2xl">
        <h2 className="text-xl font-bold mb-2">合伙人招募计划</h2>
        <p className="text-sm leading-relaxed">
          欢迎加入名媛陪玩！成为平台经纪人，您将获得专属分成激励、团队管理权限及官方运营支持。
        </p>
      </section>

      {/* Stepper */}
      <div className="flex items-center justify-between px-4 py-6 mb-4">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center flex-1">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                currentStep >= step
                  ? 'bg-[#E05299] text-white'
                  : 'bg-gray-300 text-gray-600'
              }`}
            >
              {step <= currentStep ? '✓' : step}
            </div>
            {step < 3 && (
              <div
                className={`flex-1 h-1 mx-2 transition-all ${
                  currentStep > step ? 'bg-[#E05299]' : 'bg-gray-300'
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>

      {/* Form Steps */}
      <div className="px-4">
        {currentStep === 1 && (
          <div className="bg-white rounded-2xl p-6 space-y-4">
            <h3 className="font-bold text-lg text-[#1C1A17] flex items-center gap-2">
              <span className="w-8 h-8 bg-[#E05299]/10 rounded-lg flex items-center justify-center text-[#E05299]">👤</span>
              负责人信息
            </h3>
            
            <div className="space-y-3 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  真实姓名 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="realName"
                  value={formData.realName}
                  onChange={handleInputChange}
                  placeholder="请输入您的姓名"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[#E05299] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  联系电话 <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="请输入手机号码"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[#E05299] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  微信号/QQ <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="wechatQQ"
                  value={formData.wechatQQ}
                  onChange={handleInputChange}
                  placeholder="方便官方人员与您取得联系"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[#E05299] focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="bg-white rounded-2xl p-6 space-y-4">
            <h3 className="font-bold text-lg text-[#1C1A17] flex items-center gap-2">
              <span className="w-8 h-8 bg-[#E05299]/10 rounded-lg flex items-center justify-center text-[#E05299]">🏢</span>
              公司/团队信息
            </h3>
            
            <div className="space-y-3 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  公司/团队名称 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder='若个人名义请填 "个人"'
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[#E05299] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  预计团队规模 <span className="text-red-500">*</span>
                </label>
                <select
                  name="teamSize"
                  value={formData.teamSize}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[#E05299] focus:outline-none"
                >
                  <option value="">请选择</option>
                  <option value="1">1-5人</option>
                  <option value="2">5-20人</option>
                  <option value="3">20-50人</option>
                  <option value="4">50人以上</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  营业执照/身份证
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-[#E05299] transition-colors">
                  <span className="text-3xl mb-2">📸</span>
                  <p className="text-sm text-gray-600">点击上传文件</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="bg-white rounded-2xl p-6 space-y-4">
            <h3 className="font-bold text-lg text-[#1C1A17] flex items-center gap-2">
              <span className="w-8 h-8 bg-[#E05299]/10 rounded-lg flex items-center justify-center text-[#E05299]">📋</span>
              其他信息
            </h3>
            
            <div className="space-y-3 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  经营经验描述
                </label>
                <textarea
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  placeholder="请简述您的相关经营经验"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[#E05299] focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  推荐人（如有）
                </label>
                <input
                  type="text"
                  name="referral"
                  value={formData.referral}
                  onChange={handleInputChange}
                  placeholder="若由平台用户推荐，请填写其 ID"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[#E05299] focus:outline-none"
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-xs text-blue-900 space-y-1">
                <p>✓ 信息审核通常需要 2-3 个工作日</p>
                <p>✓ 我们会通过手机/微信与您联系</p>
                <p>✓ 请确保信息真实准确</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-4 flex gap-3 max-w-sm mx-auto">
        <button
          onClick={handlePrev}
          disabled={currentStep === 1}
          className={`flex-1 px-4 py-3 rounded-full font-bold transition-all ${
            currentStep === 1
              ? 'bg-gray-200 text-gray-600 cursor-not-allowed'
              : 'bg-white border border-gray-300 text-gray-900 hover:bg-gray-50'
          }`}
        >
          上一步
        </button>

        {currentStep < 3 ? (
          <button
            onClick={handleNext}
            className="flex-1 px-4 py-3 bg-[#E05299] text-white rounded-full font-bold hover:shadow-lg transition-shadow flex items-center justify-center gap-2"
          >
            下一步
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <Link href="/user/profile" className="flex-1">
            <button className="w-full px-4 py-3 bg-[#E05299] text-white rounded-full font-bold hover:shadow-lg transition-shadow">
              提交申请
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
