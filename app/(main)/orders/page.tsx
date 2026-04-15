'use client';

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ArrowLeft, Clock, CheckCircle2, XCircle, MapPin, CreditCard, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import { toast } from "sonner";

interface Order {
  id: string;
  therapistId: string;
  therapistName: string;
  therapistAvatar: string;
  service: string;
  price: number;
  duration: string;
  date: string;
  time: string;
  address: string;
  status: "pending" | "accepted" | "paid" | "completed" | "cancelled";
  paid?: boolean;
  reviewed?: boolean;
  createdAt: string;
}

const statusConfig = {
  pending: { label: "待确认", icon: Clock, color: "text-primary" },
  accepted: { label: "已接单", icon: CheckCircle2, color: "text-blue-400" },
  paid: { label: "已支付", icon: CreditCard, color: "text-green-400" },
  completed: { label: "已完成", icon: CheckCircle2, color: "text-green-400" },
  cancelled: { label: "已取消", icon: XCircle, color: "text-muted-foreground" },
};

// Mock data for initial orders
const mockCustomerOrders: Order[] = [
  {
    id: "ORD001", therapistId: "1", therapistName: "林小雅", therapistAvatar: "林",
    service: "全身精油SPA", price: 388, duration: "90分钟",
    date: "2024-03-15", time: "15:00", address: "上海市静安区南京西路1688号",
    status: "pending", createdAt: "2024-03-14T10:00:00Z",
  },
  {
    id: "ORD002", therapistId: "2", therapistName: "陈美琪", therapistAvatar: "陈",
    service: "中式推拿", price: 358, duration: "60分钟",
    date: "2024-03-12", time: "14:00", address: "上海市浦东新区陆家嘴环路999号",
    status: "accepted", createdAt: "2024-03-11T08:00:00Z",
  },
  {
    id: "ORD003", therapistId: "3", therapistName: "王诗涵", therapistAvatar: "王",
    service: "泰式按摩", price: 428, duration: "120分钟",
    date: "2024-03-08", time: "10:00", address: "上海市徐汇区淮海中路1555号",
    status: "completed", paid: true, createdAt: "2024-03-07T12:00:00Z",
  },
  {
    id: "ORD004", therapistId: "4", therapistName: "李芸", therapistAvatar: "李",
    service: "足疗养生", price: 298, duration: "45分钟",
    date: "2024-03-01", time: "18:00", address: "上海市长宁区延安西路2299号",
    status: "completed", paid: true, reviewed: true, createdAt: "2024-02-28T09:00:00Z",
  },
];

const mockReceivedOrders: Order[] = [
  {
    id: "RCV001", therapistId: "self", therapistName: "王先生", therapistAvatar: "王",
    service: "全身精油SPA", price: 388, duration: "90分钟",
    date: "2024-03-10", time: "14:00", address: "上海市静安区南京西路1688号",
    status: "pending", createdAt: "2024-03-09T10:00:00Z",
  },
  {
    id: "RCV002", therapistId: "self", therapistName: "李女士", therapistAvatar: "李",
    service: "中式推拿", price: 358, duration: "60分钟",
    date: "2024-03-05", time: "16:00", address: "上海市浦东新区陆家嘴环路999号",
    status: "paid", paid: true, createdAt: "2024-03-04T08:00:00Z",
  },
  {
    id: "RCV003", therapistId: "self", therapistName: "赵先生", therapistAvatar: "赵",
    service: "泰式按摩", price: 428, duration: "120分钟",
    date: "2024-02-28", time: "10:00", address: "上海市徐汇区淮海中路1555号",
    status: "completed", paid: true, createdAt: "2024-02-27T12:00:00Z",
  },
];

