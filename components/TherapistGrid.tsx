'use client';

import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import { Star, MapPin, BadgeCheck, Search, SlidersHorizontal, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ImageGallery from "@/components/ImageGallery";
import { therapists, CompanionCategory } from "@/data/therapists";

const cities = ["全部", ...Array.from(new Set(therapists.map(t => t.city)))];
const specialties = ["全部", ...Array.from(new Set(therapists.map(t => t.category)))];
const priceRanges = [
  { label: "全部", min: 0, max: Infinity },
  { label: "¥300以下", min: 0, max: 299 },
  { label: "¥300-400", min: 300, max: 400 },
  { label: "¥400以上", min: 401, max: Infinity },
];

const TherapistGrid = ({ category, mode = "companion", featured = "all" }: { category?: CompanionCategory | null; mode?: "companion" | "massage"; featured?: string }) => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("全部");
  const [specialty, setSpecialty] = useState("全部");
  const [priceIdx, setPriceIdx] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedService, setSelectedService] = useState<Record<string, number>>({});
  const [imageSlide, setImageSlide] = useState<Record<string, number>>({});
  const [gallery, setGallery] = useState<{ images: string[]; index: number } | null>(null);

  const filtered = useMemo(() => {
    const range = priceRanges[priceIdx];
    return therapists.filter(t => {
      if (category && t.category !== category) return false;
      if (featured === "new" && !t.isNew) return false;
      if (featured === "recommended" && !t.isRecommended) return false;
      if (search && !t.name.includes(search) && !t.specialty.includes(search) && !t.city.includes(search)) return false;
      if (city !== "全部" && t.city !== city) return false;
      if (specialty !== "全部" && t.specialty !== specialty) return false;
      if (t.price < range.min || t.price > range.max) return false;
      return true;
    });
  }, [search, city, specialty, priceIdx, category, featured]);

  const hasFilters = city !== "全部" || specialty !== "全部" || priceIdx !== 0 || search !== "";
  const clearFilters = () => { setSearch(""); setCity("全部"); setSpecialty("全部"); setPriceIdx(0); };

  return (
    <section className="py-8 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Search bar */}
        <div className="flex gap-3 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="搜索技师姓名、城市或服务类型"
              className="w-full bg-muted/50 border border-border rounded-xl pl-10 pr-4 py-2.5 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <button onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 rounded-xl border text-sm font-medium transition-all ${
              showFilters || hasFilters ? "gradient-accent text-primary-foreground border-transparent" : "bg-muted/50 border-border text-muted-foreground hover:text-foreground"
            }`}>
            <SlidersHorizontal className="w-4 h-4" /><span className="hidden sm:inline">筛选</span>
          </button>
        </div>

        {/* Filter panel */}
        {showFilters && (
          <div className="gradient-card border border-border rounded-xl p-4 mb-4 space-y-3">
            <div>
              <p className="text-sm font-medium text-foreground mb-2">城市</p>
              <div className="flex flex-wrap gap-2">
                {cities.map(c => (
                  <button key={c} onClick={() => setCity(c)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${city === c ? "gradient-accent text-primary-foreground" : "bg-muted/50 text-muted-foreground hover:text-foreground border border-border"}`}>{c}</button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground mb-2">服务类型</p>
              <div className="flex flex-wrap gap-2">
                {specialties.map(s => (
                  <button key={s} onClick={() => setSpecialty(s)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${specialty === s ? "gradient-accent text-primary-foreground" : "bg-muted/50 text-muted-foreground hover:text-foreground border border-border"}`}>{s}</button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground mb-2">价格区间</p>
              <div className="flex flex-wrap gap-2">
                {priceRanges.map((r, i) => (
                  <button key={r.label} onClick={() => setPriceIdx(i)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${priceIdx === i ? "gradient-accent text-primary-foreground" : "bg-muted/50 text-muted-foreground hover:text-foreground border border-border"}`}>{r.label}</button>
                ))}
              </div>
            </div>
            {hasFilters && <button onClick={clearFilters} className="text-xs text-primary hover:underline">清除所有筛选</button>}
          </div>
        )}

        {hasFilters && (
          <p className="text-sm text-muted-foreground mb-3">找到 <span className="text-foreground font-medium">{filtered.length}</span> 位技师</p>
        )}

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground mb-4">未找到匹配的技师</p>
            <Button variant="hero" className="rounded-lg" onClick={clearFilters}>清除筛选</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filtered.map((t) => {
              const svcIdx = selectedService[t.id] || 0;
              const currentService = t.services[svcIdx];
              const imgIdx = imageSlide[t.id] || 0;
              const images = t.images;

              return (
                <div key={t.id} className="gradient-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 group hover:shadow-glow cursor-pointer" onClick={() => router.push(`/therapist/${t.id}`)}>
                  <div className="relative aspect-[1.47/1] overflow-hidden">
                    <div className="flex h-full transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${imgIdx * 100}%)` }}>
                      {images.map((img, i) => (
                        <img key={i} src={img} alt={`${t.name} ${i + 1}`} loading="lazy" width={828} height={564}
                          className="w-full h-full object-cover flex-shrink-0 cursor-pointer"
                          onClick={(e) => { e.stopPropagation(); setGallery({ images, index: i }); }} />
                      ))}
                    </div>

                    {images.length > 1 && (
                      <>
                        <button onClick={(e) => { e.stopPropagation(); setImageSlide(p => ({ ...p, [t.id]: (imgIdx - 1 + images.length) % images.length })); }}
                          className="absolute left-1.5 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-card/60 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                          <ChevronLeft className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); setImageSlide(p => ({ ...p, [t.id]: (imgIdx + 1) % images.length })); }}
                          className="absolute right-1.5 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-card/60 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                          {images.map((_, i) => (
                            <div key={i} className={`rounded-full transition-all ${i === imgIdx ? "w-4 h-1.5 bg-primary" : "w-1.5 h-1.5 bg-muted-foreground/40"}`} />
                          ))}
                        </div>
                      </>
                    )}

                    {t.verified && (
                      <div className="absolute top-2 right-2 bg-card/80 backdrop-blur-sm rounded-full px-2 py-0.5 flex items-center gap-1">
                        <BadgeCheck className="w-3 h-3 text-primary" />
                        <span className="text-[10px] text-foreground">已认证</span>
                      </div>
                    )}
                  </div>

                  <div className="p-3">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-foreground text-base cursor-pointer" onClick={() => router.push(`/therapist/${t.id}`)}>{t.name}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-secondary fill-secondary" />
                        <span className="text-xs font-medium text-foreground">{t.rating.toFixed(1)}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-muted-foreground text-xs mb-2">
                      <MapPin className="w-3 h-3" /><span>{t.city}</span><span className="mx-0.5">·</span><span>{t.specialty}</span><span className="mx-0.5">·</span><span>{t.experience}年经验</span>
                    </div>

                    <div className="flex gap-1 mb-2 overflow-x-auto pb-0.5">
                      {t.services.map((s, i) => (
                        <button key={s.name}
                          onClick={(e) => { e.stopPropagation(); setSelectedService(prev => ({ ...prev, [t.id]: i })); }}
                          className={`px-2 py-1 rounded-md text-[10px] font-medium whitespace-nowrap transition-all ${
                            svcIdx === i ? "gradient-accent text-primary-foreground" : "bg-muted/50 text-muted-foreground border border-border"
                          }`}>{s.name}</button>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-secondary font-bold text-lg">¥{currentService.price}</span>
                        <span className="text-muted-foreground text-[10px] ml-0.5">/{currentService.duration}</span>
                      </div>
                      <Button variant="hero" size="sm" className="rounded-lg text-xs"
                        onClick={(e) => { e.stopPropagation(); router.push(`/booking/${t.id}?service=${encodeURIComponent(currentService.name)}&price=${currentService.price}&duration=${encodeURIComponent(currentService.duration)}`); }}>
                        立即预约
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="text-center mt-8">
          <Button variant="heroOutline" size="lg" className="rounded-xl">查看更多技师</Button>
        </div>
      </div>

      {gallery && <ImageGallery images={gallery.images} initialIndex={gallery.index} onClose={() => setGallery(null)} />}
    </section>
  );
};

export default TherapistGrid;
