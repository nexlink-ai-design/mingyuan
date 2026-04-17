'use client';

import { useState } from 'react';
import { Users, TrendingUp, DollarSign, Award, Plus, ChevronRight, BarChart3, Target } from 'lucide-react';
import Link from 'next/link';

export default function AgentDashboardPage() {
  const [tabActive, setTabActive] = useState<'overview' | 'members' | 'performance'>('overview');

  const agentStats = {
    teamMembers: 12,
    totalPerformance: 45200.00,
    thisMonthRevenue: 12450.75,
    averageRating: 4.7,
    contractCount: 205,
    conversionRate: 68,
  };

  const teamMembers = [
    {
      id: 1,
      name: '王欣怡',
      role: '名媛陪玩',
      status: '在线',
      performance: 4800,
      rating: 4.9,
      revenue: 8500.00,
      image: '👑',
      joinDate: '2023-10-15',
    },
    {
      id: 2,
      name: '李思菲',
      role: '名媛陪玩',
      status: '在线',
      performance: 3600,
      rating: 4.8,
      revenue: 6200.00,
      image: '💎',
      joinDate: '2023-11-20',
    },
    {
      id: 3,
      name: '陈欣',
      role: '宝藏陪玩',
      status: '离线',
      performance: 2800,
      rating: 4.6,
      revenue: 4800.00,
      image: '✨',
      joinDate: '2023-12-01',
    },
    {
      id: 4,
      name: '张媛',
      role: '名媛陪玩',
      status: '在线',
      performance: 3200,
      rating: 4.7,
      revenue: 5500.00,
      image: '🌟',
      joinDate: '2024-01-05',
    },
  ];

  const performanceData = [
    { name: '王欣怡', thisMonth: 3500, lastMonth: 2800, trend: '↑ 25%' },
    { name: '李思菲', thisMonth: 2800, lastMonth: 2200, trend: '↑ 27%' },
    { name: '陈欣', thisMonth: 2150, lastMonth: 1800, trend: '↑ 19%' },
    { name: '张媛', thisMonth: 2500, lastMonth: 2100, trend: '↑ 19%' },
    { name: '刘艺', thisMonth: 1500, lastMonth: 1200, trend: '↑ 25%' },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#E05299] to-[#FF6B9D] text-white pt-8 pb-6 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-6">
          <Link href="/" className="inline-block text-lg mb-6">
            ← 返回
          </Link>
          <h1 className="text-2xl font-bold">经纪后台</h1>
          <p className="text-sm text-white/80">管理您的团队成员和业绩</p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3 mt-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 text-center">
              <p className="text-2xl font-bold">{agentStats.teamMembers}</p>
              <p className="text-xs text-white/80 mt-1">团队成员</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 text-center">
              <p className="text-2xl font-bold">¥ {(agentStats.thisMonthRevenue / 1000).toFixed(1)}K</p>
              <p className="text-xs text-white/80 mt-1">本月收益</p>
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
            onClick={() => setTabActive('members')}
            className={`pb-3 font-bold text-sm transition-colors ${
              tabActive === 'members'
                ? 'text-[#E05299] border-b-2 border-[#E05299]'
                : 'text-[#655E58]'
            }`}
          >
            团队成员
          </button>
          <button
            onClick={() => setTabActive('performance')}
            className={`pb-3 font-bold text-sm transition-colors ${
              tabActive === 'performance'
                ? 'text-[#E05299] border-b-2 border-[#E05299]'
                : 'text-[#655E58]'
            }`}
          >
            业绩统计
          </button>
        </div>

        {/* Overview Tab */}
        {tabActive === 'overview' && (
          <div className="space-y-4">
            {/* Revenue Card */}
            <div className="bg-white rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-[#1C1A17]">本月团队收益</h3>
                <DollarSign className="text-[#E05299] w-5 h-5" />
              </div>
              <p className="text-3xl font-bold text-[#E05299] mb-2">¥ {agentStats.thisMonthRevenue.toFixed(2)}</p>
              <p className="text-xs text-[#655E58]">团队总业绩: ¥ {agentStats.totalPerformance.toFixed(2)}</p>
              <div className="mt-4 h-24 bg-gradient-to-br from-[#E05299]/20 to-[#FF6B9D]/20 rounded-xl flex items-end justify-around px-4 py-4">
                {[45, 60, 55, 75, 68, 82].map((height, i) => (
                  <div
                    key={i}
                    className="w-2 bg-gradient-to-t from-[#E05299] to-[#FF6B9D] rounded-t-sm"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-[#E05299]" />
                  <p className="text-xs text-[#655E58]">合同数</p>
                </div>
                <p className="text-2xl font-bold text-[#1C1A17]">{agentStats.contractCount}</p>
                <p className="text-xs text-green-600 mt-1">↑ 23 本月新增</p>
              </div>
              <div className="bg-white rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <p className="text-xs text-[#655E58]">转化率</p>
                </div>
                <p className="text-2xl font-bold text-[#1C1A17]">{agentStats.conversionRate}%</p>
                <p className="text-xs text-green-600 mt-1">↑ 5% 环比增长</p>
              </div>
            </div>

            {/* Team Performance Rank */}
            <div className="bg-white rounded-2xl p-4">
              <h3 className="font-bold text-[#1C1A17] mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-[#E05299]" />
                成员排名 TOP 3
              </h3>
              <div className="space-y-3">
                {teamMembers.slice(0, 3).map((member, index) => (
                  <div key={member.id} className="flex items-center justify-between p-3 bg-[#f8f9fa] rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#E05299] text-white rounded-lg flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#1C1A17]">{member.name}</p>
                        <p className="text-xs text-[#655E58]">{member.role}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-[#E05299]">¥ {(member.revenue / 1000).toFixed(1)}K</p>
                      <p className="text-xs text-yellow-500 flex items-center gap-0.5">⭐ {member.rating}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button className="h-20 bg-white rounded-2xl border-2 border-[#E05299] text-center hover:shadow-lg transition-shadow">
                <div className="text-[#E05299] text-2xl mb-1">➕</div>
                <p className="text-xs font-bold text-[#1C1A17]">招聘成员</p>
              </button>
              <button className="h-20 bg-white rounded-2xl border-2 border-gray-200 text-center hover:shadow-lg transition-shadow">
                <div className="text-[#655E58] text-2xl mb-1">📊</div>
                <p className="text-xs font-bold text-[#1C1A17]">详细报表</p>
              </button>
            </div>
          </div>
        )}

        {/* Members Tab */}
        {tabActive === 'members' && (
          <div className="space-y-3">
            <div className="flex gap-2 mb-4">
              <button className="flex-1 h-10 bg-[#E05299] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:shadow-lg transition-shadow">
                <Plus className="w-4 h-4" />
                添加成员
              </button>
            </div>

            {teamMembers.map((member) => (
              <div key={member.id} className="bg-white rounded-2xl p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{member.image}</div>
                    <div>
                      <p className="text-sm font-bold text-[#1C1A17]">{member.name}</p>
                      <p className="text-xs text-[#655E58]">{member.role}</p>
                      <p className={`text-xs font-medium mt-1 ${
                        member.status === '在线' ? 'text-green-600' : 'text-gray-500'
                      }`}>
                        {member.status === '在线' ? '🟢' : '⚫'} {member.status}
                      </p>
                    </div>
                  </div>
                  <p className="text-lg font-bold text-[#E05299]">¥ {(member.revenue / 1000).toFixed(1)}K</p>
                </div>

                {/* Performance Bars */}
                <div className="space-y-2 mb-3 pl-12">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-[#655E58]">评分</span>
                      <span className="text-xs font-bold text-yellow-500">⭐ {member.rating}/5.0</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400"
                        style={{ width: `${(member.rating / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                <button className="w-full h-9 border border-gray-300 rounded-lg font-bold text-sm text-gray-900 hover:bg-gray-50 transition-colors flex items-center justify-center gap-1">
                  管理成员
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Performance Tab */}
        {tabActive === 'performance' && (
          <div className="space-y-4">
            {/* Chart */}
            <div className="bg-white rounded-2xl p-4">
              <h3 className="font-bold text-[#1C1A17] mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-[#E05299]" />
                成员本月 vs 上月对比
              </h3>
              <div className="space-y-4">
                {performanceData.map((data) => (
                  <div key={data.name}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-[#1C1A17]">{data.name}</span>
                      <span className={`text-xs font-bold ${
                        data.trend.includes('↑') ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {data.trend}
                      </span>
                    </div>
                    <div className="flex gap-1 h-8">
                      <div className="flex-1 bg-blue-400 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                        {data.thisMonth}
                      </div>
                      <div className="flex-1 bg-blue-200 rounded-lg flex items-center justify-center text-gray-700 text-xs font-bold">
                        {data.lastMonth}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="bg-green-50 rounded-2xl p-4 border border-green-200">
              <p className="text-sm font-bold text-green-900 mb-2">📈 本月亮点</p>
              <ul className="text-sm text-green-800 space-y-1">
                <li>✓ 总业绩相比上月增长 23%</li>
                <li>✓ 成员平均转化率达到 68%</li>
                <li>✓ 新增合同数 23 份</li>
              </ul>
            </div>

            {/* Detailed Table */}
            <div className="bg-white rounded-2xl p-4">
              <h3 className="font-bold text-[#1C1A17] mb-4">详细数据</h3>
              <div className="space-y-3">
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-3 bg-[#f8f9fa] rounded-xl">
                    <div>
                      <p className="text-xs font-bold text-[#1C1A17]">{member.name}</p>
                      <p className="text-xs text-[#655E58] mt-1">
                        入职: {new Date(member.joinDate).toLocaleDateString('zh-CN')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-[#E05299]">¥ {member.revenue.toFixed(0)}</p>
                      <p className="text-xs text-[#655E58]">{member.performance} 单</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
