'use client';

import { Sparkles, Search, Filter, Route } from 'lucide-react';
import SelectionGridCard from './SelectionGridCard';
import { useRouter } from "next/navigation";

export default function SelectionMainList() {
    const router = useRouter();
  const gridItems = [
    { name: '沈梦瑶', rating: '5', loc: '静安区', time: '3h前', price: '599', tags: ['气质', '御姐'], img: '/IMG_21.webp', status: '在线' },
    { name: '周子琪', rating: '4.9', loc: '黄浦区', time: '在线', price: '488', tags: ['温婉', '声控'], img: '/IMG_25.webp', status: '在线' },
    { name: '洛依', rating: '4.8', loc: '朝阳区', time: '10min前', price: '688', tags: ['模特', '高挑'], img: '/IMG_26.webp', status: '离线', away: true },
    { name: '许知意', rating: '5', loc: '海淀区', time: '在线', price: '520', tags: ['知性', '谈心'], img: '/IMG_27.webp', status: '在线' },
    { name: '白露', rating: '4.9', loc: '福田区', time: '刚刚', price: '366', tags: ['萝莉', '二次元'], img: '/IMG_28.webp', status: '在线' },
    { name: '苏菲', rating: '4.7', loc: '南山区', time: '5h前', price: '799', tags: ['海归', '网球'], img: '/IMG_29.webp', status: '在线' },
    { name: '乔伊', rating: '4.9', loc: '武侯区', time: '在线', price: '299', tags: ['电竞', '吃鸡'], img: '/IMG_30.webp', status: '在线' },
    { name: '梦颖', rating: '4.8', loc: '锦江区', time: '离线', price: '199', tags: ['甜宠', '哄睡'], img: '/IMG_31.webp', status: '离线', away: true },
    { name: '黎安', rating: '5', loc: '天河区', time: '在线', price: '450', tags: ['瑜伽', '健谈'], img: '/IMG_32.webp', status: '在线' },
    { name: '若曦', rating: '4.9', loc: '越秀区', time: '刚刚', price: '588', tags: ['汉服', '古筝'], img: '/IMG_33.webp', status: '在线' },
  ];

  return (
    <section className="px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-yellow-100 rounded-md flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-gray-900" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">名媛陪玩</h3>
        </div>
        <button className="bg-white border border-gray-300 rounded-md px-2 py-1 flex items-center gap-1 text-xs font-medium text-gray-900 hover:border-[#E05299] leading-none" onClick={() => router.push("/search/filter")}>
          <Filter className="w-3 h-3" />
          筛选: 全部
        </button>
      </div>
      <p className="text-xs text-gray-600 mb-4 ml-9 leading-relaxed">示例：128 位在线</p>

      <div className="mb-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-gray-700" />
          </div>
          <input
            type="text"
            placeholder="搜索技师名字"
            className="w-full bg-gray-50 rounded-2xl py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-700 border-none shadow-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {gridItems.map((item, idx) => (
          <SelectionGridCard key={idx} {...item} />
        ))}
      </div>
    </section>
  );
}
