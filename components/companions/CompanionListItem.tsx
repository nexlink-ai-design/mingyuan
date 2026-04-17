'use client';

import { Star, MapPin } from 'lucide-react';

interface CompanionListItemProps {
  name: string;
  rating: string;
  location: string;
  price: string;
  date: string;
  tags: string[];
  img: string;
  city: string;
  offline?: boolean;
}

export default function CompanionListItem({ 
  name, 
  rating, 
  location, 
  price, 
  date, 
  tags, 
  img, 
  city, 
  offline = false 
}: CompanionListItemProps) {
  return (
    <div className="bg-white rounded-2xl p-3 flex gap-4 shadow-sm border border-gray-50 hover:shadow-md transition-shadow group">
      <div className="w-[100px] h-[130px] rounded-2xl overflow-hidden relative flex-shrink-0">
        <img src={img} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-2 left-2 bg-black/30 backdrop-blur-sm px-2 py-0 rounded-lg flex items-center justify-center h-5">
          <span className="text-white text-xs leading-none">{city}</span>
        </div>
        {offline && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-white text-xs font-bold">离线</span>
          </div>
        )}
      </div>
      <div className="flex-1 flex flex-col justify-between py-1">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-gray-900">{name}</h3>
              <div className="flex items-center gap-0.5 bg-amber-50 px-1.5 py-0.5 rounded">
                <Star className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
                <span className="text-amber-500 text-xs font-bold leading-none">{rating}</span>
              </div>
            </div>
            <span className="text-gray-400 text-xs leading-none">入驻: {date}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-500">
            <MapPin className="w-3 h-3" />
            <span className="text-xs text-gray-600 leading-normal">{location}</span>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {tags.map((tag, idx) => (
              <span key={tag} className={`text-xs px-2 py-0.5 rounded-full leading-none ${idx === 0 ? 'bg-[#E05299]/10 text-[#E05299]' : 'bg-gray-100 text-gray-600'}`}>
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-end justify-between mt-2">
          <div className="flex items-baseline gap-0.5">
            <span className="text-[#E05299] text-xl font-bold">¥{price}</span>
            <span className="text-gray-400 text-xs leading-none">/小时</span>
          </div>
          <button className="bg-[#E05299] text-white text-sm font-bold px-5 py-1.5 rounded-full shadow-lg shadow-[#E05299]/20 hover:bg-[#c44183] transition-colors">
            预约
          </button>
        </div>
      </div>
    </div>
  );
}
