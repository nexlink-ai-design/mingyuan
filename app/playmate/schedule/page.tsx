'use client';

import { useState } from 'react';
import { Calendar, Clock, Plus, X, Check } from 'lucide-react';
import Link from 'next/link';

export default function PlaymateSchedulePage() {
  const [tabActive, setTabActive] = useState<'week' | 'time'>('week');
  const [selectedDays, setSelectedDays] = useState<string[]>(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']);
  const [selectedTimes, setSelectedTimes] = useState<string[]>(['09:00', '10:00', '14:00', '15:00', '18:00', '19:00', '20:00', '21:00']);

  const daysOfWeek = [
    { id: 'Monday', label: '周一' },
    { id: 'Tuesday', label: '周二' },
    { id: 'Wednesday', label: '周三' },
    { id: 'Thursday', label: '周四' },
    { id: 'Friday', label: '周五' },
    { id: 'Saturday', label: '周六' },
    { id: 'Sunday', label: '周日' },
  ];

  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
  ];

  const toggleDay = (dayId: string) => {
    setSelectedDays(prev =>
      prev.includes(dayId)
        ? prev.filter(d => d !== dayId)
        : [...prev, dayId]
    );
  };

  const toggleTime = (time: string) => {
    setSelectedTimes(prev =>
      prev.includes(time)
        ? prev.filter(t => t !== time)
        : [...prev, time]
    );
  };

  const toggleAllDays = () => {
    if (selectedDays.length === daysOfWeek.length) {
      setSelectedDays([]);
    } else {
      setSelectedDays(daysOfWeek.map(d => d.id));
    }
  };

  const toggleAllTimes = () => {
    if (selectedTimes.length === timeSlots.length) {
      setSelectedTimes([]);
    } else {
      setSelectedTimes([...timeSlots]);
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
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Calendar className="w-6 h-6" />
            档期管理
          </h1>
          <p className="text-sm text-white/80 mt-1">设置您的工作档期和时间</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-6 mt-6">
        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-200">
          <button
            onClick={() => setTabActive('week')}
            className={`pb-3 font-bold text-sm transition-colors ${
              tabActive === 'week'
                ? 'text-[#E05299] border-b-2 border-[#E05299]'
                : 'text-[#655E58]'
            }`}
          >
            选择工作日期
          </button>
          <button
            onClick={() => setTabActive('time')}
            className={`pb-3 font-bold text-sm transition-colors ${
              tabActive === 'time'
                ? 'text-[#E05299] border-b-2 border-[#E05299]'
                : 'text-[#655E58]'
            }`}
          >
            选择工作时段
          </button>
        </div>

        {/* Week Selection Tab */}
        {tabActive === 'week' && (
          <div className="space-y-4">
            {/* Select All Button */}
            <div className="flex items-center justify-between bg-white rounded-2xl p-4 border-2 border-[#E05299]">
              <span className="text-sm font-bold text-[#1C1A17]">
                选择全部工作日
              </span>
              <button
                onClick={toggleAllDays}
                className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                  selectedDays.length === daysOfWeek.length
                    ? 'bg-[#E05299] border-[#E05299]'
                    : 'border-gray-300'
                }`}
              >
                {selectedDays.length === daysOfWeek.length && (
                  <Check className="w-4 h-4 text-white" />
                )}
              </button>
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-2 gap-3">
              {daysOfWeek.map((day) => (
                <button
                  key={day.id}
                  onClick={() => toggleDay(day.id)}
                  className={`h-20 rounded-2xl border-2 transition-all flex flex-col items-center justify-center ${
                    selectedDays.includes(day.id)
                      ? 'bg-[#FDF2F7] border-[#E05299]'
                      : 'bg-white border-gray-200 text-[#655E58]'
                  }`}
                >
                  <span className={`text-2xl mb-1 ${
                    selectedDays.includes(day.id) ? '' : ''
                  }`}>
                    {['🌅', '📅', '💼', '🎯', '🎉', '🎪', '🌙'][daysOfWeek.indexOf(day)]}
                  </span>
                  <span className={`text-sm font-bold ${
                    selectedDays.includes(day.id)
                      ? 'text-[#E05299]'
                      : 'text-[#655E58]'
                  }`}>
                    {day.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Summary */}
            <div className="bg-blue-50 rounded-2xl p-4 border border-blue-200">
              <p className="text-sm font-bold text-blue-900 mb-2">📊 统计信息</p>
              <p className="text-sm text-blue-800">
                已选择 <span className="font-bold text-blue-900">{selectedDays.length}</span> 天，
                每周工作 <span className="font-bold text-blue-900">{selectedDays.length}</span> 天的档期。
              </p>
            </div>

            <button className="w-full h-12 bg-[#E05299] text-white rounded-2xl font-bold hover:shadow-lg transition-shadow">
              保存并继续
            </button>
          </div>
        )}

        {/* Time Selection Tab */}
        {tabActive === 'time' && (
          <div className="space-y-4">
            {/* Select All Button */}
            <div className="flex items-center justify-between bg-white rounded-2xl p-4 border-2 border-[#E05299]">
              <span className="text-sm font-bold text-[#1C1A17]">
                全天开放 (8点-23点)
              </span>
              <button
                onClick={toggleAllTimes}
                className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                  selectedTimes.length === timeSlots.length
                    ? 'bg-[#E05299] border-[#E05299]'
                    : 'border-gray-300'
                }`}
              >
                {selectedTimes.length === timeSlots.length && (
                  <Check className="w-4 h-4 text-white" />
                )}
              </button>
            </div>

            {/* Time Slots Grid */}
            <div className="grid grid-cols-4 gap-2">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => toggleTime(time)}
                  className={`h-12 rounded-xl border-2 font-bold text-sm transition-all ${
                    selectedTimes.includes(time)
                      ? 'bg-[#E05299] text-white border-[#E05299]'
                      : 'bg-white border-gray-200 text-[#655E58]'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>

            {/* Time Visualization */}
            <div className="bg-white rounded-2xl p-4">
              <p className="text-xs font-bold text-[#655E58] mb-3 uppercase">工作时间可视化</p>
              <div className="space-y-2">
                {daysOfWeek.map((day) => (
                  <div key={day.id}>
                    <p className="text-xs font-bold text-[#1C1A17] mb-1">{day.label}</p>
                    <div className="h-4 bg-gray-200 rounded-full overflow-hidden flex">
                      {timeSlots.map((time, index) => (
                        <div
                          key={time}
                          className={`flex-1 h-full ${
                            selectedTimes.includes(time)
                              ? 'bg-[#E05299]'
                              : 'bg-gray-200'
                          }`}
                          style={{
                            transition: 'background-color 0.2s'
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Statistics Card */}
            <div className="bg-green-50 rounded-2xl p-4 border border-green-200">
              <p className="text-sm font-bold text-green-900 mb-2">⏰ 工作统计</p>
              <p className="text-sm text-green-800 mb-1">
                每天工作时段: <span className="font-bold text-green-900">{selectedTimes.length}</span> 小时
              </p>
              <p className="text-sm text-green-800">
                每周工作时数: <span className="font-bold text-green-900">{selectedTimes.length * selectedDays.length}</span> 小时
              </p>
            </div>

            <button className="w-full h-12 bg-[#E05299] text-white rounded-2xl font-bold hover:shadow-lg transition-shadow">
              保存档期设置
            </button>
          </div>
        )}

        {/* Info Boxes */}
        <div className="mt-8 space-y-3">
          <div className="bg-yellow-50 rounded-2xl p-4 border border-yellow-200 flex gap-3">
            <span className="text-xl">⚠️</span>
            <div>
              <p className="text-xs font-bold text-yellow-900 mb-1">重要提示</p>
              <p className="text-xs text-yellow-800">档期设置表示您的可用时间。在这些时段用户才能向您发起订单请求。</p>
            </div>
          </div>

          <div className="bg-purple-50 rounded-2xl p-4 border border-purple-200 flex gap-3">
            <span className="text-xl">💡</span>
            <div>
              <p className="text-xs font-bold text-purple-900 mb-1">建议</p>
              <p className="text-xs text-purple-800">建议设置更多的工作档期，这样能获得更多的订单机会和收入。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
