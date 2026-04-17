'use client';

import { Settings, Home, Search, ShoppingBag, MessageCircle, User, LogOut } from 'lucide-react';
import Link from 'next/link';
import GlobalBottomNav from '@/components/GlobalBottomNav';

interface NavItem {
  icon: typeof Home;
  label: string;
  href: string;
  badge?: string;
  active?: boolean;
}

export default function UserProfilePage() {
  const navItems: NavItem[] = [
    { icon: Home, label: '首页', href: '/companions', active: false },
    { icon: Search, label: '发现', href: '/selection', active: false },
    { icon: MessageCircle, label: '消息', href: '#', badge: '9', active: false },
    { icon: User, label: '个人中心', href: '/user/profile', active: true },
  ];

  return (
    <div className="min-h-screen bg-[#fcfcfc] flex flex-col lg:flex-row">
      {/* Desktop Sidebar Navigation */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-[#E3E0DE] h-screen sticky top-0 p-6">
        <div className="mb-10 px-2">
          <h1 className="text-2xl font-bold text-[#1C1A17]">曦月酱 ✨</h1>
        </div>
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.label} href={item.href}>
                <span className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${
                  item.active ? 'bg-[#E05299]/10 text-[#E05299]' : 'text-[#655E58] hover:bg-gray-50'
                }`}>
                  <Icon className="w-6 h-6" />
                  <span className="font-medium flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </span>
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto pt-6 border-t border-[#E3E0DE]">
          <Link href="#">
            <span className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-[#655E58] hover:bg-gray-50 cursor-pointer">
              <Settings className="w-6 h-6" />
              <span className="font-medium">设置</span>
            </span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col max-w-5xl mx-auto w-full pb-24 lg:pb-10 lg:px-8">
        
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#E3E0DE] px-4 h-14 flex items-center justify-between">
          <div className="w-10" />
          <h2 className="text-lg font-bold text-[#1C1A17]">个人中心</h2>
          <Link href="#">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </Link>
        </header>

        {/* Profile Section */}
        <section className="px-5 pt-6 lg:pt-10">
          <div className="flex items-start gap-4">
            <div className="relative">
              {/* Avatar Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#E05299] to-yellow-400 rounded-full blur-md opacity-20 scale-110" />
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-sm bg-gradient-to-br from-pink-400 to-pink-600">
                <div className="w-full h-full flex items-center justify-center text-white text-2xl font-bold">D</div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#E05299] rounded-full border-2 border-white flex items-center justify-center">
                <span className="text-white text-xs">👑</span>
              </div>
            </div>
            
            <div className="flex-1 pt-1">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-[#1C1A17]">曦月酱 ✨</h3>
                <span className="bg-yellow-200 text-gray-800 text-xs font-bold px-2 py-0.5 rounded-full">LV.18</span>
              </div>
              <p className="text-xs text-[#655E58] mt-1">ID: 8899520 | 上海市</p>
              <p className="text-sm text-[#655E58] mt-2 italic">"追求极致的竞技体验与社交温暖..."</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-10 mt-6 px-2">
            <div className="flex flex-col items-start">
              <span className="text-lg font-bold text-[#1C1A17]">1.2k</span>
              <span className="text-xs text-[#655E58]">获赞</span>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-lg font-bold text-[#1C1A17]">582</span>
              <span className="text-xs text-[#655E58]">关注</span>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-lg font-bold text-[#1C1A17]">2.4w</span>
              <span className="text-xs text-[#655E58]">粉丝</span>
            </div>
          </div>
        </section>

        {/* Orders Section */}
        <section className="mt-8 px-5">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h4 className="font-semibold text-[#1C1A17]">我的订单</h4>
              <Link href="#" className="flex items-center text-xs text-[#655E58] hover:text-[#E05299] transition-colors">
                查看全部
                <span className="ml-1">→</span>
              </Link>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <OrderAction label="待付款" badge="2" />
              <OrderAction label="进行中" badge="1" />
              <OrderAction label="待评价" />
              <OrderAction label="退款/售后" />
            </div>
          </div>
        </section>

        {/* Promotion Cards */}
        <section className="mt-6 px-5 grid grid-cols-2 gap-4">
          <Link href="/agent/apply">
            <div className="bg-[#FDF2F7] border border-[#E05299]/10 rounded-2xl p-4 relative overflow-hidden group cursor-pointer hover:shadow-md transition-shadow">
              <div className="relative z-10">
                <h4 className="text-[#410B26] font-bold">成为名媛</h4>
                <p className="text-xs text-[#410B26]/70 mt-1">高佣金 灵活排班</p>
                <div className="mt-4 flex items-center text-[#E05299] text-xs font-bold">
                  立即申请
                  <span className="ml-1">→</span>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/agent/apply">
            <div className="bg-[#FEFBF0] border border-yellow-100 rounded-2xl p-4 relative overflow-hidden group cursor-pointer hover:shadow-md transition-shadow">
              <div className="relative z-10">
                <h4 className="text-yellow-900 font-bold">成为经纪人</h4>
                <p className="text-xs text-yellow-900/70 mt-1">建立团队 坐享收益</p>
                <div className="mt-4 flex items-center text-yellow-700 text-xs font-bold">
                  立即申请
                  <span className="ml-1">→</span>
                </div>
              </div>
            </div>
          </Link>
        </section>

        {/* Account & Tools */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-6">
          <section className="mt-8 px-5">
            <h5 className="text-xs font-bold text-[#655E58] tracking-wider uppercase mb-3 px-1">账户与钱包</h5>
            <div className="bg-white rounded-2xl border border-[#E3E0DE] overflow-hidden shadow-sm">
              <ListItem label="我的钱包" value="余额 ¥12,500.00" />
              <ListItem label="会员中心" value="SVIP 剩32天" noBorder />
            </div>
          </section>

          <section className="mt-8 px-5">
            <h5 className="text-xs font-bold text-[#655E58] tracking-wider uppercase mb-3 px-1">通用工具</h5>
            <div className="bg-white rounded-2xl border border-[#E3E0DE] overflow-hidden shadow-sm">
              <ListItem label="实名认证" value="已认证" />
              <ListItem label="帮助与反馈" />
              <ListItem label="举报与建议" noBorder />
            </div>
          </section>
        </div>
      </main>

      <GlobalBottomNav />
    </div>
  );
}

function OrderAction({ label, badge }: { label: string; badge?: string }) {
  return (
    <button className="flex flex-col items-center gap-2 group">
      <div className="relative w-11 h-11 bg-[#F6F5F4]/50 rounded-2xl flex items-center justify-center group-hover:bg-[#F6F5F4] transition-colors">
        <span className="text-lg">📦</span>
        {badge && (
          <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
            {badge}
          </div>
        )}
      </div>
      <span className="text-xs font-medium text-[#1C1A17]">{label}</span>
    </button>
  );
}

function ListItem({ label, value, noBorder = false }: { label: string; value?: string; noBorder?: boolean }) {
  return (
    <div className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-50 transition-colors ${!noBorder ? 'border-b border-[#E3E0DE]/50' : ''}`}>
      <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center">
        <span>💼</span>
      </div>
      <span className="flex-1 text-sm font-medium text-[#1C1A17]">{label}</span>
      {value && <span className="text-xs text-[#655E58] mr-1">{value}</span>}
    </div>
  );
}
