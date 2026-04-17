'use client';

import SelectionHeader from '@/components/selection/SelectionHeader';
import SelectionBanner from '@/components/selection/SelectionBanner';
import SelectionCategories from '@/components/selection/SelectionCategories';
import SelectionTrustBadges from '@/components/selection/SelectionTrustBadges';
import SelectionHotRecommendations from '@/components/selection/SelectionHotRecommendations';
import SelectionMainList from '@/components/selection/SelectionMainList';
import GlobalBottomNav from '@/components/GlobalBottomNav';

export default function SelectionPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col font-sans">
      <SelectionHeader />

      <main className="flex-1 overflow-y-auto pb-24">
        <SelectionBanner />
        <SelectionCategories />
        <SelectionTrustBadges />
        <SelectionHotRecommendations />
        <SelectionMainList />
      </main>
      <GlobalBottomNav />
    </div>
  );
}
