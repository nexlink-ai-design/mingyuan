'use client';

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { User, ClipboardList, Heart, Settings, ChevronRight, LogOut, MapPin, Phone, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";

const menuItems = [
  { icon: ClipboardList, label: "我的订单", desc: "查看全部订单记录", path: "/orders" },
  { icon: Heart, label: "我的收藏", desc: "收藏的技师", path: "#" },
  { icon: MapPin, label: "地址管理", desc: "管理服务地址", path: "#" },
  { icon: Info, label: "关于我们", desc: "平台介绍与服务", path: "/about" },
  { icon: Phone, label: "联系客服", desc: "在线咨询帮助", path: "#" },
  { icon: Settings, label: "账号设置", desc: "修改密码、安全设置", path: "#" },
];

export default function Profile() {
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const stored: any[] = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(stored);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16 pb-24">
        {/* Profile header */}
        <div className="gradient-accent py-12 px-4">
          <div className="max-w-2xl mx-auto flex items-center gap-5">
            <div className="w-20 h-20 bg-card/30 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-primary-foreground/30">
              <User className="w-10 h-10 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary-foreground mb-1">游客用户</h1>
              <p className="text-primary-foreground/70 text-sm">登录后享受更多服务</p>
              <Button variant="heroOutline" size="sm" className="mt-2 rounded-lg border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/10" onClick={() => router.push("/login")}>
                登录 / 注册
              </Button>
            </div>
          </div>
        </div>

        {/* Quick stats */}
        <div className="max-w-2xl mx-auto px-4 -mt-6">
          <div className="gradient-card border border-border rounded-xl p-5 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-xl font-bold text-foreground">{orders.length}</p>
              <p className="text-xs text-muted-foreground mt-1">全部订单</p>
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">0</p>
              <p className="text-xs text-muted-foreground mt-1">待服务</p>
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">0</p>
              <p className="text-xs text-muted-foreground mt-1">收藏技师</p>
            </div>
          </div>
        </div>

        {/* Menu */}
        <div className="max-w-2xl mx-auto px-4 mt-6">
          <div className="gradient-card border border-border rounded-xl overflow-hidden">
            {menuItems.map((item, i) => {
              const Icon = item.icon;
              const isClickable = item.path && item.path !== "#";
              return (
                <button
                  key={item.label}
                  onClick={() => isClickable && router.push(item.path)}
                  disabled={!isClickable}
                  className={`w-full px-4 py-4 flex items-center justify-between border-b border-border last:border-b-0 transition-colors ${
                    isClickable ? "hover:bg-muted/50 cursor-pointer" : "cursor-not-allowed"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-primary" />
                    <div className="text-left">
                      <p className="font-medium text-foreground text-sm">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Logout button */}
        <div className="max-w-2xl mx-auto px-4 mt-6">
          <Button variant="outline" size="lg" className="w-full rounded-xl justify-center gap-2">
            <LogOut className="w-4 h-4" />
            退出登录
          </Button>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
