'use client';

import { useState } from 'react';
import { Send, Search, MoreVertical, Phone, Video, Info } from 'lucide-react';
import Link from 'next/link';

export default function ChatPage() {
  const [selectedChatId, setSelectedChatId] = useState<number | null>(1);
  const [messageText, setMessageText] = useState('');

  const conversations = [
    {
      id: 1,
      name: '王欣怡',
      avatar: '👑',
      lastMessage: '好的，今天19点见！',
      timestamp: '2分钟前',
      unread: 3,
      status: 'online',
    },
    {
      id: 2,
      name: '李明',
      avatar: '👨',
      lastMessage: '下午有空吗？',
      timestamp: '15分钟前',
      unread: 1,
      status: 'online',
    },
    {
      id: 3,
      name: '陈叶',
      avatar: '💼',
      lastMessage: '感谢您的服务',
      timestamp: '1小时前',
      unread: 0,
      status: 'offline',
    },
    {
      id: 4,
      name: '刘艺',
      avatar: '✨',
      lastMessage: '期待与您的合作',
      timestamp: '3小时前',
      unread: 0,
      status: 'offline',
    },
    {
      id: 5,
      name: '张媛',
      avatar: '🌟',
      lastMessage: '怎样可以提高排名？',
      timestamp: '昨天',
      unread: 2,
      status: 'online',
    },
  ];

  const messages = [
    {
      id: 1,
      sender: 'other',
      text: '你好，我想和你组队玩王者荣耀',
      timestamp: '10:30',
      avatar: '👑',
    },
    {
      id: 2,
      sender: 'self',
      text: '好的，我今天下午有空',
      timestamp: '10:32',
    },
    {
      id: 3,
      sender: 'other',
      text: '太好了！你的段位是多少？',
      timestamp: '10:33',
      avatar: '👑',
    },
    {
      id: 4,
      sender: 'self',
      text: '星耀段，可以帮你上星或者冲分',
      timestamp: '10:35',
    },
    {
      id: 5,
      sender: 'other',
      text: '完美！那我们约19点开始？',
      timestamp: '10:37',
      avatar: '👑',
    },
    {
      id: 6,
      sender: 'self',
      text: '好的，19点见！',
      timestamp: '10:38',
    },
    {
      id: 7,
      sender: 'other',
      text: '好的，今天19点见！',
      timestamp: '10:39',
      avatar: '👑',
    },
  ];

  const currentChat = conversations.find(c => c.id === selectedChatId);

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col">
      <div className="h-screen flex flex-col max-w-md mx-auto w-full">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 pt-4 pb-4 px-6 sticky top-0 z-10">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="inline-block">
              ← 返回
            </Link>
            <h1 className="text-2xl font-bold">消息</h1>
            <div className="w-6" />
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="搜索对话"
              className="w-full pl-10 pr-4 py-2 bg-[#f8f9fa] border border-gray-200 rounded-2xl text-sm focus:border-[#E05299] focus:outline-none"
            />
          </div>
        </div>

        {/* Conversations List or Chat View */}
        <div className="flex-1 overflow-hidden flex">
          {/* Conversations Sidebar */}
          <div className={`${selectedChatId ? 'hidden md:flex' : 'flex'} md:flex w-full md:w-64 flex-col border-r border-gray-200 overflow-y-auto`}>
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedChatId(conv.id)}
                className={`p-4 border-b border-gray-100 text-left hover:bg-[#f8f9fa] transition-colors ${
                  selectedChatId === conv.id ? 'bg-[#FDF2F7] border-l-4 border-[#E05299]' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl relative">
                    {conv.avatar}
                    {conv.status === 'online' && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-sm text-[#1C1A17]">{conv.name}</p>
                      {conv.unread > 0 && (
                        <span className="w-5 h-5 bg-[#E05299] text-white rounded-full text-xs font-bold flex items-center justify-center">
                          {conv.unread}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#655E58] truncate mt-1">
                      {conv.lastMessage}
                    </p>
                    <p className="text-xs text-[#655E58] mt-1">{conv.timestamp}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Chat View */}
          {selectedChatId && currentChat && (
            <div className="flex-1 flex flex-col w-full bg-white">
              {/* Chat Header */}
              <div className="border-b border-gray-200 p-4 flex items-center justify-between bg-white sticky top-0 z-10">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedChatId(null)}
                    className="md:hidden text-lg"
                  >
                    ←
                  </button>
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{currentChat.avatar}</div>
                    <div>
                      <p className="font-bold text-[#1C1A17]">{currentChat.name}</p>
                      <p className="text-xs text-[#655E58]">
                        {currentChat.status === 'online' ? '🟢 在线' : '⚫ 离线'}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="w-10 h-10 rounded-full bg-[#f8f9fa] flex items-center justify-center hover:bg-gray-100 transition-colors">
                    <Phone className="w-5 h-5 text-[#E05299]" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-[#f8f9fa] flex items-center justify-center hover:bg-gray-100 transition-colors">
                    <Video className="w-5 h-5 text-[#E05299]" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-[#f8f9fa] flex items-center justify-center hover:bg-gray-100 transition-colors">
                    <MoreVertical className="w-5 h-5 text-[#E05299]" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'self' ? 'justify-end' : 'justify-start'} items-end gap-2`}
                  >
                    {msg.sender === 'other' && <div className="text-2xl">{msg.avatar}</div>}
                    <div
                      className={`max-w-xs px-4 py-2 rounded-2xl ${
                        msg.sender === 'self'
                          ? 'bg-[#E05299] text-white'
                          : 'bg-[#f8f9fa] text-[#1C1A17]'
                      }`}
                    >
                      <p className="text-sm break-words">{msg.text}</p>
                      <p className={`text-xs mt-1 ${
                        msg.sender === 'self' ? 'text-white/70' : 'text-[#655E58]'
                      }`}>
                        {msg.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Area */}
              <div className="border-t border-gray-200 p-4 bg-white">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="输入消息..."
                    className="flex-1 px-4 py-3 bg-[#f8f9fa] border border-gray-200 rounded-2xl focus:border-[#E05299] focus:outline-none text-sm"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        setMessageText('');
                      }
                    }}
                  />
                  <button className="w-10 h-10 bg-[#E05299] text-white rounded-full flex items-center justify-center hover:shadow-lg transition-shadow">
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!selectedChatId && (
            <div className="hidden md:flex flex-1 items-center justify-center bg-white">
              <div className="text-center">
                <div className="text-5xl mb-4">💬</div>
                <p className="text-lg font-bold text-[#1C1A17] mb-2">选择一个对话</p>
                <p className="text-sm text-[#655E58]">开始聊天或创建新的对话</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
