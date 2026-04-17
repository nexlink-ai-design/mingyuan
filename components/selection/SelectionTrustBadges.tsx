'use client';

import { Shield, Lock, Award, Headphones } from 'lucide-react';

export default function SelectionTrustBadges() {
  const badges = [
    { title: '实名认证', desc: '100% 真人身份', icon: Shield, bg: 'bg-blue-50', iconColor: 'text-blue-600' },
    { title: '隐私保障', desc: '用户信息全加密', icon: Lock, bg: 'bg-green-50', iconColor: 'text-green-600' },
    { title: '专业训练', desc: '金牌服务标准', icon: Award, bg: 'bg-yellow-50', iconColor: 'text-yellow-600' },
    { title: '7x24 客服', desc: '贴心售后无忧', icon: Headphones, bg: 'bg-purple-50', iconColor: 'text-purple-600' },
  ];

  return (
    <section className="px-4 py-4 grid grid-cols-2 gap-3">
      {badges.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div key={idx} className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3">
            <div className={`${item.bg} w-9 h-9 rounded-lg flex items-center justify-center shrink-0`}>
              <Icon className={`w-5 h-5 ${item.iconColor}`} />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 leading-tight">{item.title}</h4>
              <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          </div>
        );
      })}
    </section>
  );
}
