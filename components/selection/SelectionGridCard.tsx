'use client';

import { Star, MapPin, Clock, Heart } from 'lucide-react';

interface SelectionGridCardProps {
  name: string;
  rating: string;
  loc: string;
  time: string;
  price: string;
  tags: string[];
  img: string;
  status: string;
  away?: boolean;
}

export default function SelectionGridCard({
  name,
  rating,
  loc,
  time,
  price,
  tags,
  img,
  status,
  away,
}: SelectionGridCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col group max-h-[500px]">
      <div className="relative aspect-[1.618/1] max-h-[300px]">
        <img src={img} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        {away && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="border border-white/50 px-2 py-1 rounded text-white text-xs font-bold">暂离</div>
          </div>
        )}
        <div className="absolute top-2 left-2">
          <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full text-white leading-none ${status === '在线' ? 'bg-green-500' : 'bg-black/40'}`}>
            {status}
          </span>
        </div>
        <button className="absolute top-2 right-2 w-7 h-7 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/40">
          <Heart className="w-4 h-4 text-white" />
        </button>
      </div>
      <div className="p-3 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-1">
          <h4 className="text-base font-semibold text-gray-900">{name}</h4>
          <div className="flex items-center gap-0.5 text-xs font-bold leading-none">
            <Star className="w-2.5 h-2.5 fill-yellow-500 text-yellow-500" />
            {rating}
          </div>
        </div>
        <div className="flex items-center justify-between text-xs text-gray-600 mb-2 leading-normal">
          <div className="flex items-center gap-0.5">
            <MapPin className="w-2.5 h-2.5" />
            {loc}
          </div>
          <div className="flex items-center gap-0.5">
            <Clock className="w-2.5 h-2.5" />
            {time}
          </div>
        </div>
        <div className="flex gap-1 mb-3">
          {tags.map((tag, idx) => (
            <span key={idx} className="bg-gray-50 border border-gray-100 text-gray-900 text-xs px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-auto pt-2 border-t border-gray-200 flex items-center justify-between">
          <div className="flex items-baseline gap-0.5">
            <span className="text-[#E05299] font-bold text-base">¥{price}</span>
            <span className="text-xs text-gray-600">/h</span>
          </div>
          <button className="bg-[#E05299] text-white text-xs font-medium px-3 py-1 rounded-full active:scale-95 transition-transform leading-none">
            预约
          </button>
        </div>
      </div>
    </div>
  );
}
