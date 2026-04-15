export interface ReviewDimensions {
  body: number;
  appearance: number;
  service: number;
  attitude: number;
  satisfaction: number;
}

export interface Review {
  user: string;
  rating: number;
  comment: string;
  date: string;
  dimensions?: ReviewDimensions;
  serviceName?: string;
}

export type CompanionCategory = "应酬" | "酒吧" | "夜总会" | "旅游" | "长期" | "游戏";

export interface Therapist {
  id: string;
  name: string;
  city: string;
  rating: number;
  reviews: number;
  specialty: string;
  category: CompanionCategory;
  price: number;
  verified: boolean;
  avatar: string;
  image: string;
  images: string[];
  bio: string;
  experience: number;
  tags: string[];
  services: { name: string; duration: string; price: number; description?: string }[];
  reviewList: Review[];
  isNew?: boolean;
  isRecommended?: boolean;
}

// 伪随机数生成器 - 基于 id 确保一致性
const seededRandom = (seed: string, index: number): number => {
  const str = seed + index;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return (hash % 1000) / 1000;
};

const createTherapist = (
  id: string,
  name: string,
  city: string,
  specialty: string,
  category: CompanionCategory,
  price: number,
  isRecommended?: boolean,
  isNew?: boolean
): Therapist => {
  const seed = `${id}-${name}`;
  const randomRating = seededRandom(seed, 1);
  const randomReviews = seededRandom(seed, 2);
  const randomExp = seededRandom(seed, 3);
  
  // 循环使用图片（只有 1-8 的图片可用）
  const imgId = ((parseInt(id) - 1) % 8) + 1;
  
  return {
    id,
    name,
    city,
    rating: 4.8 + randomRating * 0.19,
    reviews: Math.floor(200 + randomReviews * 400),
    specialty,
    category,
    price,
    verified: true,
    avatar: name.charAt(0),
    image: `/therapist-${imgId}.jpg`,
    images: [
      `/therapist-${imgId}.jpg`,
      `/therapist-${imgId}b.jpg`,
    ],
    bio: `专业${specialty}师傅，拥有丰富的服务经验，致力于为您带来最舒适的体验。`,
    experience: Math.floor(3 + randomExp * 12),
    tags: [specialty, `${Math.floor(3 + randomExp * 12)}年经验`, "好评如潮"],
    services: [
      { name: `${specialty}服务A`, duration: "60分钟", price, description: `专业${specialty}服务` },
      { name: `${specialty}服务B`, duration: "90分钟", price: price + 100, description: `尊享${specialty}服务` },
      { name: `${specialty}服务C`, duration: "120分钟", price: price + 200, description: `豪华${specialty}套餐` },
    ],
    reviewList: [
      { user: "客户A", rating: 5, comment: "非常满意，推荐！", date: "2024-02-01", dimensions: { body: 5, appearance: 5, service: 5, attitude: 5, satisfaction: 5 } },
      { user: "客户B", rating: 5, comment: "手法专业，下次继续", date: "2024-01-25", dimensions: { body: 5, appearance: 4, service: 5, attitude: 5, satisfaction: 5 } },
    ],
    isRecommended,
    isNew,
  };
};

export const therapists: Therapist[] = [
  createTherapist("1", "林小雅", "上海", "精油SPA", "应酬", 388, true),
  createTherapist("2", "陈美琪", "北京", "中式推拿", "酒吧", 358, false, true),
  createTherapist("3", "王诗涵", "广州", "泰式按摩", "夜总会", 428, true),
  createTherapist("4", "李芸", "深圳", "足疗养生", "旅游", 298),
  createTherapist("5", "刘美娜", "杭州", "精油SPA", "长期", 378, false, true),
  createTherapist("6", "周欣语", "南京", "中式推拿", "游戏", 348),
  createTherapist("7", "张蕾", "成都", "泰式按摩", "应酬", 408, true),
  createTherapist("8", "冯思语", "武汉", "足疗养生", "酒吧", 288),
  createTherapist("9", "白雨晴", "西安", "精油SPA", "夜总会", 398),
  createTherapist("10", "何思琪", "重庆", "中式推拿", "旅游", 358, true),
  createTherapist("11", "贾宝玥", "天津", "泰式按摩", "长期", 418),
  createTherapist("12", "高雨欣", "苏州", "足疗养生", "游戏", 308, false, true),
];

export function getTherapistById(id: string): Therapist | null {
  return therapists.find((t) => t.id === id) || null;
}
