'use client';

import { useState } from 'react';
import { Heart, DollarSign, Download, Plus, ChevronRight, TrendingUp, TrendingDown } from 'lucide-react';
import Link from 'next/link';

export default function WalletPage() {
  const [tabActive, setTabActive] = useState<'balance' | 'transactions'>('balance');

  const walletData = {
    balance: 1285.50,
    frozen: 120.00,
    totalEarning: 5280.50,
    monthlyEarning: 1285.50,
  };

  const transactions = [
    {
      id: 1,
      type: 'income',
      title: '陪玩订单完成',
      amount: 280,
      date: '2024-01-15 14:32',
      status: '已到账',
    },
    {
      id: 2,
      type: 'income',
      title: '游戏陪玩时间费',
      amount: 150,
      date: '2024-01-14 18:45',
      status: '已到账',
    },
    {
      id: 3,
      type: 'withdraw',
      title: '提现申请',
      amount: -500,
      date: '2024-01-12 09:20',
      status: '处理中',
    },
    {
      id: 4,
      type: 'income',
      title: '约会陪伴费用',
      amount: 320,
      date: '2024-01-10 20:15',
      status: '已到账',
    },
    {
      id: 5,
      type: 'withdraw',
      title: '提现申请',
      amount: -300,
      date: '2024-01-08 15:40',
      status: '已完成',
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#E05299] to-[#FF6B9D] text-white pt-8 pb-12 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-6">
          <Link href="/user/profile" className="inline-block text-lg mb-6">
            ← 返回
          </Link>
          <h1 className="text-2xl font-bold mb-8">我的钱包</h1>

          {/* Wallet Balance Card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 mb-6 border border-white/20">
            <p className="text-sm text-white/80 font-medium mb-2">账户余额</p>
            <h2 className="text-4xl font-bold mb-4">¥ {walletData.balance.toFixed(2)}</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-xs text-white/70 mb-1">冻结金额</p>
                <p className="text-lg font-bold">¥ {walletData.frozen.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-xs text-white/70 mb-1">可用余额</p>
                <p className="text-lg font-bold">¥ {(walletData.balance - walletData.frozen).toFixed(2)}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="flex-1 h-10 bg-white text-[#E05299] rounded-xl font-bold text-sm hover:shadow-lg transition-shadow flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                提现
              </button>
              <button className="flex-1 h-10 bg-white/20 text-white border border-white rounded-xl font-bold text-sm hover:bg-white/30 transition-colors flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" />
                充值
              </button>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <p className="text-xs text-white/70 mb-2 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> 本月收入
              </p>
              <p className="text-xl font-bold">¥ {walletData.monthlyEarning.toFixed(2)}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <p className="text-xs text-white/70 mb-2 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> 总累积收入
              </p>
              <p className="text-xl font-bold">¥ {walletData.totalEarning.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-6 mt-6">
        {/* Tab Buttons */}
        <div className="flex gap-4 mb-6 border-b border-gray-200">
          <button
            onClick={() => setTabActive('balance')}
            className={`pb-3 font-bold text-sm transition-colors ${
              tabActive === 'balance'
                ? 'text-[#E05299] border-b-2 border-[#E05299]'
                : 'text-[#655E58]'
            }`}
          >
            钱包管理
          </button>
          <button
            onClick={() => setTabActive('transactions')}
            className={`pb-3 font-bold text-sm transition-colors ${
              tabActive === 'transactions'
                ? 'text-[#E05299] border-b-2 border-[#E05299]'
                : 'text-[#655E58]'
            }`}
          >
            交易记录
          </button>
        </div>

        {/* Balance Management Tab */}
        {tabActive === 'balance' && (
          <div className="space-y-4">
            {/* Payment Methods */}
            <div className="bg-white rounded-2xl p-4">
              <h3 className="font-bold text-[#1C1A17] mb-4 text-sm">支付方式</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-[#f8f9fa] rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#5599FF] rounded-lg flex items-center justify-center text-white font-bold">
                      支
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#1C1A17]">微信支付</p>
                      <p className="text-xs text-[#655E58]">已绑定</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#655E58]" />
                </div>
                <div className="flex items-center justify-between p-3 bg-[#f8f9fa] rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#FF6B6B] rounded-lg flex items-center justify-center text-white font-bold">
                      支
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#1C1A17]">支付宝</p>
                      <p className="text-xs text-[#655E58]">未绑定</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#655E58]" />
                </div>
              </div>
            </div>

            {/* Bank Card */}
            <div className="bg-white rounded-2xl p-4">
              <h3 className="font-bold text-[#1C1A17] mb-4 text-sm">银行卡信息</h3>
              <div className="p-4 bg-gradient-to-r from-[#E05299]/20 to-[#FF6B9D]/20 rounded-xl border border-[#E05299]/30">
                <p className="text-xs text-[#655E58] mb-2">绑定银行卡</p>
                <p className="text-lg font-bold text-[#1C1A17]">•••• •••• •••• 6288</p>
                <p className="text-xs text-[#655E58] mt-2">中国银行 (储蓄卡)</p>
              </div>
            </div>

            {/* Account Security */}
            <div className="bg-white rounded-2xl p-4">
              <h3 className="font-bold text-[#1C1A17] mb-4 text-sm">账户安全</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-[#f8f9fa] rounded-xl">
                  <div>
                    <p className="text-sm font-bold text-[#1C1A17]">设置资金密码</p>
                    <p className="text-xs text-[#655E58]">保护账户资金安全</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#655E58]" />
                </div>
                <div className="flex items-center justify-between p-3 bg-[#f8f9fa] rounded-xl">
                  <div>
                    <p className="text-sm font-bold text-[#1C1A17]">实名认证</p>
                    <p className="text-xs text-[#655E58]">已认证 - 张三</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#655E58]" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Transactions Tab */}
        {tabActive === 'transactions' && (
          <div className="space-y-2">
            {transactions.map((transaction) => (
              <Link href={`/order/${transaction.id}`} key={transaction.id}>
                <div className="bg-white rounded-2xl p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        transaction.type === 'income' 
                          ? 'bg-green-100' 
                          : 'bg-red-100'
                      }`}>
                        {transaction.type === 'income' ? (
                          <TrendingUp className={`w-5 h-5 ${'text-green-600'}`} />
                        ) : (
                          <TrendingDown className={`w-5 h-5 ${'text-red-600'}`} />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#1C1A17]">{transaction.title}</p>
                        <p className="text-xs text-[#655E58] mt-1">{transaction.date}</p>
                        <p className={`text-xs font-medium mt-1 ${
                          transaction.status === '已到账' || transaction.status === '已完成'
                            ? 'text-green-600'
                            : 'text-orange-600'
                        }`}>
                          {transaction.status}
                        </p>
                      </div>
                    </div>
                    <p className={`text-lg font-bold ${
                      transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'income' ? '+' : ''}{transaction.amount}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
