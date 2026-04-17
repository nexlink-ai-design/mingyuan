'use client';

import { Flame } from 'lucide-react';
import SelectionHotCard from './SelectionHotCard';

export default function SelectionHotRecommendations() {
  const hotItems = [
    { name: '林汐', price: '299', rating: '5', loc: '北京·朝阳', tags: ['声优', '游戏带飞'], img: '/IMG_13.webp', hot: true, online: true },
    { name: '小甜心', price: '198', rating: '4.9', loc: '上海·徐汇', tags: ['陪聊', '甜美'], img: '/IMG_15.webp', hot: false, online: true },
    { name: '月亮姐姐', price: '258', rating: '4.8', loc: '成都·锦江', tags: ['塔罗', '疗愈'], img: '/IMG_16.webp', hot: false, online: false },
    { name: '艾米Amy', price: '399', rating: '5', loc: '深圳·南山', tags: ['英语', '商务'], img: '/IMG_17.webp', hot: true, online: true },
    { name: '雪儿', price: '218', rating: '4.7', loc: '广州·天河', tags: ['舞蹈', '才艺'], img: '/IMG_18.webp', hot: false, online: true },
  ];

  return (
    <section className="px-4 py-2">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-yellow-100 rounded-md flex items-center justify-center">
            <Flame className="w-5 h-5 text-red-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">热门推荐</h3>
        </div>
        <button className="text-xs text-gray-700 flex items-center gap-1">
          更多 →
        </button>
      </div>

      <div className="space-y-3">
        {hotItems.map((item, idx) => (
          <SelectionHotCard key={idx} {...item} />
        ))}
      </div>
    </section>
  );
}
