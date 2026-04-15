'use client';

import { useState, use } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock, MapPin, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import Navbar from "@/components/Navbar";
import { getTherapistById } from "@/data/therapists";
import { toast } from "sonner";

const timeSlots = ["10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00", "19:00", "20:00"];

export default function Booking({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { id } = use(params);
  const t = getTherapistById(id);

  const serviceName = searchParams.get("service") || "";
  const price = Number(searchParams.get("price")) || 0;
  const duration = searchParams.get("duration") || "";

  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [address, setAddress] = useState("");

  if (!t) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">未找到该技师</p>
      </div>
    );
  }

  const handleConfirm = () => {
    if (!date || !time) {
      toast.error("请选择预约日期和时间");
      return;
    }
    if (!address.trim()) {
      toast.error("请输入服务地址");
      return;
    }
    // Save order to localStorage
    const order = {
      id: `ORD${Date.now()}`,
      therapistId: t.id,
      therapistName: t.name,
      therapistAvatar: t.avatar,
      service: serviceName,
      price,
      duration,
      date: date.toISOString().split("T")[0],
      time,
      address,
      status: "pending" as const,
      createdAt: new Date().toISOString(),
    };
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    orders.unshift(order);
    localStorage.setItem("orders", JSON.stringify(orders));
    setConfirmed(true);
  };

  if (confirmed) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-16 flex items-center justify-center min-h-[80vh]">
          <div className="text-center px-4">
            <div className="w-20 h-20 gradient-accent rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-3">预约成功</h1>
            <p className="text-muted-foreground mb-2">
              已预约 <span className="text-foreground font-medium">{t.name}</span> 的 <span className="text-foreground font-medium">{serviceName}</span>
            </p>
            <p className="text-muted-foreground mb-6">
              {date?.toLocaleDateString("zh-CN")} {time}
            </p>
            <div className="flex gap-3 justify-center">
              <Button variant="heroOutline" className="rounded-lg" onClick={() => router.push("/orders")}>
                查看订单
              </Button>
              <Button variant="hero" className="rounded-lg" onClick={() => router.push("/")}>
                返回首页
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16 pb-32">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" />
            返回
          </button>
        </div>

        <div className="max-w-2xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-foreground mb-6">预约服务</h1>

          {/* Service info */}
          <div className="gradient-card border border-border rounded-xl p-5 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 gradient-accent rounded-xl flex items-center justify-center text-lg font-bold text-primary-foreground">
                {t.avatar}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{t.name}</h3>
                <p className="text-sm text-muted-foreground">{serviceName} · {duration}</p>
              </div>
              <div className="text-right">
                <span className="text-secondary font-bold text-lg">¥{price}</span>
              </div>
            </div>
          </div>

          {/* Date picker */}
          <div className="gradient-card border border-border rounded-xl p-5 mb-6">
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-primary" />
              选择日期
            </h3>
            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(d) => d < new Date()}
                className="rounded-xl border border-border"
              />
            </div>
          </div>

          {/* Time slots */}
          <div className="gradient-card border border-border rounded-xl p-5 mb-6">
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              选择时间
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setTime(slot)}
                  className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                    time === slot
                      ? "gradient-accent text-primary-foreground"
                      : "bg-muted/50 text-muted-foreground hover:text-foreground border border-border"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Address input */}
          <div className="gradient-card border border-border rounded-xl p-5 mb-6">
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              服务地址
            </h3>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="请输入上门服务地址"
              className="w-full bg-muted/50 border border-border rounded-lg p-3 text-sm text-foreground placeholder:text-muted-foreground resize-none"
              rows={3}
            />
          </div>

          {/* Confirm button */}
          <Button
            variant="hero"
            size="lg"
            className="w-full rounded-xl mb-3"
            onClick={handleConfirm}
          >
            确认预约
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            点击确认后，技师将在15分钟内与您联系确认
          </p>
        </div>
      </main>
    </div>
  );
}
