'use client';

export default function HeroBanner() {
  return (
    <section className="relative rounded-2xl overflow-hidden aspect-[358/180] lg:aspect-[1200/300] shadow-lg group">
      <img 
        src="/IMG_7.webp" 
        alt="Banner" 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6 lg:p-10">
        <h1 className="text-white text-xl lg:text-4xl font-bold mb-1">女神集结 · 悦享陪伴</h1>
        <p className="text-white/80 text-xs lg:text-lg mb-4">首单预约立减 50 元</p>
        <button className="bg-[#E05299] text-white text-xs lg:text-sm font-bold px-6 py-2 rounded-full w-fit hover:bg-[#c44183] transition-colors shadow-lg">
          立即体验
        </button>
      </div>
    </section>
  );
}
