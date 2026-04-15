'use client';

import { useRouter } from "next/navigation";
import { useState, use } from "react";
import { Star, MapPin, BadgeCheck, ArrowLeft, MessageCircle, ChevronLeft, ChevronRight, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/BottomNav";
import { getTherapistById } from "@/data/therapists";

export default function TherapistDetail({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const t = getTherapistById(id);
  const [imgIdx, setImgIdx] = useState(0);
  const [selectedServiceIdx, setSelectedServiceIdx] = useState(0);

  if (!t) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground text-lg mb-4">未找到该技师</p>
          <Button variant="hero" onClick={() => router.push("/")}>返回首页</Button>
        </div>
      </div>
    );
  }

  const images = t.images;
  const currentService = t.services[selectedServiceIdx];

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="flex items-center justify-between h-14 px-4 max-w-4xl mx-auto">
          <button onClick={() => router.back()} className="p-2 -ml-2">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="font-semibold text-foreground">{t.name}</h1>
          <div className="flex items-center gap-2">
            <button className="p-2"><Heart className="w-5 h-5 text-muted-foreground" /></button>
            <button className="p-2"><Share2 className="w-5 h-5 text-muted-foreground" /></button>
          </div>
        </div>
      </div>

      <main className="pb-24">
        {/* Image carousel */}
        <div className="relative aspect-[5/8] max-h-[500px] overflow-hidden group">
          <div className="flex h-full transition-transform duration-300" style={{ transform: `translateX(-${imgIdx * 100}%)` }}>
            {images.map((img, i) => (
              <img key={i} src={img} alt={`${t.name} ${i + 1}`} className="w-full h-full object-cover flex-shrink-0 cursor-pointer"
                width={512} height={672} />
            ))}
          </div>
          {images.length > 1 && (
            <>
              <button onClick={() => setImgIdx((imgIdx - 1 + images.length) % images.length)}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-card/60 backdrop-blur-sm border border-border flex items-center justify-center text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={() => setImgIdx((imgIdx + 1) % images.length)}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-card/60 backdrop-blur-sm border border-border flex items-center justify-center text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRight className="w-4 h-4" />
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {images.map((_, i) => (
                  <button key={i} onClick={() => setImgIdx(i)}
                    className={`rounded-full transition-all ${i === imgIdx ? "w-5 h-2 bg-primary" : "w-2 h-2 bg-muted-foreground/40"}`} />
                ))}
              </div>
            </>
          )}
          <div className="absolute bottom-3 right-3 bg-card/70 backdrop-blur-sm rounded-full px-2.5 py-1 text-xs text-foreground">
            {imgIdx + 1}/{images.length}
          </div>
        </div>

        {/* Profile info */}
        <div className="max-w-4xl mx-auto px-4 -mt-4 relative z-10">
          <div className="gradient-card border border-border rounded-2xl p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-xl font-bold text-foreground">{t.name}</h1>
                  {t.verified && (
                    <span className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
                      <BadgeCheck className="w-3 h-3" />已认证
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground text-xs">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{t.city}</span>
                  <span>·</span><span>{t.specialty}</span><span>·</span><span>{t.experience}年经验</span>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-secondary fill-secondary" />
                  <span className="font-semibold text-foreground">{t.rating}</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{t.bio}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {t.tags.map((tag) => (
                <span key={tag} className="px-2 py-1 rounded bg-primary/10 text-primary text-xs font-medium">
                  {tag}
                </span>
              ))}
            </div>

            {/* Services */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-foreground">服务项目</p>
              <div className="flex flex-wrap gap-2">
                {t.services.map((svc, i) => (
                  <button
                    key={svc.name}
                    onClick={() => setSelectedServiceIdx(i)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      i === selectedServiceIdx
                        ? "gradient-accent text-primary-foreground"
                        : "bg-muted/50 text-muted-foreground border border-border hover:text-foreground"
                    }`}
                  >
                    {svc.name} - ¥{svc.price}
                  </button>
                ))}
              </div>
              {currentService && (
                <div className="mt-3 pt-3 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-1">时长：<span className="text-foreground">{currentService.duration}</span></p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="max-w-4xl mx-auto px-4 mt-6 flex gap-3">
          <Button variant="outline" className="flex-1 rounded-xl gap-2">
            <MessageCircle className="w-4 h-4" />
            立即咨询
          </Button>
          <Button variant="hero" className="flex-1 rounded-xl"
            onClick={() => {
              const service = t.services[selectedServiceIdx];
              router.push(`/booking/${t.id}?service=${encodeURIComponent(service.name)}&price=${service.price}&duration=${encodeURIComponent(service.duration)}`);
            }}
          >
            立即预约
          </Button>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
