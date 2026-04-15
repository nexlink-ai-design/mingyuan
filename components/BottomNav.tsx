'use client';

import { useRouter, usePathname } from "next/navigation";
import { Home, ClipboardList, User, Heart } from "lucide-react";

const tabs = [
  { icon: Home, label: "名媛", path: "/" },
  { icon: Heart, label: "悦享", path: "/massage" },
  { icon: ClipboardList, label: "订单", path: "/orders" },
  { icon: User, label: "我的", path: "/profile" },
];

const BottomNav = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-xl border-t border-border md:hidden">
      <div className="flex items-center justify-around h-16 px-2">
        {tabs.map((tab) => {
          const isActive = tab.path === "/"
            ? pathname === "/"
            : pathname.startsWith(tab.path);
          return (
            <button
              key={tab.path}
              onClick={() => router.push(tab.path)}
              className={`flex flex-col items-center gap-1 flex-1 py-2 transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
      {/* Safe area padding for notched phones */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
};

export default BottomNav;
