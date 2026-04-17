'use client';

export default function SelectionBanner() {
  return (
    <section className="px-4 py-4">
      <div className="relative h-[180px] rounded-2xl overflow-hidden shadow-lg group">
        <img src="/IMG_7.webp" alt="banner" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-4">
          <h2 className="text-2xl font-bold mb-1 leading-relaxed">寻找你的心灵玩伴</h2>
          <p className="text-white/90 text-sm mb-3 leading-relaxed">甄选优质名媛，开启专属浪漫之旅</p>
          <button className="bg-[#E05299] text-white text-sm font-medium px-4 py-2 rounded-full w-fit active:scale-95 transition-transform">
            立即预约
          </button>
        </div>
        <div className="absolute bottom-3 right-4 flex gap-1.5">
          <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
          <span className="w-1.5 h-1.5 bg-white/40 rounded-full"></span>
          <span className="w-1.5 h-1.5 bg-white/40 rounded-full"></span>
        </div>
      </div>
    </section>
  );
}
