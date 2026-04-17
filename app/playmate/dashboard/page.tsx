'use client';

import { useState } from 'react';
import { BarChart3, TrendingUp, Clock, CheckCircle, AlertCircle, Star, DollarSign, Users, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function PlaymateDashboardPage() {
  const [tabActive, setTabActive] = useState<'overview' | 'stats' | 'settings'>('overview');

  const stats = {
    totalOrders: 324,
    totalEarnings: 8520.50,
    thisMonth: 2180.75,
    rating: 4.8,
    completionRate: 98,
    responseTime: '2分钟',
  };

  const recentOrders = [
    {
      id: 1,
      client: '张小姐',
      service: '王者荣耀组队',
      amount: 280,
      status: '进行中',
      rating: 5,
    },
    {
      id: 2,
      client: '李先生',
      service: '游戏陪玩 (2小时)',
      amount: 320,
      status: '已完成',
      rating: 5,
    },
    {
      id: 3,
      client: '刘女士',
      service: '娱乐聊天',
      amount: 150,
      status: '进行中',
      rating: null,
    },
  ];

  const availabilityByDay = [
    { day: '周一', available: true, slots: 6 },
    { day: '周二', available: true, slots: 8 },
    { day: '周三', available: false, slots: 0 },
    { day: '周四', available: true, slots: 7 },
    { day: '周五', available: true, slots: 5 },
    { day: '周六', available: true, slots: 10 },
    { day: '周日', available: true, slots: 9 },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#E05299] to-[#FF6B9D] text-white pt-8 pb-6 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-6">
          <Link href="/" className="inline-block text-lg mb-6">
            ← 返回
          </Link>
          <h1 className="text-2xl font-bold">工作台</h1>
          <p className="text-sm text-white/80">管理您的订单和档期</p>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3 mt-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 text-center">
              <p className="text-2xl font-bold">{stats.totalOrders}</p>
              <p className="text-xs text-white/80 mt-1">总订单数</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 text-center">
              <p className="text-2xl font-bold">{stats.rating}</p>
              <p className="text-xs text-white/80 mt-1">服务评分</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 text-center">
              <p className="text-2xl font-bold">{stats.completionRate}%</p>
              <p className="text-xs text-white/80 mt-1">完成率</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-6 mt-6">
        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-200">
          <button
            onClick={() => setTabActive('overview')}
            className={`pb-3 font-bold text-sm transition-colors ${
              tabActive === 'overview'
                ? 'text-[#E05299] border-b-2 border-[#E05299]'
                : 'text-[#655E58]'
            }`}
          >
            概览
          </button>
          <button
            onClick={() => setTabActive('stats')}
            className={`pb-3 font-bold text-sm transition-colors ${
              tabActive === 'stats'
                ? 'text-[#E05299] border-b-2 border-[#E05299]'
                : 'text-[#655E58]'
            }`}
          >
            数据统计
          </button>
          <button
            onClick={() => setTabActive('settings')}
            className={`pb-3 font-bold text-sm transition-colors ${
              tabActive === 'settings'
                ? 'text-[#E05299] border-b-2 border-[#E05299]'
                : 'text-[#655E58]'
            }`}
          >
            档期管理
          </button>
        </div>

        {/* Overview Tab */}
        {tabActive === 'overview' && (
          <div className="space-y-4">
            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <Link href="/playmate/orders">
                <button className="w-full h-20 bg-white rounded-2xl border-2 border-[#E05299] text-center hover:shadows-lg transition-shadow">
                  <div className="text-[#E05299] text-xl mb-1">📋</div>
                  <p className="text-xs font-bold text-[#1C1A17]">待接订单</p>
                </button>
              </Link>
              <Link href="/playmate/schedule">
                <button className="w-full h-20 bg-white rounded-2xl border-2 border-gray-200 text-center hover:shadow-lg transition-shadow">
                  <div className="text-[#E05299] text-xl mb-1">📅</div>
                  <p className="text-xs font-bold text-[#1C1A17]">编辑档期</p>
                </button>
              </Link>
            </div>

            {/* Earnings This Month */}
            <div className="bg-white rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-[#1C1A17]">本月收入</h3>
                <TrendingUp className="text-[#E05299] w-5 h-5" />
              </div>
              <p className="text-3xl font-bold text-[#E05299] mb-2">¥ {stats.thisMonth.toFixed(2)}</p>
              <p className="text-xs text-[#655E58]">总累计收入: ¥ {stats.totalEarnings.toFixed(2)}</p>
              <div className="mt-4 h-24 bg-gradient-to-br from-[#E05299]/20 to-[#FF6B9D]/20 rounded-xl flex items-end justify-around px-4 py-4">
                {[65, 45, 70, 55, 80, 60].map((height, i) => (
                  <div
                    key={i}
                    className="w-2 bg-gradient-to-t from-[#E05299] to-[#FF6B9D] rounded-t-sm"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-2xl p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-[#1C1A17]">最近订单</h3>
                <Link href="/playmate/orders" className="text-xs text-[#E05299] font-bold">
                  查看全部 →
                </Link>
              </div>
              <div className="space-y-3">
                {recentOrders.map((order) => (
                  <div key={order.id} className="p-3 bg-[#f8f9fa] rounded-xl">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-sm font-bold text-[#1C1A17]">{order.client}</p>
                        <p className="text-xs text-[#655E58] mt-1">{order.service}</p>
                      </div>
                      <span className={`text-xs font-bold px-2 py-1 rounded-lg ${
                        order.status === '进行中'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-bold text-[#E05299]">¥ {order.amount}</p>
                      {order.rating && (
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs font-bold text-[#1C1A17]">{order.rating}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Stats Tab */}
        {tabActive === 'stats' && (
          <div className="space-y-4">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-[#E05299]" />
                  <p className="text-xs text-[#655E58]">平均响应时间</p>
                </div>
                <p className="text-2xl font-bold text-[#1C1A17]">{stats.responseTime}</p>
              </div>
              <div className="bg-white rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <p className="text-xs text-[#655E58]">完成率</p>
                </div>
                <p className="text-2xl font-bold text-[#1C1A17]">{stats.completionRate}%</p>
              </div>
            </div>

            {/* Service Distribution */}
            <div className="bg-white rounded-2xl p-4">
              <h3 className="font-bold text-[#1C1A17] mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-[#E05299]" />
                服务类型分布
              </h3>
              <div className="space-y-3">
                {[
                  { label: '游戏陪玩', percentage: 45 },
                  { label: '聊天陪伴', percentage: 30 },
                  { label: '娱乐活动', percentage: 15 },
                  { label: '其他服务', percentage: 10 },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-[#655E58]">{item.label}</span>
                      <span className="text-xs font-bold text-[#E05299]">{item.percentage}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#E05299] to-[#FF6B9D]"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Monthly Trends */}
            <div className="bg-white rounded-2xl p-4">
              <h3 className="font-bold text-[#1C1A17] mb-4">近3个月订单趋势</h3>
              <div className="flex items-end justify-around h-32 px-2">
                {[
                  { month: '11月', count: 45 },
                  { month: '12月', count: 68 },
                  { month: '1月', count: 92 },
                ].map((item) => (
                  <div key={item.month} className="flex flex-col items-center gap-2">
                    <div
                      className="w-8 bg-gradient-to-t from-[#E05299] to-[#FF6B9D] rounded-t-lg"
                      style={{ height: `${(item.count / 100) * 120}px` }}
                    />
                    <span className="text-xs font-bold text-[#655E58]">{item.month}</span>
                    <span className="text-xs text-[#655E58]">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab (Schedule Management) */}
        {tabActive === 'settings' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-4">
              <h3 className="font-bold text-[#1C1A17] mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#E05299]" />
                本周档期
              </h3>
              <div className="space-y-2">
                {availabilityByDay.map((day) => (
                  <div key={day.day} className="flex items-center justify-between p-3 bg-[#f8f9fa] rounded-xl">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-[#1C1A17] w-12">{day.day}</span>
                      <span className={`text-xs font-medium px-2 py-1 rounded-lg ${
                        day.available
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {day.available ? '✓ 开放' : '关闭'}
                      </span>
                    </div>
                    {day.available && <span className="text-xs text-[#E05299] font-bold">{day.slots} 个档位</span>}
                  </div>
                ))}
              </div>
            </div>

            <Link href="/playmate/schedule">
              <button className="w-full h-12 bg-[#E05299] text-white rounded-2xl font-bold hover:shadow-lg transition-shadow">
                详细编辑档期 →
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
