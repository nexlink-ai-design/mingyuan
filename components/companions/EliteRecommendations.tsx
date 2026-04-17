'use client';

import { Sparkles } from 'lucide-react';
import EliteCard from './EliteCard';

export default function EliteRecommendations() {
  const elites = [
    { name: "苏苏", age: "22", price: "229", tags: ['温柔', '声控'], img: "/IMG_15.webp" },
    { name: "林小鹿", age: "22", price: "259", tags: ['温柔', '声控'], img: "/IMG_16.webp" },
    { name: "沈梦", age: "22", price: "289", tags: ['温柔', '声控'], img: "/IMG_17.webp" },
    { name: "沐沐", age: "23", price: "319", tags: ['御姐', '声控'], img: "/IMG_24.webp", className: "hidden lg:block" },
    { name: "陈嘉琪", age: "24", price: "880", tags: ['气质', '外语'], img: "/IMG_25.webp", className: "hidden xl:block" },
  ];

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 lg:w-6 lg:h-6 text-[#E05299]" />
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900">精英推荐</h2>
          <span className="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded-full leading-none">128 位在线</span>
        </div>
        <button className="text-[#E05299] text-sm font-medium hover:underline">查看全部</button>
      </div>
      <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4 -mx-4 px-4 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-4 xl:grid-cols-5">
        {elites.map((elite) => (
          <EliteCard key={elite.name} {...elite} />
        ))}
      </div>
    </section>
  );
}
