'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  X,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Maximize2
} from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: 'interior' | 'exterior' | 'seasonal';
  type: 'Completed Client Project' | 'Trade Demonstration';
  image: string;
  description: string;
  location: string;
  serviceId: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'patio-restoration',
    title: 'Natural Flagstone Patio Restoration',
    category: 'exterior',
    type: 'Completed Client Project',
    image: '/images/after-patio.jpg',
    description: 'High-temperature soft wash and moss extraction with fresh polymeric sand joints.',
    location: 'Denver, CO',
    serviceId: 'pressure-washing'
  },
  {
    id: 'patio-before',
    title: 'Neglected Paver Patio (Pre-Treatment Condition)',
    category: 'exterior',
    type: 'Trade Demonstration',
    image: '/images/before-patio.jpg',
    description: 'Heavily weathered surface with deep algae buildup and weed intrusion prior to restoration.',
    location: 'Denver, CO',
    serviceId: 'pressure-washing'
  },
  {
    id: 'kitchen-detailing',
    title: 'Luxury Kitchen Island & Marble Detailing',
    category: 'interior',
    type: 'Completed Client Project',
    image: '/images/house-cleaning.jpg',
    description: 'Waterfall marble sanitization, range hood degreasing, and micro-fiber surface polish.',
    location: 'Highlands Ranch, CO',
    serviceId: 'house-deep-cleaning'
  },
  {
    id: 'roof-gutter-flush',
    title: 'Roofline & Downspout Cleanout',
    category: 'exterior',
    type: 'Completed Client Project',
    image: '/images/gutter-cleaning.jpg',
    description: 'Ladder-standoff roof cleanout with high-pressure underground downspout jetting.',
    location: 'Boulder, CO',
    serviceId: 'gutter-cleaning'
  },
  {
    id: 'driveway-pressure-wash',
    title: 'Concrete Paver Surface Cleaning',
    category: 'exterior',
    type: 'Completed Client Project',
    image: '/images/pressure-washing.jpg',
    description: 'Rotary surface cleaner clearing heavy vehicle tire marks and organic moss.',
    location: 'Lakewood, CO',
    serviceId: 'pressure-washing'
  },
  {
    id: 'carpet-steam-extraction',
    title: '220°F Thermal Carpet Extraction',
    category: 'interior',
    type: 'Completed Client Project',
    image: '/images/carpet-cleaning.jpg',
    description: 'Truck-mounted steam extraction wand clearing deep pet allergens from plush carpet.',
    location: 'Centennial, CO',
    serviceId: 'carpet-cleaning'
  },
  {
    id: 'snow-clearance-commute',
    title: 'Winter Driveway Snow Clearance',
    category: 'seasonal',
    type: 'Completed Client Project',
    image: '/images/snow-removal.jpg',
    description: 'Rubber poly-blade snow blower clearing fresh 6-inch snowfall before 7:00 AM.',
    location: 'Golden, CO',
    serviceId: 'snow-removal'
  },
  {
    id: 'hvac-condenser-tune',
    title: 'Outdoor AC Condenser Coil Tune-Up',
    category: 'seasonal',
    type: 'Completed Client Project',
    image: '/images/hvac-maintenance.jpg',
    description: 'Diagnostic manifold testing, capacitor microfarad verification, and coil foam wash.',
    location: 'Littleton, CO',
    serviceId: 'hvac-maintenance'
  },
  {
    id: 'lawn-landscape-care',
    title: 'Residential Turf & Shrub Trimming',
    category: 'exterior',
    type: 'Completed Client Project',
    image: '/images/lawn-care.jpg',
    description: 'Precision hedge shaping and commercial mowing for crisp residential curb appeal.',
    location: 'Aurora, CO',
    serviceId: 'lawn-care'
  },
  {
    id: 'walkway-deicing',
    title: 'Front Walkway Ice Melt Application',
    category: 'seasonal',
    type: 'Completed Client Project',
    image: '/images/de-icing.jpg',
    description: 'Broadcast application of pet-safe magnesium chloride crystals across frozen entryway steps.',
    location: 'Denver, CO',
    serviceId: 'de-icing'
  }
];

export default function GalleryPage() {
  const [filter, setFilter] = useState<'all' | 'interior' | 'exterior' | 'seasonal'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = GALLERY_ITEMS.filter(
    (item) => filter === 'all' || item.category === filter
  );

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % filteredItems.length : null));
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : null
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  return (
    <div className="w-full pb-20">
      {/* Header */}
      <section className="pt-8 pb-12 lg:pt-14 lg:pb-16 bg-stone-50/60 border-b border-stone-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Workmanship &amp; Portfolio
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight">
            Craftsmanship in the Field
          </h1>
          <p className="text-sm sm:text-base text-stone-600 max-w-xl mx-auto leading-relaxed">
            Real photographic documentation from residential care visits across our regional service hubs. Click any project to inspect full-resolution details.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'exterior', label: 'Exterior & Masonry' },
              { id: 'interior', label: 'Interior Detailing' },
              { id: 'seasonal', label: 'Seasonal & Systems' }
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  filter === f.id
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'bg-white text-stone-700 border border-stone-200/80 hover:bg-stone-100/60'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(idx)}
              className="group bg-white rounded-3xl border border-stone-200/80 shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between"
            >
              <div className="relative aspect-4/3 w-full overflow-hidden bg-stone-100">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="p-3 rounded-full bg-white/90 text-stone-900 shadow-lg">
                    <Maximize2 className="w-5 h-5" />
                  </span>
                </div>

                <div className="absolute top-3 left-3">
                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs ${
                      item.type === 'Completed Client Project'
                        ? 'bg-emerald-700/90 text-white backdrop-blur-md'
                        : 'bg-stone-900/80 text-amber-300 backdrop-blur-md'
                    }`}
                  >
                    {item.type}
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-2">
                <div className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">
                  {item.location}
                </div>
                <h3 className="font-extrabold text-stone-900 text-base leading-snug group-hover:text-amber-800 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-500 leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ACCESSIBLE LIGHTBOX MODAL */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-stone-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl space-y-0"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-stone-900/80 text-white hover:bg-stone-900 transition-colors"
              aria-label="Close image viewer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Prev & Next Controls */}
            <button
              type="button"
              onClick={() =>
                setLightboxIndex((prev) =>
                  prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : null
                )
              }
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full bg-white/80 hover:bg-white text-stone-900 shadow-md transition-colors"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() =>
                setLightboxIndex((prev) => (prev !== null ? (prev + 1) % filteredItems.length : null))
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full bg-white/80 hover:bg-white text-stone-900 shadow-md transition-colors"
              aria-label="Next project"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Main Image */}
            <div className="relative aspect-16/10 w-full overflow-hidden bg-stone-950 flex items-center justify-center">
              <img
                src={filteredItems[lightboxIndex].image}
                alt={filteredItems[lightboxIndex].title}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            {/* Details Footer */}
            <div className="p-6 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-stone-100">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                    {filteredItems[lightboxIndex].location}
                  </span>
                  <span className="text-stone-300">•</span>
                  <span className="text-xs font-semibold text-stone-500">
                    {filteredItems[lightboxIndex].type}
                  </span>
                </div>
                <h2 className="text-xl font-black text-stone-900">
                  {filteredItems[lightboxIndex].title}
                </h2>
                <p className="text-xs text-stone-600 max-w-xl">
                  {filteredItems[lightboxIndex].description}
                </p>
              </div>

              <Link
                href={`/book`}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-sm transition-colors shrink-0 flex items-center gap-1.5"
              >
                <span>Book This Trade</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
