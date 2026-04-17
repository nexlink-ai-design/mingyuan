'use client';

import { useState } from 'react';
import { Clock, MapPin, MessageCircle, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function PlaymateOrdersPage() {
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'accepted' | 'completed'>('pending');

  const orders = [
    {
      id: 1,
      client: '王欣怡',
      service: '王者荣耀组队 (排位赛)',
      time: '今天 19:00 - 21:00',
      location: '在线',
      amount: 280,
      rating: 5,
      status: 'pending',
      avatar: '👩',
      clientInfo: '钻石段位，需要冲星',
      priority: 'high',
    },
    {
      id: 2,
      client: '李明',
      service: '英雄联盟双排',
      time: '今天 20:30 - 23:00',
      location: '在线',
      amount: 320,
      status: 'pending',
      avatar: '👨',
      clientInfo: '白金段位，新手上路',
      priority: 'normal',
    },
    {
      id: 3,
      client: '张思',
      service: '剑网3副本陪玩',
      time: '明天 18:00 - 20:00',
      location: '在线',
      amount: 200,
      status: 'pending',
      avatar: '👩',
      clientInfo: '需要指导新副本',
      priority: 'normal',
    },
    {
      id: 4,
      client: '陈叶',
      service: '娱乐聊天陪伴',
      time: '2小时后',
      location: '电话/视频',
      amount: 150,
      status: 'pending',
      avatar: '👨',
      clientInfo: '只是想找人聊天',
      priority: 'low',
    },
    {
      id: 5,
      client: '刘艺',
      service: '王者荣耀组队',
      time: '已完成',
      location: '在线',
      amount: 280,
      rating: 5,
      status: 'completed',
      avatar: '👩',
      clientInfo: '很满意，已支付',
    },
  ];

  const filteredOrders = orders.filter(order => {
    if (filterStatus === 'all') return true;
    return order.status === filterStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border border-yellow-300';
      case 'accepted':
        return 'bg-blue-100 text-blue-700 border border-blue-300';
      case 'completed':
        return 'bg-green-100 text-green-700 border border-green-300';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return '待接单';
      case 'accepted':
        return '进行中';
      case 'completed':
        return '已完成';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#E05299] to-[#FF6B9D] text-white pt-8 pb-6 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-6">
          <Link href="/playmate/dashboard" className="inline-block text-lg mb-6">
            ← 返回
          </Link>
          <h1 className="text-2xl font-bold">订单管理</h1>
          <p className="text-sm text-white/80">查看并接受新的订单请求</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-6 mt-6">
        {/* Filter Buttons */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { id: 'pending', label: '待接单', count: orders.filter(o => o.status === 'pending').length },
            { id: 'accepted', label: '进行中', count: orders.filter(o => o.status === 'accepted').length },
            { id: 'completed', label: '已完成', count: orders.filter(o => o.status === 'completed').length },
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => setFilterStatus(filter.id as any)}
              className={`px-4 py-2 rounded-2xl font-bold text-sm whitespace-nowrap transition-all ${
                filterStatus === filter.id
                  ? 'bg-[#E05299] text-white'
                  : 'bg-white text-[#655E58] border border-gray-200'
              }`}
            >
              {filter.label}
              {filter.count > 0 && (
                <span className={`ml-2 ${
                  filterStatus === filter.id ? 'text-white' : 'text-[#E05299]'
                }`}>
                  ({filter.count})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="space-y-3">
          {filteredOrders.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center">
              <p className="text-lg text-[#655E58] font-medium mb-2">暂无订单</p>
              <p className="text-sm text-[#655E58]">保持在线以接收新的订单请求</p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl p-4 hover:shadow-lg transition-shadow">
                {/* Priority Badge */}
                {order.status === 'pending' && (
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-bold px-2 py-1 rounded-lg ${
                      order.priority === 'high'
                        ? 'bg-red-100 text-red-700'
                        : order.priority === 'normal'
                        ? 'bg-orange-100 text-orange-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {order.priority === 'high' ? '🔥 优先' : ''}
                      {order.priority === 'normal' ? '⭐ 普通' : ''}
                      {order.priority === 'low' ? '💤 低优' : ''}
                    </span>
                    <span className={`text-xs font-bold px-2 py-1 rounded-lg ${getStatusColor(order.status)}`}>
                      {getStatusLabel(order.status)}
                    </span>
                  </div>
                )}

                {/* Order Header */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="text-3xl">{order.avatar}</div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-[#1C1A17]">{order.client}</p>
                    <p className="text-xs text-[#655E58] mt-1">{order.clientInfo}</p>
                  </div>
                  <p className="text-lg font-bold text-[#E05299]">¥ {order.amount}</p>
                </div>

                {/* Order Details */}
                <div className="space-y-2 mb-3 pl-12">
                  <div className="flex items-center gap-2 text-xs text-[#655E58]">
                    <MessageCircle className="w-3 h-3" />
                    <span className="font-medium">{order.service}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#655E58]">
                    <Clock className="w-3 h-3" />
                    <span>{order.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#655E58]">
                    <MapPin className="w-3 h-3" />
                    <span>{order.location}</span>
                  </div>
                </div>

                {/* Rating */}
                {order.rating && (
                  <div className="flex items-center gap-1 mb-3 pl-12">
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
                    <span className="text-xs text-[#655E58] ml-1">
                      {order.rating}/5.0
                    </span>
                  </div>
                )}

                {/* Action Buttons */}
                {order.status === 'pending' && (
                  <div className="flex gap-2 mt-4">
                    <button className="flex-1 h-10 border border-gray-300 rounded-xl font-bold text-sm text-gray-900 hover:bg-gray-50 transition-colors flex items-center justify-center gap-1">
                      <XCircle className="w-4 h-4" />
                      拒绝
                    </button>
                    <button className="flex-1 h-10 bg-[#E05299] text-white rounded-xl font-bold text-sm hover:shadow-lg transition-shadow flex items-center justify-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      接单
                    </button>
                  </div>
                )}

                {order.status === 'accepted' && (
                  <div className="flex gap-2 mt-4">
                    <button className="flex-1 h-10 bg-blue-500 text-white rounded-xl font-bold text-sm hover:shadow-lg transition-shadow">
                      查看聊天
                    </button>
                    <button className="flex-1 h-10 border border-gray-300 rounded-xl font-bold text-sm text-gray-900 hover:bg-gray-50 transition-colors">
                      标记完成
                    </button>
                  </div>
                )}

                {order.status === 'completed' && (
                  <div className="flex gap-2 mt-4">
                    <button className="flex-1 h-10 bg-green-100 text-green-700 rounded-xl font-bold text-sm py-2 border border-green-200">
                      ✓ 已完成
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Tips */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mt-6 flex gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-blue-900 mb-1">💡 小贴士</p>
            <p className="text-xs text-blue-800">及时回应订单请求可以提升您的接单率和用户评分。建议设置在线状态以获得更多订单机会。</p>
          </div>
        </div>
      </div>
    </div>
  );
}