export default function Orders() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [receivedOrders, setReceivedOrders] = useState<Order[]>(mockReceivedOrders);
  const [filter, setFilter] = useState<string>("all");
  const [role, setRole] = useState<"customer" | "therapist">("customer");

  useEffect(() => {
    const stored: Order[] = JSON.parse(localStorage.getItem("orders") || "[]");
    const existingIds = new Set(stored.map(o => o.id));
    const merged = [...stored, ...mockCustomerOrders.filter(o => !existingIds.has(o.id))];
    setOrders(merged);
  }, []);

  const currentOrders = role === "customer" ? orders : receivedOrders;
  const filtered = filter === "all" ? currentOrders : currentOrders.filter((o) => o.status === filter);

  const customerFilters = [
    { key: "all", label: "全部" },
    { key: "pending", label: "待确认" },
    { key: "accepted", label: "已接单" },
    { key: "paid", label: "已支付" },
    { key: "completed", label: "已完成" },
    { key: "cancelled", label: "已取消" },
  ];

  const therapistFilters = [
    { key: "all", label: "全部" },
    { key: "pending", label: "待接单" },
    { key: "paid", label: "已支付" },
    { key: "completed", label: "已完成" },
  ];

  const filters = role === "customer" ? customerFilters : therapistFilters;

  const handlePay = (orderId: string) => {
    setOrders(prev => {
      const updated = prev.map(o => o.id === orderId ? { ...o, status: "paid" as const, paid: true } : o);
      localStorage.setItem("orders", JSON.stringify(updated));
      return updated;
    });
    toast.success("支付成功");
  };

  const handleAccept = (orderId: string) => {
    setReceivedOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: "accepted" } : o));
    toast.success("已确认接单");
  };

  const handleComplete = (orderId: string) => {
    const updateFn = role === "customer" ? setOrders : setReceivedOrders;
    updateFn(prev => prev.map(o => o.id === orderId ? { ...o, status: "completed" } : o));
    toast.success(role === "customer" ? "订单已完成" : "服务已完成");
  };

  const handleReview = (orderId: string) => {
    setOrders(prev => {
      const updated = prev.map(o => o.id === orderId ? { ...o, reviewed: true } : o);
      localStorage.setItem("orders", JSON.stringify(updated));
      return updated;
    });
    toast.success("评价提交成功，感谢您的反馈！");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16 pb-24">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <button 
            onClick={() => router.back()} 
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            返回
          </button>
        </div>

        <div className="max-w-2xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-foreground mb-4">我的订单</h1>

          {/* Role switcher */}
          <div className="flex rounded-xl bg-muted/50 border border-border p-1 mb-4">
            <button 
              onClick={() => { setRole("customer"); setFilter("all"); }}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${role === "customer" ? "gradient-accent text-primary-foreground" : "text-muted-foreground"}`}
            >
              我的预约
            </button>
            <button 
              onClick={() => { setRole("therapist"); setFilter("all"); }}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${role === "therapist" ? "gradient-accent text-primary-foreground" : "text-muted-foreground"}`}
            >
              接单管理
            </button>
          </div>

          {/* Filters */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
            {filters.map((f) => (
              <button 
                key={f.key} 
                onClick={() => setFilter(f.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  filter === f.key ? "gradient-accent text-primary-foreground" : "bg-muted/50 text-muted-foreground hover:text-foreground border border-border"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Order list */}
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground mb-4">{role === "customer" ? "暂无订单" : "暂无接单记录"}</p>
              {role === "customer" && (
                <Button variant="hero" className="rounded-lg" onClick={() => router.push("/")}>去预约</Button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map((order) => {
                const sc = statusConfig[order.status];
                return (
                  <div key={order.id} className="gradient-card border border-border rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 gradient-accent rounded-xl flex items-center justify-center text-sm font-bold text-primary-foreground">
                          {order.therapistAvatar}
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground text-sm">
                            {role === "customer" ? order.therapistName : `客户: ${order.therapistName}`}
                          </h3>
                          <p className="text-xs text-muted-foreground">{order.service} · {order.duration}</p>
                        </div>
                      </div>
                      <div className={`flex items-center gap-1 ${sc.color}`}>
                        <sc.icon className="w-3.5 h-3.5" />
                        <span className="text-xs font-medium">{sc.label}</span>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="w-3.5 h-3.5" />
                        <span>{order.date} {order.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{order.address}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                      <span className="text-secondary font-bold">¥{order.price}</span>
                      <div className="flex gap-2 flex-wrap justify-end">
                        {/* Customer actions */}
                        {role === "customer" && order.status === "pending" && (
                          <Button 
                            variant="hero" 
                            size="sm" 
                            className="rounded-lg text-xs"
                            onClick={() => router.push(`/therapist/${order.therapistId}`)}
                          >
                            查看技师
                          </Button>
                        )}
                        {role === "customer" && order.status === "accepted" && !order.paid && (
                          <Button 
                            variant="hero" 
                            size="sm" 
                            className="rounded-lg text-xs"
                            onClick={() => handlePay(order.id)}
                          >
                            <CreditCard className="w-3 h-3 mr-1" />
                            去支付
                          </Button>
                        )}
                        {role === "customer" && order.status === "completed" && !order.reviewed && (
                          <Button 
                            variant="hero" 
                            size="sm" 
                            className="rounded-lg text-xs"
                            onClick={() => handleReview(order.id)}
                          >
                            评价技师
                          </Button>
                        )}
                        {role === "customer" && order.reviewed && (
                          <span className="text-xs text-muted-foreground">已评价</span>
                        )}

                        {/* Therapist actions */}
                        {role === "therapist" && order.status === "pending" && (
                          <Button 
                            variant="hero" 
                            size="sm" 
                            className="rounded-lg text-xs"
                            onClick={() => handleAccept(order.id)}
                          >
                            确认接单
                          </Button>
                        )}
                        {role === "therapist" && order.status === "paid" && (
                          <Button 
                            variant="hero" 
                            size="sm" 
                            className="rounded-lg text-xs"
                            onClick={() => handleComplete(order.id)}
                          >
                            完成服务
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
