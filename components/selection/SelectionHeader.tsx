'use client';

import { Search, MessageSquare, User } from 'lucide-react';

export default function SelectionHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3">
      <div className="w-8 h-8 bg-[#E05299] rounded-md flex items-center justify-center shrink-0">
        <img src="/IMG_6.svg" alt="logo" className="w-5 h-5" />
      </div>
      <div className="flex-1 relative">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search className="w-4 h-4 text-gray-700" />
        </div>
        <input
          type="text"
          placeholder="搜索陪玩 / 游戏 / 昵称"
          className="w-full bg-gray-50 rounded-full py-2 pl-9 pr-4 text-sm text-gray-900 placeholder-gray-600 border-none focus:ring-1 focus:ring-[#E05299] shadow-sm leading-relaxed"
        />
      </div>
      <div className="flex items-center gap-2">
        <button className="w-9 h-9 bg-gray-50 rounded-full flex items-center justify-center relative">
          <MessageSquare className="w-5 h-5 text-gray-700" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
        </button>
        <button className="w-9 h-9 bg-gray-50 rounded-full flex items-center justify-center">
          <User className="w-5 h-5 text-gray-700" />
        </button>
      </div>
    </header>
  );
}
