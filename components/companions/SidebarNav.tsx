'use client';

import { Home, Compass, ClipboardList, CircleUser, ArrowUp } from 'lucide-react';
import { useState, useEffect } from 'react';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  badge?: string;
}

function NavItem({ icon: Icon, label, active = false, badge }: NavItemProps) {
  return (
    <div className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${active ? 'bg-[#E05299]/10 text-[#E05299]' : 'text-gray-600 hover:bg-gray-50'}`}>
      <div className="flex items-center gap-3">
        <Icon className="w-6 h-6" />
        <span className="font-bold">{label}</span>
      </div>
      {badge && (
        <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
          {badge}
        </span>
      )}
    </div>
  );
}

export default function SidebarNav() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 h-screen sticky top-0 p-6">
      <div className="mb-10">
        <img src="/logo.png" alt="Logo" className="h-8" />
      </div>
      <nav className="flex-1 space-y-4">
        <NavItem icon={Home} label="陪玩" active />
        <NavItem icon={Compass} label="悦享" />
        <NavItem icon={ClipboardList} label="订单" badge="9" />
        <NavItem icon={CircleUser} label="我的" />
      </nav>
      <div className="mt-auto pt-6 border-t border-gray-100 space-y-4">
        <button 
          onClick={handleScrollToTop}
          className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-r from-[#E05299] to-[#ff7eb3] text-white font-bold hover:shadow-lg transition-all duration-200 transform hover:scale-105"
        >
          <ArrowUp className="w-5 h-5" />
          <span>返回顶部</span>
        </button>
        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
            <img src="/IMG_5.svg" alt="User" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">未登录</p>
            <p className="text-xs text-gray-500">点击登录账号</p>
          </div>
        </div>
      </div>
    </aside>
  );
}