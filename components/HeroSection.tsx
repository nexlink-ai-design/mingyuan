'use client';

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  { image: "/banner-1.jpg", title: "全国认证 · 品质服务", subtitle: "严选专业技师，极致放松体验" },
  { image: "/banner-2.jpg", title: "人气技师 · 火热推荐", subtitle: "数千好评，口碑之选" },
  { image: "/banner-3.jpg", title: "新人专享 · 首单立减", subtitle: "首次下单享8折优惠" },
  { image: "/banner-4.jpg", title: "多元服务 · 满足所需", subtitle: "精油SPA · 推拿 · 泰式按摩" },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback(
    (idx: number) => {
      if (animating) return;
      setAnimating(true);
      setCurrent(idx);
      setTimeout(() => setAnimating(false), 500);
    },
    [animating]
  );

  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo]);
  const prev = useCallback(() => goTo((current - 1 + slides.length) % slides.length), [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative w-full h-[200px] overflow-hidden">
      {/* Slides */}
      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div key={i} className="relative w-full h-full flex-shrink-0">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
              width={1200}
              height={512}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <h2 className="text-lg font-bold text-foreground drop-shadow-lg">{slide.title}</h2>
              <p className="text-sm text-foreground/80 drop-shadow">{slide.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Nav arrows */}
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-card/60 backdrop-blur-sm border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-card/60 backdrop-blur-sm border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === current ? "bg-primary w-6" : "bg-muted-foreground/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
