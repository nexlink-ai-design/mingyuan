'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, Menu, User } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-muted/20 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push("/")}>
          <div className="w-8 h-8 gradient-accent rounded-lg flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg text-foreground">名媛选妃</span>
        </div>

        <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <button onClick={() => router.push("/")} className="hover:text-foreground transition-colors cursor-pointer">首页</button>
          <button onClick={() => router.push("/")} className="hover:text-foreground transition-colors cursor-pointer">找技师</button>
          <button onClick={() => router.push("/orders")} className="hover:text-foreground transition-colors cursor-pointer">我的订单</button>
          <button onClick={() => router.push("/profile")} className="hover:text-foreground transition-colors cursor-pointer">个人中心</button>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => router.push("/profile")}>
            <User className="w-4 h-4 mr-1" />
            我的
          </Button>
          <Button variant="hero" size="sm" className="rounded-lg">注册</Button>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-card border-b border-border px-4 py-4 flex flex-col gap-3 text-sm">
          <button onClick={() => { router.push("/"); setOpen(false); }} className="text-muted-foreground hover:text-foreground py-1 cursor-pointer">首页</button>
          <button onClick={() => { router.push("/"); setOpen(false); }} className="text-muted-foreground hover:text-foreground py-1 cursor-pointer">找技师</button>
          <button onClick={() => { router.push("/orders"); setOpen(false); }} className="text-muted-foreground hover:text-foreground py-1 cursor-pointer">我的订单</button>
          <button onClick={() => { router.push("/profile"); setOpen(false); }} className="text-muted-foreground hover:text-foreground py-1 cursor-pointer">个人中心</button>
          <div className="flex gap-2 mt-2">
            <Button variant="ghost" size="sm" className="flex-1" onClick={() => { router.push("/profile"); setOpen(false); }}>我的</Button>
            <Button variant="hero" size="sm" className="flex-1 rounded-lg">注册</Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
