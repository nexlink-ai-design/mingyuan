'use client';

import { useState } from 'react';
import { ChevronRight, Clock, CheckCircle, AlertCircle, MapPin, Calendar, Star } from 'lucide-react';
import Link from 'next/link';
import GlobalBottomNav from '@/components/GlobalBottomNav';

export default function OrdersPage() {
  const [tabActive, setTabActive] = useState<'ongoing' | 'completed' | 'cancelled'>('ongoing');

  const orders = {
    ongoing: [
      {
        id: 1,
        companionName: '王欣怡',
        companionImage: '👑',
        service: '王者荣耀组队',
        date: '今天 19:00-21:00',
        location: '在线',
        price: 280,
        status: 'confirmed',
        rating: null,
      },
      {
        id: 2,
        companionName: '李明',
        companionImage: '👨',
        service: '英雄联盟双排',
        date: '明天 20:30-23:00',
        location: '在线',
        price: 320,
        status: 'pending',
        rating: null,
      },
      {
        id: 3,
        companionName: '陈叶',
        companionImage: '💼',
        service: '娱乐聊天陪伴',
        date: '周五 18:00-20:00',
        location: '电话/视频',
        price: 150,
        status: 'confirmed',
        rating: null,
      },
    ],
    completed: [
      {
        id: 101,
        companionName: '刘艺',
        companionImage: '✨',
        service: '王者荣耀组队',
        date: '2024-01-10 19:00-21:00',
        location: '在线',
        price: 280,
        status: 'completed',
        rating: 5,
      },
      {
        id: 102,
        companionName: '张媛',
        companionImage: '🌟',
        service: '聊天陪伴',
        date: '2024-01-08 20:00-21:30',
        location: '在线',
        price: 120,
        status: 'completed',
        rating: 4,
      },
      {
        id: 103,
        companionName: '苏菲',
        companionImage: '💎',
        service: '夜总会伴游',
        date: '2024-01-05 22:00-00:00',
        location: '黄浦区',
        price: 1200,
        status: 'completed',
        rating: 5,
      },
    ],
    cancelled: [
      {
        id: 201,
        companionName: '王小美',
        companionImage: '🎀',
        service: '游戏陪玩',
        date: '2024-01-03 19:00-20:00',
        location: '在线',
        price: 88,
        status: 'cancelled',
        rating: null,
        cancelReason: '用户取消',
      },
    ],
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'confirmed':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return '待确认';
      case 'confirmed':
        return '已确认';
      case 'completed':
        return '已完成';
      case 'cancelled':
        return '已取消';
      default:
        return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'confirmed':
        return <CheckCircle className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'cancelled':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const currentOrders = orders[tabActive as keyof typeof orders];

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#E05299] to-[#FF6B9D] text-white pt-8 pb-6 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-6">
          <Link href="/" className="inline-block text-lg mb-6">
            ← 返回
          </Link>
          <h1 className="text-2xl font-bold">我的订单</h1>
          <p className="text-sm text-white/80">查看和管理您的所有订单</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-6 mt-6">
        {/* Tab Buttons */}
        <div className="flex gap-4 mb-6 border-b border-gray-200">
          <button
            onClick={() => setTabActive('ongoing')}
            className={`pb-3 font-bold text-sm transition-colors ${
              tabActive === 'ongoing'
                ? 'text-[#E05299] border-b-2 border-[#E05299]'
                : 'text-[#655E58]'
            }`}
          >
            进行中
            {orders.ongoing.length > 0 && (
              <span className="ml-2 text-xs bg-[#E05299] text-white rounded-full px-2 py-0.5">
                {orders.ongoing.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setTabActive('completed')}
            className={`pb-3 font-bold text-sm transition-colors ${
              tabActive === 'completed'
                ? 'text-[#E05299] border-b-2 border-[#E05299]'
                : 'text-[#655E58]'
            }`}
          >
            已完成
          </button>
          <button
            onClick={() => setTabActive('cancelled')}
            className={`pb-3 font-bold text-sm transition-colors ${
              tabActive === 'cancelled'
                ? 'text-[#E05299] border-b-2 border-[#E05299]'
                : 'text-[#655E58]'
            }`}
          >
            已取消
          </button>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {currentOrders.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center">
              <p className="text-lg text-[#655E58] font-medium mb-2">暂无订单</p>
              <p className="text-sm text-[#655E58] mb-4">
                {tabActive === 'ongoing' && '您还没有进行中的订单'}
                {tabActive === 'completed' && '您还没有已完成的订单'}
                {tabActive === 'cancelled' && '您还没有已取消的订单'}
              </p>
              {tabActive === 'ongoing' && (
                <Link href="/search">
                  <button className="px-4 py-2 bg-[#E05299] text-white rounded-full text-sm font-bold hover:shadow-lg transition-shadow">
                    去预约陪玩 →
                  </button>
                </Link>
              )}
            </div>
          ) : (
            currentOrders.map((order) => (
              <Link key={order.id} href={`/order/${order.id}`}>
                <div className="bg-white rounded-2xl p-4 hover:shadow-md transition-shadow cursor-pointer border border-gray-100">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{order.companionImage}</div>
                      <div>
                        <p className="text-sm font-bold text-[#1C1A17]">{order.companionName}</p>
                        <p className="text-xs text-[#655E58] mt-0.5">{order.service}</p>
                      </div>
                    </div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getStatusColor(order.status)} flex items-center gap-1`}>
                      {getStatusIcon(order.status)}
                      {getStatusLabel(order.status)}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 mb-3 ml-12">
                    <div className="flex items-center gap-2 text-xs text-[#655E58]">
                      <Calendar className="w-3 h-3" />
                      <span>{order.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#655E58]">
                      <MapPin className="w-3 h-3" />
                      <span>{order.location}</span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between ml-12 pt-3 border-t border-gray-100">
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm font-bold text-[#E05299]">¥</span>
                      <span className="text-lg font-bold text-[#E05299]">{order.price}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {order.rating && (
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-xs ${
                                i < order.rating ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      )}

                      {order.status === 'pending' && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                          }}
                          className="px-3 py-1 bg-[#E05299] text-white rounded-lg text-xs font-bold hover:shadow-lg transition-shadow"
                        >
                          确认
                        </button>
                      )}

                      {order.status === 'confirmed' && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                          }}
                          className="px-3 py-1 bg-blue-500 text-white rounded-lg text-xs font-bold hover:shadow-lg transition-shadow"
                        >
                          继续
                        </button>
                      )}

                      {order.status !== 'pending' && order.status !== 'confirmed' && (
                        <ChevronRight className="w-4 h-4 text-[#655E58]" />
                      )}
                    </div>
                  </div>

                  {order.cancelReason && (
                    <div className="mt-3 pt-3 border-t border-gray-100 ml-12">
                      <p className="text-xs text-red-600">
                        取消原因: {order.cancelReason}
                      </p>
                    </div>
                  )}
                </div>
              </Link>
            ))
          )}
        </div>

        {/* Info Box */}
        {tabActive === 'ongoing' && currentOrders.length > 0 && (
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-2xl p-4 flex gap-3">
            <span className="text-lg shrink-0">ℹ️</span>
            <div>
              <p className="text-xs font-bold text-blue-900 mb-1">订单提示</p>
              <p className="text-xs text-blue-800">
                请在约定时间之前充足准备。如需取消，请至少提前 2 小时通知对方。
              </p>
            </div>
          </div>
        )}

        {/* Completed Orders Summary */}
        {tabActive === 'completed' && currentOrders.length > 0 && (
          <div className="mt-6 bg-white rounded-2xl p-4">
            <p className="text-sm font-bold text-[#1C1A17] mb-3">您的成就</p>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center">
                <p className="text-2xl font-bold text-[#E05299]">{currentOrders.length}</p>
                <p className="text-xs text-[#655E58] mt-1">已完成订单</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-500">
                  {(
                    currentOrders.reduce((sum, order) => sum + (order.rating || 0), 0) /
                    currentOrders.filter((o) => o.rating).length
                  ).toFixed(1)}
                </p>
                <p className="text-xs text-[#655E58] mt-1">平均评分</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  ¥{currentOrders.reduce((sum, order) => sum + order.price, 0)}
                </p>
                <p className="text-xs text-[#655E58] mt-1">总消费</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <GlobalBottomNav />
    </div>
  );
}
