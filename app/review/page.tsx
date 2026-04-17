'use client';

import { useState } from 'react';
import { Star, Send, Image as ImageIcon, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function ReviewPage() {
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const reviews = [
    {
      id: 1,
      reviewer: '王欣怡',
      avatar: '👑',
      rating: 5,
      title: '超级满意的体验！',
      content: '陪玩水平很高，配合度完美，教我了很多游戏技巧。下次继续！',
      date: '2024-01-15',
      likes: 24,
      replies: 2,
    },
    {
      id: 2,
      reviewer: '李明',
      avatar: '👨',
      rating: 5,
      title: '专业且耐心',
      content: '很有耐心地教我，讲解得很清楚。强烈推荐！',
      date: '2024-01-14',
      likes: 18,
      replies: 1,
    },
    {
      id: 3,
      reviewer: '陈叶',
      avatar: '💼',
      rating: 4,
      title: '很好的陪伴体验',
      content: '聊天很愉快，时间也安排得很紧凑。',
      date: '2024-01-12',
      likes: 12,
      replies: 0,
    },
    {
      id: 4,
      reviewer: '刘艺',
      avatar: '✨',
      rating: 5,
      title: '完美的个人服务',
      content: '非常专业，提前做了充分准备，值得信赖！',
      date: '2024-01-10',
      likes: 31,
      replies: 3,
    },
  ];

  const handleSubmitReview = () => {
    if (reviewText.trim()) {
      setSubmitted(true);
      setTimeout(() => {
        setReviewText('');
        setRating(5);
        setSubmitted(false);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#E05299] to-[#FF6B9D] text-white pt-8 pb-6 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-6">
          <Link href="/" className="inline-block text-lg mb-6">
            ← 返回
          </Link>
          <h1 className="text-2xl font-bold">评价与评论</h1>
          <p className="text-sm text-white/80">分享您的服务体验</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-6 mt-6">
        {/* Write Review Section */}
        <div className="bg-white rounded-2xl p-6 mb-6 border-2 border-dashed border-[#E05299]/30">
          <h2 className="font-bold text-[#1C1A17] mb-4 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#E05299]" />
            分享您的体验
          </h2>

          {/* Star Rating */}
          <div className="mb-4">
            <p className="text-xs font-bold text-[#655E58] mb-2 uppercase">整体评分</p>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="text-3xl transition-transform hover:scale-110"
                >
                  <span className={star <= rating ? 'text-yellow-400' : 'text-gray-300'}>
                    ★
                  </span>
                </button>
              ))}
            </div>
            <p className="text-sm text-[#E05299] font-bold mt-2">{rating}/5.0 分</p>
          </div>

          {/* Review Title */}
          <div className="mb-4">
            <label className="block text-xs font-bold text-[#655E58] mb-2 uppercase">评价标题</label>
            <input
              type="text"
              placeholder="用一句话概括您的体验"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[#E05299] focus:outline-none text-sm"
            />
          </div>

          {/* Review Text */}
          <div className="mb-4">
            <label className="block text-xs font-bold text-[#655E58] mb-2 uppercase">详细评价</label>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="分享您对这次服务的看法... (至少10个字)"
              rows={5}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[#E05299] focus:outline-none text-sm resize-none"
            />
            <p className="text-xs text-[#655E58] mt-2">
              {reviewText.length}/500 字
            </p>
          </div>

          {/* Image Upload */}
          <div className="mb-4">
            <p className="text-xs font-bold text-[#655E58] mb-2 uppercase">上传图片或视频</p>
            <button className="w-full px-4 py-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-[#E05299] transition-colors flex flex-col items-center justify-center">
              <ImageIcon className="w-6 h-6 text-gray-400 mb-2" />
              <span className="text-sm text-gray-600">点击上传或拖拽放置</span>
            </button>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmitReview}
            disabled={reviewText.length < 10}
            className={`w-full h-12 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
              reviewText.length < 10
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-[#E05299] text-white hover:shadow-lg'
            }`}
          >
            <Send className="w-4 h-4" />
            {submitted ? '✓ 已提交' : '提交评价'}
          </button>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-[#1C1A17]">用户评价</h2>
            <span className="text-sm text-[#E05299] font-bold">
              ⭐ 平均评分 4.8/5.0
            </span>
          </div>

          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-2xl p-4 hover:shadow-md transition-shadow">
              {/* Review Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{review.avatar}</div>
                  <div>
                    <p className="text-sm font-bold text-[#1C1A17]">{review.reviewer}</p>
                    <p className="text-xs text-[#655E58]">{review.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-sm ${
                        i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>

              {/* Review Title */}
              <h3 className="font-bold text-[#1C1A17] mb-2 text-sm">{review.title}</h3>

              {/* Review Content */}
              <p className="text-sm text-[#655E58] mb-4 leading-relaxed">
                {review.content}
              </p>

              {/* Review Actions */}
              <div className="flex items-center gap-4 pt-3 border-t border-gray-100">
                <button className="text-xs text-[#655E58] hover:text-[#E05299] font-medium transition-colors">
                  👍 赞同 ({review.likes})
                </button>
                <button className="text-xs text-[#655E58] hover:text-[#E05299] font-medium transition-colors">
                  💬 回复 ({review.replies})
                </button>
                <button className="text-xs text-[#655E58] hover:text-red-600 font-medium transition-colors ml-auto">
                  举报
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <button className="w-full h-12 border-2 border-gray-200 text-[#655E58] rounded-2xl font-bold mt-6 hover:border-[#E05299] hover:text-[#E05299] transition-colors">
          加载更多评价
        </button>
      </div>
    </div>
  );
}
