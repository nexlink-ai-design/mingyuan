'use client';

import { useState } from 'react';
import { AlertTriangle, FileText, Upload, MessageSquare, CheckCircle, Clock, XCircle } from 'lucide-react';
import Link from 'next/link';

export default function ComplaintPage() {
  const [tabActive, setTabActive] = useState<'create' | 'history'>('history');
  const [complaintType, setComplaintType] = useState('service_issue');
  const [description, setDescription] = useState('');

  const complaintTypes = [
    { id: 'service_issue', label: '服务质量问题', icon: '⚠️' },
    { id: 'no_show', label: '用户未出现', icon: '🚫' },
    { id: 'refund', label: '申请退款', icon: '💰' },
    { id: 'behavior', label: '不当行为投诉', icon: '😤' },
    { id: 'technical', label: '技术故障', icon: '🔧' },
    { id: 'other', label: '其他问题', icon: '❓' },
  ];

  const complaintHistory = [
    {
      id: 1,
      type: '服务质量问题',
      orderId: 'ORD-2024-001',
      client: '王欣怡',
      amount: 280,
      status: 'resolved',
      date: '2024-01-12',
      resolution: '已协议处理，用户满意',
      icon: '✓',
    },
    {
      id: 2,
      type: '申请退款',
      orderId: 'ORD-2024-002',
      client: '李明',
      amount: 150,
      status: 'processing',
      date: '2024-01-14',
      resolution: '评估中...',
      icon: '⏳',
    },
    {
      id: 3,
      type: '不当行为投诉',
      orderId: 'ORD-2024-003',
      client: '陈叶',
      amount: 320,
      status: 'rejected',
      date: '2024-01-10',
      resolution: '申诉成功，恢复完全费用',
      icon: '✗',
    },
    {
      id: 4,
      type: '技术故障',
      orderId: 'ORD-2023-150',
      client: '刘艺',
      amount: 200,
      status: 'resolved',
      date: '2024-01-08',
      resolution: '系统补偿，已发放补偿金',
      icon: '✓',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'bg-green-100 text-green-700';
      case 'processing':
        return 'bg-blue-100 text-blue-700';
      case 'rejected':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'resolved':
        return '已解决';
      case 'processing':
        return '处理中';
      case 'rejected':
        return '已驳回';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-red-500 to-red-600 text-white pt-8 pb-6 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-6">
          <Link href="/" className="inline-block text-lg mb-6">
            ← 返回
          </Link>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <AlertTriangle className="w-6 h-6" />
            投诉与退款
          </h1>
          <p className="text-sm text-white/80">提交及查看投诉记录</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-6 mt-6">
        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-200">
          <button
            onClick={() => setTabActive('history')}
            className={`pb-3 font-bold text-sm transition-colors ${
              tabActive === 'history'
                ? 'text-red-600 border-b-2 border-red-600'
                : 'text-[#655E58]'
            }`}
          >
            投诉记录
          </button>
          <button
            onClick={() => setTabActive('create')}
            className={`pb-3 font-bold text-sm transition-colors ${
              tabActive === 'create'
                ? 'text-red-600 border-b-2 border-red-600'
                : 'text-[#655E58]'
            }`}
          >
            新建投诉
          </button>
        </div>

        {/* History Tab */}
        {tabActive === 'history' && (
          <div className="space-y-4">
            {/* Statistics */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white rounded-2xl p-4 text-center">
                <p className="text-2xl font-bold text-[#1C1A17]">
                  {complaintHistory.length}
                </p>
                <p className="text-xs text-[#655E58] mt-1">总投诉数</p>
              </div>
              <div className="bg-white rounded-2xl p-4 text-center">
                <p className="text-2xl font-bold text-green-600">
                  {complaintHistory.filter(c => c.status === 'resolved').length}
                </p>
                <p className="text-xs text-[#655E58] mt-1">已解决</p>
              </div>
              <div className="bg-white rounded-2xl p-4 text-center">
                <p className="text-2xl font-bold text-blue-600">
                  {complaintHistory.filter(c => c.status === 'processing').length}
                </p>
                <p className="text-xs text-[#655E58] mt-1">处理中</p>
              </div>
            </div>

            {/* Complaints List */}
            <div className="space-y-3">
              {complaintHistory.map((complaint) => (
                <div key={complaint.id} className="bg-white rounded-2xl p-4 hover:shadow-md transition-shadow">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-sm font-bold text-[#1C1A17]">{complaint.type}</p>
                      <p className="text-xs text-[#655E58] mt-1">订单: {complaint.orderId}</p>
                    </div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-lg ${getStatusColor(complaint.status)}`}>
                      {getStatusLabel(complaint.status)}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 mb-3 pl-4 border-l-2 border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#655E58]">投诉对象:</span>
                      <span className="text-xs font-bold text-[#1C1A17]">{complaint.client}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#655E58]">涉及金额:</span>
                      <span className="text-xs font-bold text-red-600">¥ {complaint.amount}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#655E58]">投诉日期:</span>
                      <span className="text-xs text-[#655E58]">{complaint.date}</span>
                    </div>
                  </div>

                  {/* Resolution */}
                  <div className="bg-[#f8f9fa] rounded-xl p-3 mb-3">
                    <p className="text-xs text-[#655E58] mb-1">处理结果</p>
                    <p className="text-sm text-[#1C1A17]">{complaint.resolution}</p>
                  </div>

                  {/* Action Button */}
                  <button className="w-full h-9 border border-gray-200 rounded-lg text-sm font-bold text-[#655E58] hover:border-red-600 hover:text-red-600 transition-colors">
                    查看详情
                  </button>
                </div>
              ))}
            </div>

            {/* Load More */}
            <button className="w-full h-12 border-2 border-gray-200 text-[#655E58] rounded-2xl font-bold hover:border-red-600 hover:text-red-600 transition-colors">
              加载更多
            </button>
          </div>
        )}

        {/* Create Complaint Tab */}
        {tabActive === 'create' && (
          <div className="space-y-4">
            {/* Info Box */}
            <div className="bg-yellow-50 rounded-2xl p-4 border border-yellow-200 flex gap-3">
              <span className="text-xl shrink-0">📋</span>
              <div>
                <p className="text-xs font-bold text-yellow-900 mb-1">投诉须知</p>
                <p className="text-xs text-yellow-800">投诉需要真实有效、事实明确。虚假投诉将承担法律责任。</p>
              </div>
            </div>

            {/* Select Order */}
            <div>
              <label className="block text-sm font-bold text-[#1C1A17] mb-2">选择相关订单</label>
              <select className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm focus:border-red-600 focus:outline-none">
                <option>ORD-2024-001 - 王欣怡</option>
                <option>ORD-2024-002 - 李明</option>
                <option>ORD-2024-003 - 陈叶</option>
                <option>ORD-2024-004 - 刘艺</option>
              </select>
            </div>

            {/* Complaint Type */}
            <div>
              <label className="block text-sm font-bold text-[#1C1A17] mb-3">投诉类型</label>
              <div className="grid grid-cols-2 gap-2">
                {complaintTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setComplaintType(type.id)}
                    className={`p-3 rounded-xl border-2 text-sm font-bold text-center transition-all ${
                      complaintType === type.id
                        ? 'bg-red-100 border-red-600 text-red-700'
                        : 'bg-white border-gray-200 text-[#1C1A17]'
                    }`}
                  >
                    <span className="text-lg">{type.icon}</span>
                    <p className="mt-1">{type.label}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-bold text-[#1C1A17] mb-2">详细描述</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="请详细描述您遇到的问题... (至少50字)"
                rows={6}
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:border-red-600 focus:outline-none text-sm resize-none"
              />
              <p className="text-xs text-[#655E58] mt-2">
                {description.length}/1000 字
              </p>
            </div>

            {/* Evidence Upload */}
            <div>
              <label className="block text-sm font-bold text-[#1C1A17] mb-2">上传证据(截图、录音等)</label>
              <button className="w-full px-4 py-6 border-2 border-dashed border-gray-300 rounded-2xl hover:border-red-600 transition-colors flex flex-col items-center justify-center">
                <Upload className="w-6 h-6 text-gray-400 mb-2" />
                <span className="text-sm text-gray-600">点击选择文件</span>
                <span className="text-xs text-gray-500 mt-1">支持图片、视频、音频</span>
              </button>
            </div>

            {/* Refund Amount */}
            <div>
              <label className="block text-sm font-bold text-[#1C1A17] mb-2">申请退款金额</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="0.00"
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-2xl focus:border-red-600 focus:outline-none text-sm"
                />
                <span className="text-lg font-bold text-[#1C1A17]">元</span>
              </div>
              <p className="text-xs text-[#655E58] mt-2">最大可申请退款: ¥ 280.00</p>
            </div>

            {/* Terms Acceptance */}
            <div className="flex items-start gap-3 bg-red-50 rounded-xl p-3 border border-red-200">
              <input type="checkbox" className="mt-1" />
              <p className="text-xs text-red-800">
                我确认投诉内容真实有效，承诺不提交虚假投诉。若经查证属于虚假投诉，我同意承担相关责任。
              </p>
            </div>

            {/* Submit Button */}
            <button
              disabled={description.length < 50}
              className={`w-full h-12 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${
                description.length < 50
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-red-600 text-white hover:shadow-lg'
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
              提交投诉
            </button>

            {/* Help Info */}
            <div className="bg-blue-50 rounded-2xl p-4 border border-blue-200">
              <p className="text-xs font-bold text-blue-900 mb-2">❓ 需要帮助？</p>
              <p className="text-xs text-blue-800 mb-3">
                如对投诉处理流程有疑问，可联系客服团队。
              </p>
              <button className="text-xs text-blue-700 font-bold hover:text-blue-900">
                联系客服 →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
