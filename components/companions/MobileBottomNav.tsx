'use client';

import { Home, Compass, ClipboardList, CircleUser } from 'lucide-react';

interface MobileNavItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  badge?: string;
}

function MobileNavItem({ icon: Icon, label, active = false, badge }: MobileNavItemProps) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 relative">
      <Icon className={`w-6 h-6 ${active ? 'text-gray-900' : 'text-gray-400'}`} />
      <span className={`text-[10px] mt-1 ${active ? 'text-gray-900 font-bold' : 'text-gray-400'}`}>{label}</span>
      {badge && (
        <span className="absolute top-1 right-1/2 translate-x-4 bg-red-500 text-white text-[8px] font-bold px-1 py-0.5 rounded-full border-2 border-white min-w-[16px] text-center">
          {badge}
        </span>
      )}
    </div>
  );
}

export default function MobileBottomNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around items-center h-16 px-2 safe-bottom z-40">
      <MobileNavItem icon={Home} label="陪玩" active />
      <MobileNavItem icon={Compass} label="悦享" />
      <MobileNavItem icon={ClipboardList} label="订单" badge="9" />
      <MobileNavItem icon={CircleUser} label="我的" />
    </nav>
  );
}
