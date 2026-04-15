'use client';

import { ArrowUp } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-24 lg:bottom-8 right-4 lg:right-8 z-50 flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-r from-[#E05299] to-[#ff7eb3] text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 transform hover:scale-110 active:scale-95"
      aria-label="返回顶部"
    >
      <ArrowUp className="w-6 h-6 lg:w-7 lg:h-7" />
    </button>
  );
}
