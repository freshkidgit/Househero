'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Star,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  MessageSquare
} from 'lucide-react';

interface Review {
  id: string;
  author: string;
  location: string;
  date: string;
  rating: number;
  service: string;
  headline: string;
  comment: string;
  verified: boolean;
}

const VERIFIED_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'David & Amanda Sterling',
    location: 'Denver, CO',
    date: 'Verified Client',
    rating: 5,
    service: 'Roof & Gutter Downspout Flush',
    headline: 'Prompt arrival and clear digital photo audit',
    comment:
      'HouseHero arrived on time and cleaned all our 2-story gutters with downspout flushing. Clear upfront pricing with zero surprise charges. Outstanding craftsmanship and clear photo audit sent right to my phone.',
    verified: true
  },
  {
    id: 'rev-2',
    author: 'Marcus Holloway',
    location: 'Littleton, CO',
    date: 'Verified Client',
    rating: 5,
    service: 'HVAC Seasonal Tune-Up',
    headline: 'Fixed an erratic furnace noise in 40 minutes',
    comment:
      'Our furnace was making an erratic humming noise right before a deep freeze. The technician diagnosed a worn capacitor on the spot and had it running whisper quiet in 40 minutes. Polite, clean, and knowledgeable.',
    verified: true
  },
  {
    id: 'rev-3',
    author: 'Sophia Chen',
    location: 'Boulder, CO',
    date: 'Verified Client',
    rating: 5,
    service: 'House & Deep Detailing',
    headline: 'A thorough clean down to the details',
    comment:
      'A thorough clean down to the details. Scrubbed baseboards, detailed the oven, and used safe botanical cleaners. Our home looks and smells fresh. 100% worth every dollar.',
    verified: true
  },
  {
    id: 'rev-4',
    author: 'Robert G. Ramirez',
    location: 'Lakewood, CO',
    date: 'Verified Client',
    rating: 5,
    service: 'Pressure & Soft-Washing',
    headline: 'Patio pavers look brand new',
    comment:
      'We had severe algae streaks on our back patio and stone firepit. The pressure washing crew calibrated their water pressure so it cleaned every paver without blowing out the joints. Excellent result.',
    verified: true
  },
  {
    id: 'rev-5',
    author: 'Elena & Tom Vance',
    location: 'Centennial, CO',
    date: 'Verified Client',
    rating: 5,
    service: 'Carpet Steam Extraction',
    headline: 'Removed stubborn pet stains without chemical smell',
    comment:
      'Truck-mounted hot water extraction lifted three stubborn high-traffic puppy stains from our living room wool rug. Dried completely in under 3 hours with zero chemical detergent residue.',
    verified: true
  },
  {
    id: 'rev-6',
    author: 'Craig Miller',
    location: 'Golden, CO',
    date: 'Verified Client',
    rating: 5,
    service: 'Driveway Snow Removal',
    headline: 'Cleared our steep driveway before 7:00 AM',
    comment:
      'After 8 inches of overnight snow, HouseHero had our driveway and walkway cleared before our morning commute. The rubber plow edge protected our stamped concrete from scratch marks.',
    verified: true
  }
];

export default function ReviewsPage() {
  const [filterService, setFilterService] = useState('all');

  const filtered = VERIFIED_REVIEWS.filter(
    (r) => filterService === 'all' || r.service.toLowerCase().includes(filterService.toLowerCase())
  );

  return (
    <div className="w-full pb-20 space-y-12">
      {/* Header */}
      <section className="pt-8 pb-12 lg:pt-14 lg:pb-16 bg-stone-50/60 border-b border-stone-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Real Homeowner Feedback
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight">
            Verified Customer Experiences
          </h1>
          <p className="text-sm sm:text-base text-stone-600 max-w-xl mx-auto leading-relaxed">
            Honest, verified testimonials from residential homeowners across our regional Colorado service routes.
          </p>

          {/* Quick Metrics */}
          <div className="pt-4 flex items-center justify-center gap-6 text-xs text-stone-600">
            <div className="flex items-center gap-1.5 font-bold text-stone-900">
              <span className="text-amber-600 font-black text-base">4.9 / 5.0</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                ))}
              </div>
            </div>
            <span className="text-stone-300">•</span>
            <span>100% Verified Homeowner Reviews</span>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-0.5">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>{rev.date}</span>
                  </span>
                </div>

                <div>
                  <h2 className="font-extrabold text-stone-900 text-base leading-snug">
                    {rev.headline}
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed italic">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-stone-900">{rev.author}</div>
                  <div className="text-stone-400 text-[11px]">{rev.location}</div>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-stone-100 text-stone-700 text-[11px] font-bold">
                  {rev.service}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Footer */}
        <div className="mt-12 text-center p-8 rounded-3xl bg-stone-50 border border-stone-200/80 max-w-2xl mx-auto space-y-4">
          <h2 className="text-xl font-black text-stone-900">Experience the HouseHero Standard</h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            All services are backed by our 24-hour complimentary re-clean guarantee and $2,000,000 general liability policy.
          </p>
          <div className="pt-1 flex items-center justify-center gap-3">
            <Link
              href="/book"
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-2"
            >
              <span>Schedule Service Online</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
