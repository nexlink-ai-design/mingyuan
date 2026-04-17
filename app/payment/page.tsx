'use client';

import { CreditCard, QrCode, Smartphone } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function PaymentPage() {
  const [selectedMethod, setSelectedMethod] = useState('wechat');
  const [agreed, setAgreed] = useState(false);

  const paymentMethods = [
    { id: 'wechat', name: '微信支付', icon: '📱' },
    { id: 'alipay', name: '支付宝', icon: '🅰️' },
    { id: 'card', name: '银行卡', icon: '💳' },
    { id: 'wallet', name: '钱包余额', icon: '💰' },
  ];

  const orderInfo = {
    companionName: '桃之夭夭',
    date: '2024-01-20 14:00',
    duration: '1小时',
    basePrice: 88,
    fee: 9,
    totalPrice: 97,
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 h-14 flex items-center">
        <Link href={`/order/1`}>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <span>←</span>
          </button>
        </Link>
        <h1 className="text-lg font-bold text-[#1C1A17] flex-1 text-center">支付</h1>
      </header>

      {/* Order Summary */}
      <div className="bg-white border-b border-gray-200 p-4 mt-2">
        <h3 className="font-bold text-[#1C1A17] mb-3">订单信息</h3>
        
        <div className="flex gap-3 mb-4">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
            {orderInfo.companionName.charAt(0)}
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-[#1C1A17]">{orderInfo.companionName}</h4>
            <p className="text-xs text-gray-600 mt-1">{orderInfo.date}</p>
            <p className="text-xs text-gray-600">{orderInfo.duration}</p>
          </div>
        </div>

        <div className="space-y-2 text-sm border-t border-gray-200 pt-3">
          <div className="flex justify-between text-gray-600">
            <span>陪玩费用</span>
            <span>¥{orderInfo.basePrice}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>平台手续费</span>
            <span>¥{orderInfo.fee}</span>
          </div>
          <div className="flex justify-between font-bold text-base text-gray-900 mt-3">
            <span>合计金额</span>
            <span className="text-[#E05299] text-lg">¥{orderInfo.totalPrice}</span>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white border-b border-gray-200 p-4 mt-2">
        <h3 className="font-bold text-[#1C1A17] mb-3">选择支付方式</h3>
        <div className="space-y-2">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              className={`w-full flex items-center gap-3 p-4 rounded-lg border-2 transition-colors ${
                selectedMethod === method.id
                  ? 'border-[#E05299] bg-pink-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="text-2xl">{method.icon}</div>
              <span className={`font-medium ${selectedMethod === method.id ? 'text-[#E05299]' : 'text-gray-900'}`}>
                {method.name}
              </span>
              {selectedMethod === method.id && (
                <div className="ml-auto w-5 h-5 rounded-full bg-[#E05299] flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Additional Options */}
      {selectedMethod === 'card' && (
        <div className="bg-white border-b border-gray-200 p-4 mt-2">
          <h3 className="font-bold text-[#1C1A17] mb-3">银行卡信息</h3>
          <input
            type="text"
            placeholder="卡号"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mb-2 focus:border-[#E05299] focus:outline-none"
          />
          <input
            type="text"
            placeholder="持卡人姓名"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mb-2 focus:border-[#E05299] focus:outline-none"
          />
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="有效期"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-[#E05299] focus:outline-none"
            />
            <input
              type="text"
              placeholder="CVV"
              className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-[#E05299] focus:outline-none"
            />
          </div>
        </div>
      )}

      {/* Agreement */}
      <div className="bg-blue-50 border border-blue-200 p-4 m-4 rounded-lg">
        <div className="flex items-start gap-2 mb-2">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1 cursor-pointer"
          />
          <div className="flex-1">
            <p className="text-sm text-blue-900">
              我已阅读并同意
              <Link href="#" className="underline font-medium">
                《支付协议》
              </Link>
              和
              <Link href="#" className="underline font-medium">
                《用户隐私保护》
              </Link>
            </p>
          </div>
        </div>
        <p className="text-xs text-blue-800 ml-6">
          ✓ 您的支付信息将被安全加密处理
        </p>
      </div>

      {/* Security Info */}
      <div className="px-4 py-2 space-y-2">
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <span>🔒</span>
          <span>256 位 SSL 加密保护交易</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <span>✓</span>
          <span>平台 100% 保障买卖双方权益</span>
        </div>
      </div>

      {/* Pay Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <Link href="/payment/success">
          <button
            disabled={!agreed}
            className={`w-full py-3 font-bold rounded-full text-lg transition-all flex items-center justify-center gap-2 ${
              agreed
                ? 'bg-[#E05299] text-white hover:shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <CreditCard className="w-5 h-5" />
            确认支付 ¥{orderInfo.totalPrice}
          </button>
        </Link>
        <p className="text-xs text-center text-gray-600 mt-2">
          支付完成后订单立即生效，请勿关闭此页面
        </p>
      </div>
    </div>
  );
}
