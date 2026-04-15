'use client';

import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import { Sparkles, Shield, Star, MapPin } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16 pb-24">
        {/* Platform intro */}
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 gradient-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-gradient">关于悦享按摩</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              全国专业按摩技师展示与陪玩服务平台，覆盖300+城市，严选认证技师，为您带来极致放松体验
            </p>
            <div className="flex items-center justify-center gap-6 flex-wrap text-muted-foreground">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-secondary" />
                <span className="text-sm">10,000+ 认证技师</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm">覆盖 300+ 城市</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-accent" />
                <span className="text-sm">实名认证保障</span>
              </div>
            </div>
          </div>
        </section>

        {/* Footer-like info */}
        <section className="py-12 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-foreground mb-3 text-sm">服务</h4>
                <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                  <span>精油SPA</span>
                  <span>中式推拿</span>
                  <span>泰式按摩</span>
                  <span>足疗养生</span>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-3 text-sm">联系我们</h4>
                <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                  <span>客服热线: 400-888-8888</span>
                  <span>工作时间: 9:00-22:00</span>
                  <span>邮箱: hi@yuexiang.com</span>
                </div>
              </div>
            </div>
            <div className="border-t border-border mt-8 pt-6 text-center text-sm text-muted-foreground">
              © 2026 悦享按摩 版权所有
            </div>
          </div>
        </section>
      </main>
      <BottomNav />
    </div>
  );
}
