'use client';

interface EliteCardProps {
  name: string;
  age: string;
  price: string;
  tags: string[];
  img: string;
  className?: string;
}

export default function EliteCard({ 
  name, 
  age, 
  price, 
  tags, 
  img, 
  className = "" 
}: EliteCardProps) {
  return (
    <div className={`min-w-[160px] h-[220px] rounded-2xl overflow-hidden relative shadow-sm group cursor-pointer ${className}`}>
      <img src={img} alt={name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
      <div className="absolute top-2 left-2 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full flex items-center gap-1">
        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
        <span className="text-white text-[10px] font-medium">在线</span>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 to-transparent p-3 flex flex-col justify-end">
        <div className="flex items-center justify-between mb-1">
          <span className="text-white text-sm font-bold">{name}, {age}</span>
          <span className="text-[#E05299] text-base font-bold">¥{price}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            {tags.map(tag => (
              <span key={tag} className="bg-white/20 text-white/70 text-[9px] px-1.5 py-0.5 rounded">
                {tag}
              </span>
            ))}
          </div>
          <span className="text-white/50 text-[8px]">/小时</span>
        </div>
      </div>
    </div>
  );
}
