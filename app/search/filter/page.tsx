'use client';

import { useState } from 'react';
import { ChevronLeft, MapPin, Briefcase, DollarSign, Star, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function FilterPage() {
  const [selectedCity, setSelectedCity] = useState('上海');
  const [selectedService, setSelectedService] = useState('电竞陪玩');
  const [selectedPrice, setSelectedPrice] = useState('高端');
  const [serviceRating, setServiceRating] = useState(4);
  const [appearanceRating, setAppearanceRating] = useState(5);

  const cities = ['全部', '上海', '北京', '广州', '深圳', '杭州', '成都'];
  const services = ['酒吧', '夜店', '电竞陪玩', '户外伴游', '私人定制', '高端陪聊'];
  const prices = ['大众', '中端', '高端', '极致奢华'];

  const handleReset = () => {
    setSelectedCity('上海');
    setSelectedService('电竞陪玩');
    setSelectedPrice('高端');
    setServiceRating(4);
    setAppearanceRating(5);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#fafafb]">
      {/* Header - Mobile & Tablet/Desktop */}
      <header className="sticky top-0 z-50 bg-white border-b border-[#dee1e6] px-4 py-3 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Back Button */}
          <Link href="/search" className="flex items-center gap-2">
            <ChevronLeft className="w-6 h-6 text-[#171a1f]" />
            <span className="text-lg font-bold">返回</span>
          </Link>
          <h1 className="text-xl font-bold">高级筛选</h1>
          <div className="w-10" />
        </div>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row max-w-7xl mx-auto w-full">
        {/* Desktop Sidebar Navigation */}
        <aside className="hidden lg:flex flex-col w-64 border-r border-[#dee1e6] p-6 gap-4 bg-white">
          <nav className="space-y-2">
            <SidebarItem icon="🎮" label="陪玩" active />
            <SidebarItem icon="🎉" label="悦享" />
            <SidebarItem icon="📋" label="订单" />
            <SidebarItem icon="👤" label="我的" />
          </nav>
        </aside>

        {/* Content Area */}
        <div className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="max-w-2xl mx-auto lg:mx-0">
            {/* Title & Status */}
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <h2 className="text-xl font-bold">高级筛选</h2>
              <div className="px-3 py-1 bg-[#E05299]/10 rounded-full">
                <span className="text-sm font-semibold text-[#E05299]">128 位在线</span>
              </div>
            </div>

            {/* Filter Sections */}
            <div className="space-y-8 pb-32 lg:pb-8">
              {/* City Selection */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-4 h-4 text-[#565d6d]" />
                  <h3 className="font-semibold text-[#171a1f]">选择城市</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cities.map((city) => (
                    <FilterChip 
                      key={city}
                      label={city}
                      active={selectedCity === city}
                      onClick={() => setSelectedCity(city)}
                    />
                  ))}
                </div>
              </section>

              {/* Service Type */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Briefcase className="w-4 h-4 text-[#565d6d]" />
                  <h3 className="font-semibold text-[#171a1f]">服务类型</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {services.map((service) => (
                    <FilterChip 
                      key={service}
                      label={service}
                      active={selectedService === service}
                      onClick={() => setSelectedService(service)}
                    />
                  ))}
                </div>
              </section>

              {/* Price Range */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <DollarSign className="w-4 h-4 text-[#565d6d]" />
                  <h3 className="font-semibold text-[#171a1f]">价格区间</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {prices.map((price) => (
                    <FilterChip 
                      key={price}
                      label={price}
                      active={selectedPrice === price}
                      onClick={() => setSelectedPrice(price)}
                    />
                  ))}
                </div>
              </section>

              {/* Ratings Grid for Tablet/Desktop */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Service Rating */}
                <section>
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="w-4 h-4 text-[#F7D56E]" />
                    <h3 className="font-semibold text-[#171a1f]">服务评价</h3>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <button
                          key={i}
                          onClick={() => setServiceRating(i)}
                          className={`transition-transform hover:scale-110 ${i <= serviceRating ? 'text-[#F7D56E]' : 'text-gray-300'}`}
                        >
                          <Star className="w-8 h-8 fill-current" />
                        </button>
                      ))}
                    </div>
                    <span className="text-sm text-[#565d6d]">{serviceRating}.0 以上</span>
                  </div>
                </section>

                {/* Appearance Rating */}
                <section>
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-4 h-4 text-[#E05299]" />
                    <h3 className="font-semibold text-[#171a1f]">颜值评价</h3>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <button
                          key={i}
                          onClick={() => setAppearanceRating(i)}
                          className={`transition-transform hover:scale-110 ${i <= appearanceRating ? 'text-[#E05299]' : 'text-gray-300'}`}
                        >
                          <Star className="w-8 h-8 fill-current" />
                        </button>
                      ))}
                    </div>
                    <span className="text-sm text-[#565d6d]">{appearanceRating}.0 以上</span>
                  </div>
                </section>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button 
                  onClick={handleReset}
                  className="flex-1 h-12 flex items-center justify-center gap-2 bg-white border border-[#dee1e6] rounded-2xl font-medium text-[#171a1f] hover:bg-gray-50 transition-colors"
                >
                  🔄 重置
                </button>
                <Link href="/search" className="flex-1">
                  <button className="w-full h-12 flex items-center justify-center gap-2 bg-[#E05299] rounded-2xl font-medium text-white shadow-lg shadow-[#E05299]/20 hover:bg-[#c94285] transition-colors">
                    ✓ 确定
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation - Mobile Only */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E7EB] flex justify-around items-center h-16 z-50">
        <NavItem icon="🎮" label="陪玩" active />
        <NavItem icon="🎉" label="悦享" />
        <NavItem icon="📋" label="订单" />
        <NavItem icon="👤" label="我的" />
      </nav>
    </div>
  );
}

interface FilterChipProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

function FilterChip({ label, active = false, onClick }: FilterChipProps) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2 rounded-full text-sm transition-all ${
        active
          ? 'bg-[#E05299] text-white border border-[#E05299] shadow-md'
          : 'bg-white text-[#171a1f] border border-[#dee1e6] hover:border-[#E05299]/50'
      }`}
    >
      {label}
    </button>
  );
}

function NavItem({ icon, label, active = false }: { icon: string; label: string; active?: boolean }) {
  return (
    <a href="#" className="flex flex-col items-center justify-center flex-1 h-full gap-1">
      <span className={`text-lg ${active ? 'text-[#E05299]' : 'text-[#565d6d]'}`}>{icon}</span>
      <span className={`text-[10px] font-bold ${active ? 'text-[#E05299]' : 'text-[#565d6d]'}`}>
        {label}
      </span>
    </a>
  );
}

function SidebarItem({ icon, label, active = false }: { icon: string; label: string; active?: boolean }) {
  return (
    <a
      href="#"
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
        active ? 'bg-[#E05299]/10 text-[#E05299]' : 'text-[#565d6d] hover:bg-gray-100'
      }`}
    >
      <span className="text-lg">{icon}</span>
      <span className="font-medium">{label}</span>
    </a>
  );
}
