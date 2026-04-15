'use client';

import { Filter, Search } from 'lucide-react';
import CompanionListItem from './CompanionListItem';

export default function CompanionsList() {
  const companions = [
    {
      name: "林优子",
      rating: "5.0",
      location: "静安区",
      price: "420",
      date: "2025-06",
      tags: ['高端陪聊', '视频可选', '多才多艺'],
      img: "/IMG_19.webp",
      city: "上海"
    },
    {
      name: "沈梦",
      rating: "4.9",
      location: "黄浦区",
      price: "580",
      date: "2025-07",
      tags: ['线下约玩', '商务陪同'],
      img: "/IMG_22.webp",
      city: "上海"
    },
    {
      name: "夏晴",
      rating: "4.8",
      location: "徐汇区",
      price: "260",
      date: "2025-08",
      tags: ['游戏大神', '语音甜美'],
      img: "/IMG_23.webp",
      city: "上海",
      offline: true
    },
    {
      name: "沐沐",
      rating: "4.9",
      location: "普陀区",
      price: "330",
      date: "2025-09",
      tags: ['情感咨询', '树洞倾听'],
      img: "/IMG_24.webp",
      city: "上海"
    },
    {
      name: "陈嘉琪",
      rating: "5.0",
      location: "浦东新区",
      price: "880",
      date: "2025-10",
      tags: ['气质名媛', '外语精通'],
      img: "/IMG_25.webp",
      city: "上海"
    },
  ];

  return (
    <section className="space-y-4">
      <div className="sticky top-[64px] lg:top-[72px] z-20 bg-[#f8f9fa]/90 backdrop-blur-md py-2 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900">名媛陪玩</h2>
          <button className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100 text-xs font-medium text-gray-600">
            <Filter className="w-3.5 h-3.5" />
            筛选: 全部
          </button>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="搜索技师名字或风格"
            className="w-full bg-white border border-gray-100 rounded-xl py-2.5 pl-10 pr-4 text-sm shadow-sm focus:ring-2 focus:ring-[#E05299]/10 outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {companions.map((companion) => (
          <CompanionListItem key={companion.name} {...companion} />
        ))}
      </div>

      <div className="py-10 text-center">
        <p className="text-gray-400 text-sm">已加载全部在线技师</p>
      </div>
    </section>
  );
}
