'use client';

import { Zap, Search, MessageSquare, User } from 'lucide-react';

export default function DesktopHeader() {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <div className="lg:hidden">
            <img src="/IMG_1.svg" alt="Logo" className="h-5" />
          </div>
          <div className="hidden lg:block bg-[#10B981] p-1.5 rounded-lg">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 max-w-md relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="搜索陪玩/游戏/昵称"
              className="w-full bg-gray-100 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-[#E05299]/20 outline-none transition-all"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
            <MessageSquare className="w-6 h-6 text-gray-700" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors lg:hidden">
            <User className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>
    </header>
  );
}
