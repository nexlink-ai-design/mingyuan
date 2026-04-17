'use client';

import { Star } from 'lucide-react';

export default function SelectionHotCard({ name, price, rating, loc, tags, img, hot, online }) {
  return (
    <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3 relative">
      <div className="relative shrink-0">
        <img src={img} alt={name} className="w-16 h-16 rounded-full object-cover" />
        <span className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${online ? 'bg-green-500' : 'bg-gray-300'}`}></span>
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="font-semibold text-sm text-gray-900">{name}</span>
          {hot && (
            <span className="bg-yellow-300 text-gray-900 text-xs font-bold px-1 rounded shadow-sm leading-none">HOT</span>
          )}
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-700 mb-2 leading-relaxed">
          <div className="flex items-center gap-0.5 text-yellow-600">
            <Star className="w-3 h-3 fill-current" />
            <span>{rating}</span>
          </div>
          <span>|</span>
          <span>{loc}</span>
        </div>
        <div className="flex gap-1.5">
          {tags.map((tag, idx) => (
            <span key={idx} className="bg-gray-50 text-gray-900 text-xs px-2 py-1 rounded-full border border-gray-200">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="text-right flex flex-col items-end gap-2">
        <span className="text-[#E05299] font-bold text-sm">¥{price}/h</span>
        <button className="bg-[#E05299]/10 text-[#E05299] text-xs font-medium px-4 py-1.5 rounded-full active:bg-[#E05299]/20">
          预约
        </button>
      </div>
    </div>
  );
}
