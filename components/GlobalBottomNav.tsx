'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  ShoppingBag,
  User,
  Search,
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { label: '悦享', href: '/companions', icon: Home },
  { label: '选妃', href: '/selection', icon: Search },
  { label: '订单', href: '/order', icon: ShoppingBag },
  { label: '我的', href: '/user/profile', icon: User },
];

export default function GlobalBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 h-16 flex items-center justify-around px-2 z-40 shadow-lg safe-area-bottom">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
        
        return (
          <Link key={item.label} href={item.href} className="flex-1 h-full">
            <div
              className={`flex flex-col items-center justify-center h-full ${
                isActive ? 'text-[#E05299]' : 'text-gray-600'
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className={`text-xs mt-1 ${isActive ? 'font-bold' : ''}`}>
                {item.label}
              </span>
            </div>
          </Link>
        );
      })}
    </nav>
  );
}
