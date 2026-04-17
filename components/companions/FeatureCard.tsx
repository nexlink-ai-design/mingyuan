'use client';

import { Sparkles, ShieldCheck, Clock, Gem, Flame, UserCheck, Zap, Crown } from 'lucide-react';

const iconMap: { [key: string]: React.ElementType } = {
  'lucide:sparkles': Sparkles,
  'lucide:shield-check': ShieldCheck,
  'lucide:clock': Clock,
  'lucide:gem': Gem,
  'lucide:flame': Flame,
  'lucide:user-check': UserCheck,
  'lucide:zap': Zap,
  'lucide:crown': Crown,
};

interface FeatureCardProps {
  bg: string;
  icon: string;
  iconColor: string;
  title: string;
  subtitle: string;
  bgIcon: string;
}

export default function FeatureCard({ 
  bg, 
  icon, 
  iconColor, 
  title, 
  subtitle, 
  bgIcon 
}: FeatureCardProps) {
  const IconComponent = iconMap[icon];
  const BgIconComponent = iconMap[bgIcon];

  return (
    <div className={`${bg} rounded-2xl p-4 relative overflow-hidden h-24 flex flex-col justify-center group cursor-pointer hover:shadow-md transition-shadow`}>
      <div className="flex items-center gap-1.5 mb-1">
        {IconComponent && <IconComponent className={`w-3.5 h-3.5 ${iconColor}`} />}
        <span className={`text-sm font-bold ${iconColor} leading-none`}>{title}</span>
      </div>
      <p className="text-sm font-bold text-gray-900 relative z-10">{subtitle}</p>
      {BgIconComponent && <BgIconComponent className={`absolute -bottom-2 -right-2 w-12 h-12 ${iconColor} opacity-10 group-hover:scale-110 transition-transform`} />}
    </div>
  );
}
