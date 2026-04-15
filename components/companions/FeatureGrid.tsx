'use client';

import FeatureCard from './FeatureCard';

export default function FeatureGrid() {
  const features = [
    {
      bg: "bg-[#F9DCEB]/60",
      icon: "lucide:sparkles",
      iconColor: "text-[#E05299]",
      title: "新人福利",
      subtitle: "首单立减 ¥20",
      bgIcon: "lucide:flame"
    },
    {
      bg: "bg-[#EFF6FF]",
      icon: "lucide:shield-check",
      iconColor: "text-[#3B82F6]",
      title: "实名认证",
      subtitle: "100% 真人陪伴",
      bgIcon: "lucide:user-check"
    },
    {
      bg: "bg-[#FFF7ED]",
      icon: "lucide:clock",
      iconColor: "text-[#F97316]",
      title: "极速响应",
      subtitle: "3分钟快速匹配",
      bgIcon: "lucide:zap"
    },
    {
      bg: "bg-[#FAF5FF]",
      icon: "lucide:gem",
      iconColor: "text-[#A855F7]",
      title: "品质服务",
      subtitle: "尊享高端体验",
      bgIcon: "lucide:crown"
    }
  ];

  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-6">
      {features.map((feature) => (
        <FeatureCard key={feature.title} {...feature} />
      ))}
    </section>
  );
}
