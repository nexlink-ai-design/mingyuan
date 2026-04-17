'use client';

import SidebarNav from '@/components/companions/SidebarNav';
import DesktopHeader from '@/components/companions/DesktopHeader';
import HeroBanner from '@/components/companions/HeroBanner';
import FeatureGrid from '@/components/companions/FeatureGrid';
import EliteRecommendations from '@/components/companions/EliteRecommendations';
import CompanionsList from '@/components/companions/CompanionsList';
import ScrollToTopButton from '@/components/companions/ScrollToTopButton';
import GlobalBottomNav from '@/components/GlobalBottomNav';

export default function CompanionsPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col lg:flex-row">
      <SidebarNav />

      <main className="flex-1 flex flex-col min-w-0">
        <DesktopHeader />

        <div className="flex-1 overflow-y-auto pb-24 lg:pb-8">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 space-y-8">
            
            <HeroBanner />

            <FeatureGrid />

            <EliteRecommendations />

            <CompanionsList />
          </div>
        </div>

        <GlobalBottomNav />
      </main>

      <ScrollToTopButton />
    </div>
  );
}
