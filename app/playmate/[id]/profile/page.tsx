'use client';

import { Heart, Send, Star, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { useState, use } from 'react';

export default function PlaymateProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [liked, setLiked] = useState(false);

  const playmate = {
    id: id,
    name: '桃之夭夭',
    level: 'Lv.28 钻石陪玩',
    rating: 4.9,
    game: '英雄联盟',
    orders: 1240,
    bio: '"英雄联盟全区可打，主玩AD，欢迎老板下单~"',
    tags: ['御姐音', '技术流', '人美话多'],
    price: 88,
    status: 'online',
    location: '上海市',
    responseTime: '5分钟内',
    descriptions: [
      '英雄联盟top国服，段位云顶之弈。',
      '温柔御姐音，游戏氛围轻松愉快。',
      '非常擅长讲解意识和打法，新人友好！'
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header with back button */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 h-14 flex items-center">
        <Link href="/search">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <span>←</span>
          </button>
        </Link>
        <h1 className="text-lg font-bold text-[#1C1A17] flex-1 text-center">{playmate.name}</h1>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <span>⋮</span>
        </button>
      </header>

      {/* Profile Section */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex gap-4 mb-4">
          {/* Avatar */}
          <div className="relative w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-pink-400 to-purple-500">
            <div className="w-full h-full flex items-center justify-center text-white text-3xl font-bold">
              {playmate.name.charAt(0)}
            </div>
            {playmate.status === 'online' && (
              <div className="absolute top-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
            )}
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h2 className="text-xl font-bold text-[#1C1A17]">{playmate.name}</h2>
                <p className="text-sm text-gray-600">{playmate.level}</p>
              </div>
              <button
                onClick={() => setLiked(!liked)}
                className={`p-2 rounded-full transition-colors ${
                  liked ? 'bg-red-100 text-red-500' : 'bg-gray-100 text-gray-600'
                }`}
              >
                <Heart className="w-5 h-5" fill={liked ? 'currentColor' : 'none'} />
              </button>
            </div>

            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-bold text-gray-900">{playmate.rating}</span>
              </div>
              <span className="text-xs text-gray-600">•</span>
              <span className="text-xs text-gray-600">{playmate.orders} 单</span>
              <span className="text-xs text-gray-600">•</span>
              <span className="text-xs text-gray-600">{playmate.location}</span>
            </div>

            <div className="flex gap-1 flex-wrap">
              {playmate.tags.map((tag) => (
                <span key={tag} className="text-xs bg-pink-100 text-[#E05299] px-2 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bio */}
        <p className="text-sm text-gray-700 italic mb-4">{playmate.bio}</p>

        {/* Quick Info */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-600 mb-1">响应时间</p>
            <p className="font-bold text-sm text-gray-900">{playmate.responseTime}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-600 mb-1">时均价格</p>
            <p className="font-bold text-sm text-[#E05299]">¥{playmate.price}/小时</p>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white border-b border-gray-200 p-4 space-y-4">
        <h3 className="font-bold text-[#1C1A17]">关于我</h3>
        {playmate.descriptions.map((desc, idx) => (
          <div key={idx} className="flex gap-3">
            <span className="text-[#E05299] font-bold shrink-0">✓</span>
            <p className="text-sm text-gray-700">{desc}</p>
          </div>
        ))}
      </div>

      {/* Available Games */}
      <div className="bg-white border-b border-gray-200 p-4">
        <h3 className="font-bold text-[#1C1A17] mb-3">擅长游戏</h3>
        <div className="space-y-2">
          {[
            { name: '英雄联盟', rank: '钻石I' },
            { name: '王者荣耀', rank: '星耀' },
            { name: '和平精英', rank: '超级王牌' }
          ].map((game) => (
            <div key={game.name} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
              <span className="font-medium text-sm text-gray-900">{game.name}</span>
              <span className="text-xs text-gray-600">{game.rank}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div className="bg-white p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-[#1C1A17]">评价</h3>
          <Link href="#">
            <span className="text-xs text-[#E05299]">查看全部 →</span>
          </Link>
        </div>
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="border-b border-gray-100 pb-3 last:border-0">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
                  U
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">用户 {i}</p>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-700">游戏打得很棒，讲解也很耐心，非常值得！</p>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex gap-3">
        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 rounded-full text-gray-900 font-medium hover:bg-gray-200 transition-colors">
          <MessageCircle className="w-5 h-5" />
          私信
        </button>
        <Link href={`/order/${playmate.id}`} className="flex-1">
          <button className="w-full px-4 py-3 bg-[#E05299] text-white font-bold rounded-full hover:shadow-lg transition-shadow">
            立即预约
          </button>
        </Link>
      </div>
    </div>
  );
}
