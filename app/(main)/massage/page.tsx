'use client';

import Navbar from "@/components/Navbar";
import MassageTherapistGrid from "@/components/MassageTherapistGrid";
import MassageFilterBar from "@/components/MassageFilterBar";
import BottomNav from "@/components/BottomNav";

export default function Massage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16 pb-24">
        <MassageFilterBar />
        <MassageTherapistGrid category={null} />
      </main>
      <BottomNav />
    </div>
  );
}
