'use client';

import { useState } from "react";
import { Handshake, Wine, Music, Plane, Heart, Gamepad2, Star, Zap, Flame } from "lucide-react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TherapistGrid from "@/components/TherapistGrid";
import BottomNav from "@/components/BottomNav";
import { CompanionCategory, therapists } from "@/data/therapists";

const companionTabs: { label: string; value: CompanionCategory | null; icon: React.ElementType }[] = [
  { label: "全部", value: null, icon: Flame },
  { label: "应酬", value: "应酬", icon: Handshake },
  { label: "酒吧", value: "酒吧", icon: Wine },
  { label: "夜总会", value: "夜总会", icon: Music },
  { label: "旅游", value: "旅游", icon: Plane },
  { label: "长期", value: "长期", icon: Heart },
  { label: "游戏", value: "游戏", icon: Gamepad2 },
];

const featuredTabs = [
  { label: "全部", value: "all", icon: null },
  { label: "新人", value: "new", icon: Zap },
  { label: "推荐", value: "recommended", icon: Star },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<CompanionCategory | null>(null);
  const [featuredTab, setFeaturedTab] = useState("all");

  const newComers = therapists.filter((t) => t.isNew);
  const marqueeSource = newComers.length > 0 ? newComers : therapists;
  const marqueeItems = marqueeSource.length > 0
    ? Array.from({ length: 20 }, (_, i) => marqueeSource[i % marqueeSource.length])
    : [];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16 pb-24">
        <HeroSection />

        {/* 新人栏目：一行 20 个，跑马灯效果 */}
        <div className="px-4 pt-5 pb-3">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between gap-2 mb-4">
              <div>
                <div className="w-1 h-5 rounded-full gradient-accent" />
                <h2 className="text-lg font-bold text-foreground">新人上新</h2>
                <p className="text-xs text-muted-foreground">20 位新人，横向滚动展示</p>
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl bg-card p-3">
              <div className="inline-flex w-max animate-marquee gap-4 whitespace-nowrap">
                {marqueeItems.concat(marqueeItems).map((t, index) => (
                  <div key={`${t.id}-${index}`} className="flex-shrink-0 w-56 rounded-3xl overflow-hidden border border-border bg-card shadow-sm transition-all">
                    <div className="relative aspect-[1.47/1] overflow-hidden">
                      <img
                        src={t.image}
                        alt={t.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-3">
                      <p className="text-sm font-bold text-foreground truncate">{t.name}</p>
                      <p className="text-xs text-muted-foreground mt-1 truncate">{t.city} · {t.specialty}</p>
                      <div className="mt-3 flex items-center justify-between text-sm">
                        <span className="font-semibold text-secondary">¥{t.price}</span>
                        <span className="text-[11px] text-muted-foreground">{t.rating.toFixed(1)}分</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 推荐技师栏目 */}
        <div className="px-4 pt-5 pb-3">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between gap-2 mb-4">
              <div>
                <div className="w-1 h-5 rounded-full gradient-accent" />
                <h2 className="text-lg font-bold text-foreground">推荐技师</h2>
                <p className="text-xs text-muted-foreground">精选推荐，2 排展示，每排 4 个</p>
              </div>
              <button className="text-xs text-primary hover:underline">查看全部</button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {therapists.filter((t) => t.isRecommended).slice(0, 8).map((t) => (
                <div key={t.id} className="rounded-3xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-glow transition-all">
                  <div className="relative aspect-[1.47/1] overflow-hidden">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-bold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{t.city} · {t.specialty}</p>
                    <div className="mt-3 flex items-center justify-between text-sm">
                      <span className="font-semibold text-secondary">¥{t.price}</span>
                      <span className="text-[11px] text-muted-foreground">{t.rating.toFixed(1)}分</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 悦色 vibrant header */}
        <div className="px-4 pt-5 pb-1">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-5 rounded-full gradient-accent" />
              <h2 className="text-lg font-bold text-foreground">悦色 · 精彩陪玩</h2>
            </div>
          </div>
        </div>

        {/* Companion Category Tabs */}
        <div className="px-4 pb-2">
          <div className="max-w-6xl mx-auto">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {companionTabs.map((tab) => {
                const isActive = activeCategory === tab.value;
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.label}
                    onClick={() => setActiveCategory(tab.value)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                      isActive
                        ? "gradient-accent text-primary-foreground shadow-glow"
                        : "bg-muted/50 text-muted-foreground border border-border hover:text-foreground hover:border-primary/30"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <TherapistGrid category={activeCategory} mode="companion" featured={featuredTab} />
      </main>
      <BottomNav />
    </div>
  );
}
