'use client';

import { Check, MessageCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col items-center justify-center p-4">
      {/* Success Icon */}
      <div className="mb-6 relative">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center animate-pulse">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
            <Check className="w-10 h-10 text-white" />
          </div>
        </div>
      </div>

      {/* Success Message */}
      <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">
        支付成功！
      </h1>
      <p className="text-gray-600 text-center mb-8">
        订单已确认，请等待陪玩的联系
      </p>

      {/* Order Details */}
      <div className="w-full max-w-sm bg-white rounded-2xl border border-gray-200 p-6 mb-6">
        <h3 className="font-bold text-gray-900 mb-4">订单详情</h3>
        
        <div className="space-y-3 text-sm mb-4 border-b border-gray-200 pb-4">
          <div className="flex justify-between">
            <span className="text-gray-600">订单号</span>
            <span className="font-mono text-gray-900">202401201400xxx</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">陪玩</span>
            <span className="font-bold text-gray-900">桃之夭夭</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">服务时间</span>
            <span className="text-gray-900">2024-01-20 14:00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">服务时长</span>
            <span className="text-gray-900">1 小时</span>
          </div>
          <div className="flex justify-between font-bold text-base">
            <span className="text-gray-900">实付金额</span>
            <span className="text-[#E05299]">¥97.00</span>
          </div>
        </div>

        {/* Status */}
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2 text-green-600">
            <Check className="w-4 h-4" />
            <span>支付已完成</span>
          </div>
          <div className="flex items-center gap-2 text-blue-600">
            <span>⏲️</span>
            <span>等待陪玩接单 (通常 5 分钟内)</span>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="w-full max-w-sm space-y-3 mb-8">
        <Link href="/search">
          <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#E05299] text-white font-bold rounded-full hover:shadow-lg transition-shadow">
            继续浏览陪玩
            <ArrowRight className="w-4 h-4" />
          </button>
        </Link>

        <Link href="/user/profile">
          <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white text-gray-900 font-bold rounded-full border border-gray-300 hover:bg-gray-50 transition-colors">
            查看我的订单
          </button>
        </Link>

        <Link href="/">
          <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-900 font-bold rounded-full hover:bg-gray-200 transition-colors">
            返回首页
          </button>
        </Link>
      </div>

      {/* Tips */}
      <div className="w-full max-w-sm bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-900">
        <p className="font-bold mb-2">💡 温馨提示：</p>
        <ul className="space-y-1 text-xs">
          <li>✓ 陪玩会在 5-10 分钟内联系您</li>
          <li>✓ 请确保您的手机号码正确无误</li>
          <li>✓ 如有任何问题，请及时联系客服</li>
        </ul>
      </div>
    </div>
  );
}
