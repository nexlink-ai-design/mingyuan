'use client';

import { useState } from 'react';
import { Search, Bell, User, ChevronRight, X, Heart, MapPin, Calendar, Star } from 'lucide-react';
import Link from 'next/link';

export default function SearchResultsPage() {
  const [filters, setFilters] = useState([
    { id: 'city', label: '城市: 上海', active: true },
    { id: 'service', label: '服务: 陪玩', active: true },
    { id: 'price', label: '价格: 高端', active: true },
  ]);

  const companions = [
    {
      id: 1,
      name: '苏菲 Sophie',
      rating: '5.0',
      location: '黄浦区',
      joinedDate: '2025-01',
      tags: ['高端商务', '夜总会', '英语流利'],
      price: '1200',
      status: 'online',
      isFavorite: true,
    },
    {
      id: 2,
      name: '林悦悦',
      rating: '4.8',
      location: '静安区',
      joinedDate: '2024-11',
      tags: ['私人定制', '夜总会', '高尔夫'],
      price: '880',
      status: 'offline',
      isFavorite: false,
    },
    {
      id: 3,
      name: '赵丽娜',
      rating: '4.9',
      location: '徐汇区',
      joinedDate: '2025-03',
      tags: ['酒局气氛', '夜总会', '超模'],
      price: '1500',
      status: 'online',
      isFavorite: false,
    },
    {
      id: 4,
      name: '薇薇',
      rating: '4.7',
      location: '浦东新区',
      joinedDate: '2025-02',
      tags: ['夜总会', '视频验证', '伴游'],
      price: '600',
      status: 'online',
      isFavorite: true,
    },
    {
      id: 5,
      name: '慕斯 Mousse',
      rating: '4.9',
      location: '长宁区',
      joinedDate: '2024-12',
      tags: ['夜总会', '礼仪接待', '舞蹈'],
      price: '980',
      status: 'offline',
      isFavorite: false,
    },
  ];

  const removeFilter = (id: string) => {
    setFilters(filters.filter(f => f.id !== id));
  };

  const resetFilters = () => {
    setFilters([]);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row">
      {/* Desktop Sidebar Navigation */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-gray-100 h-screen sticky top-0 p-6 bg-white z-20">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-[#171a1f] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">名</span>
          </div>
          <span className="text-xl font-bold">玩伴社交</span>
        </div>
        
        <nav className="flex flex-col gap-2">
          <SidebarItem icon="🎮" label="陪玩" active />
          <SidebarItem icon="🎉" label="悦享" />
          <SidebarItem icon="📋" label="订单" />
          <SidebarItem icon="👤" label="我的" />
        </nav>

        <div className="mt-auto pt-6 border-t border-gray-100">
          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E05299] to-[#FF6B9D] flex items-center justify-center text-white font-bold">
              用
            </div>
            <div>
              <p className="text-sm font-bold">用户名</p>
              <p className="text-xs text-gray-500">普通会员</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col relative">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100">
          <div className="px-4 py-3 flex items-center gap-3 max-w-7xl mx-auto w-full">
            <Link href="/selection" className="lg:hidden w-8 h-8 bg-[#171a1f] rounded-md flex items-center justify-center text-white">
              ←
            </Link>
            
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-[#565d6d]" />
              </div>
              <input 
                type="text" 
                placeholder="搜索陪玩 / 游戏 / 昵称" 
                className="w-full bg-[#f3f4f6] border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-[#E05299]/20 outline-none"
              />
            </div>

            <div className="flex items-center gap-1">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Bell className="w-5 h-5 text-[#171a1f]" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors lg:hidden">
                <User className="w-5 h-5 text-[#171a1f]" />
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 px-4 py-6 max-w-7xl mx-auto w-full">
          {/* Title & Filter Header */}
          <div className="flex justify-between items-end mb-4">
            <div>
              <h1 className="text-xl font-bold text-[#171a1f]">为您找到的陪玩</h1>
              <p className="text-xs text-[#565d6d] mt-1">上海 · 陪玩 · 高端筛选结果 (12位)</p>
            </div>
            <Link href="/search/filter">
              <button className="flex items-center gap-1 text-[#E05299] bg-[#E05299]/5 px-3 py-2 rounded-lg text-sm font-medium hover:bg-[#E05299]/10 transition-colors">
                更多筛选
                <ChevronRight className="w-4 h-4" />
              </button>
            </Link>
          </div>

          {/* Active Filters */}
          <div className="flex items-center gap-2 overflow-x-auto py-2 mb-6 pb-2">
            {filters.map((filter) => (
              <div 
                key={filter.id} 
                className="flex items-center gap-2 bg-[#fdf2f7] border border-[#E05299]/20 rounded-full px-3 py-1.5 shadow-sm flex-shrink-0"
              >
                <span className="text-xs font-medium text-[#E05299] whitespace-nowrap">{filter.label}</span>
                <button
                  onClick={() => removeFilter(filter.id)}
                  className="text-[#E05299] hover:text-[#c93d82]"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
            <button 
              onClick={resetFilters}
              className="text-xs font-medium text-[#565d6d] px-3 py-1.5 hover:bg-gray-50 rounded-full transition-colors whitespace-nowrap"
            >
              重置筛选
            </button>
          </div>

          {/* Grid Layout for Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {companions.map((person) => (
              <CompanionCard key={person.id} person={person} />
            ))}
          </div>

          {/* Footer Info */}
          <div className="mt-12 mb-24 text-center">
            <p className="text-xs text-[#565d6d] mb-4">已经到底了，尝试调整筛选条件寻找更多</p>
            <Link href="/search/filter">
              <button className="px-6 py-2 border border-[#E05299]/20 rounded-full text-xs font-medium text-[#E05299] hover:bg-[#E05299]/5 transition-colors">
                修改筛选条件
              </button>
            </Link>
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around items-center h-16 z-40 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
          <MobileNavItem icon="🎮" label="陪玩" active />
          <MobileNavItem icon="🎉" label="悦享" />
          <MobileNavItem icon="📋" label="订单" />
          <MobileNavItem icon="👤" label="我的" />
        </nav>
      </main>
    </div>
  );
}

function CompanionCard({ person }: { person: any }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden flex h-[160px] relative hover:shadow-md transition-shadow group">
      {/* Left: Image Section */}
      <div className="w-[110px] h-full relative flex-shrink-0 bg-gradient-to-br from-[#E05299]/20 to-[#FF6B9D]/20 flex items-center justify-center">
        <div className="text-4xl">👩</div>
        
        {/* Overlay for Offline */}
        {person.status === 'offline' && (
          <div className="absolute inset-0 bg-black/60 z-20 flex items-center justify-center">
            <div className="border border-white/30 rounded px-2 py-0.5">
              <span className="text-white text-xs font-bold">离线</span>
            </div>
          </div>
        )}

        {/* Favorite Button */}
        <button className="absolute top-2 left-2 z-30 w-7 h-7 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/40 transition-colors">
          <Heart 
            className={`w-4 h-4 ${person.isFavorite ? 'text-[#E64C4C] fill-[#E64C4C]' : 'text-white'}`} 
          />
        </button>

        {/* Online Badge */}
        {person.status === 'online' && (
          <div className="absolute bottom-2 left-2 z-30 bg-[#22C55E]/90 rounded px-1.5 py-0.5 flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
            <span className="text-white text-xs font-medium">在线</span>
          </div>
        )}
      </div>

      {/* Right: Info Section */}
      <div className="flex-1 p-3 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-base text-[#171a1f] truncate pr-2">{person.name}</h3>
            <div className="flex items-center gap-0.5 flex-shrink-0">
              <Star className="w-3.5 h-3.5 text-[#F7D56E] fill-[#F7D56E]" />
              <span className="text-xs font-bold text-[#171a1f]">{person.rating}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-1 text-[#565d6d] text-xs">
            <div className="flex items-center gap-0.5">
              <MapPin className="w-3 h-3" />
              <span>{person.location}</span>
            </div>
            <div className="flex items-center gap-0.5">
              <Calendar className="w-3 h-3" />
              <span>入驻 {person.joinedDate}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1 mt-2">
            {person.tags.map((tag: string, i: number) => (
              <span key={i} className="bg-[#f3f4f6] text-[#565d6d] text-[10px] px-2 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-end">
          <div className="flex items-baseline gap-0.5">
            <span className="text-[#E05299] text-sm font-bold">¥</span>
            <span className="text-[#E05299] text-lg font-bold">{person.price}</span>
            <span className="text-[#565d6d] text-[10px] ml-0.5">/小时</span>
          </div>
          <Link href={`/playmate/${person.id}/profile`}>
            <button className="bg-[#E05299] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-sm hover:bg-[#c93d82] transition-colors">
              立即预约
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, active = false }: { icon: string, label: string, active?: boolean }) {
  return (
    <a 
      href="#" 
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
        active 
          ? 'bg-[#fdf2f7] text-[#E05299] font-bold' 
          : 'text-[#565d6d] hover:bg-gray-50'
      }`}
    >
      <span className="text-lg">{icon}</span>
      <span className="text-sm">{label}</span>
    </a>
  );
}

function MobileNavItem({ icon, label, active = false }: { icon: string, label: string, active?: boolean }) {
  return (
    <a href="#" className="flex flex-col items-center gap-1">
      <span className={`text-lg ${active ? 'text-[#E05299]' : 'text-[#565d6d]'}`}>{icon}</span>
      <span className={`text-[10px] ${active ? 'text-[#E05299] font-bold' : 'text-[#565d6d]'}`}>
        {label}
      </span>
    </a>
  );
}
