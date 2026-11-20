'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';

export default function PersistentMobileCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      setIsVisible(scrollY > 350);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="md:hidden fixed bottom-4 left-4 right-4 z-40 animate-slide-up pointer-events-auto">
      <div className="bg-stone-900/95 backdrop-blur-md border border-stone-800 rounded-2xl p-3 shadow-xl flex items-center justify-between gap-3 text-white">
        <div className="pl-1">
          <div className="text-xs font-black text-white">HouseHero Dispatch</div>
          <div className="text-[10px] text-stone-400">Zero on-site payment needed</div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://wa.me/2349134204578"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
            aria-label="WhatsApp Dispatch"
          >
            <MessageCircle className="w-4 h-4" />
          </a>

          <Link
            href="/book"
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <span>Book Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
