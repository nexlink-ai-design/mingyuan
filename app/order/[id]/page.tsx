'use client';

import { ChevronRight, MapPin, Phone, CreditCard } from 'lucide-react';
import Link from 'next/link';
import { useState, use } from 'react';

export default function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [selectedDate, setSelectedDate] = useState('2024-01-20');
  const [selectedTime, setSelectedTime] = useState('14:00');
  const [quantity, setQuantity] = useState(1);

  const playmate = {
    id: id,
    name: '桃之夭夭',
    price: 88,
    game: '英雄联盟',
  };

  const timeSlots = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

  const totalPrice = playmate.price * quantity;

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 h-14 flex items-center">
        <Link href={`/playmate/${playmate.id}/profile`}>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <span>←</span>
          </button>
        </Link>
        <h1 className="text-lg font-bold text-[#1C1A17] flex-1 text-center">订单详情</h1>
      </header>

      {/* Playmate Card */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex gap-3">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
            {playmate.name.charAt(0)}
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-[#1C1A17]">{playmate.name}</h3>
            <p className="text-sm text-gray-600">{playmate.game}</p>
            <p className="text-base font-bold text-[#E05299] mt-1">¥{playmate.price}/小时</p>
          </div>
        </div>
      </div>

      {/* Date Selection */}
      <div className="bg-white border-b border-gray-200 p-4 mt-2">
        <h3 className="font-bold text-[#1C1A17] mb-3">选择日期</h3>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:border-[#E05299] focus:outline-none"
        />
      </div>

      {/* Time Selection */}
      <div className="bg-white border-b border-gray-200 p-4 mt-2">
        <h3 className="font-bold text-[#1C1A17] mb-3">选择时间</h3>
        <div className="grid grid-cols-4 gap-2">
          {timeSlots.map((time) => (
            <button
              key={time}
              onClick={() => setSelectedTime(time)}
              className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                selectedTime === time
                  ? 'bg-[#E05299] text-white'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      {/* Duration Selection */}
      <div className="bg-white border-b border-gray-200 p-4 mt-2">
        <h3 className="font-bold text-[#1C1A17] mb-3">服务时长</h3>
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="text-sm text-gray-900">小时数</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-200 text-gray-900 font-bold"
            >
              −
            </button>
            <span className="w-8 text-center font-bold text-gray-900">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-200 text-gray-900 font-bold"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white border-b border-gray-200 p-4 mt-2">
        <h3 className="font-bold text-[#1C1A17] mb-3">联系信息</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
            <Phone className="w-5 h-5 text-gray-600" />
            <input
              type="tel"
              placeholder="请输入手机号码"
              className="flex-1 bg-transparent outline-none text-sm text-gray-900"
            />
          </div>
          <div className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
            <MapPin className="w-5 h-5 text-gray-600 mt-1" />
            <textarea
              placeholder="请输入所在位置或备注"
              className="flex-1 bg-transparent outline-none text-sm text-gray-900 resize-none"
              rows={2}
            />
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-white border-b border-gray-200 p-4 mt-2">
        <h3 className="font-bold text-[#1C1A17] mb-3">订单信息</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-gray-600">
            <span>陪玩费用 ({quantity}小时)</span>
            <span>¥{playmate.price} × {quantity}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>平台手续费</span>
            <span>¥{(totalPrice * 0.1).toFixed(0)}</span>
          </div>
          <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between font-bold text-base text-gray-900">
            <span>应付金额</span>
            <span className="text-[#E05299]">¥{(totalPrice + totalPrice * 0.1).toFixed(0)}</span>
          </div>
        </div>
      </div>

      {/* Policies */}
      <div className="bg-blue-50 border border-blue-200 p-4 m-4 rounded-lg text-xs text-blue-900">
        <p className="mb-2">✓ 账户安全保障</p>
        <p>✓ 陪玩服务质量保证</p>
      </div>

      {/* Payment Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex gap-3">
        <div className="flex-1">
          <p className="text-xs text-gray-600 mb-1">应付金额</p>
          <p className="text-lg font-bold text-[#E05299]">¥{(totalPrice + totalPrice * 0.1).toFixed(0)}</p>
        </div>
        <Link href="/payment" className="flex-1">
          <button className="w-full px-4 py-3 bg-[#E05299] text-white font-bold rounded-full hover:shadow-lg transition-shadow">
            确认支付
          </button>
        </Link>
      </div>
    </div>
  );
}
