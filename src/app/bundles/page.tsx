'use client';

import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Snowflake,
  Sun,
  Home
} from 'lucide-react';
import { SERVICES } from '@/data/services';

interface BundlePackage {
  id: string;
  name: string;
  badge: string;
  icon: any;
  description: string;
  includedServices: string[];
  regularPrice: number;
  bundlePrice: number;
  savings: number;
  accent: string;
}

const BUNDLE_PACKAGES: BundlePackage[] = [
  {
    id: 'winter-fortress',
    name: 'The Winter Storm Fortress Shield',
    badge: 'Popular for Winter Preparation',
    icon: Snowflake,
    description: 'Complete cold-weather defense for residential driveways, roofs, and heating systems before sub-zero temperatures hit.',
    includedServices: [
      'Driveway Snow Plowing (Priority Morning Dispatch)',
      'Front Entryway & Walkway De-Icing Treatment',
      'Roofline & Gutter Downspout Jetting',
      'HVAC Furnace Safety & Heat Exchanger Inspection'
    ],
    regularPrice: 370,
    bundlePrice: 314,
    savings: 56,
    accent: 'blue'
  },
  {
    id: 'spring-curb-appeal',
    name: 'Spring Exterior Revival Package',
    badge: 'Seasonal Refresh',
    icon: Sun,
    description: 'Transform exterior curb appeal after winter thaw with complete paver restoration, roof eave clearance, and grounds care.',
    includedServices: [
      '4,000 PSI High-Temperature Pressure Washing',
      'Lawn & Landscape Cleanup and Edge Detailing',
      'Roof & Gutter Hand Scooping & Rinse',
      'Walkway Surface Algae & Moss Removal'
    ],
    regularPrice: 405,
    bundlePrice: 344,
    savings: 61,
    accent: 'amber'
  },
  {
    id: 'total-interior-wellness',
    name: 'Total Interior Sanitization & Air Safety',
    badge: 'Comprehensive Deep Clean',
    icon: Home,
    description: 'All-inclusive deep sanitization targeting high-touch touchpoints, carpet fiber extraction, and dryer vent fire hazard removal.',
    includedServices: [
      '64-Point House Deep Cleaning Protocol',
      '220°F Hot Water Carpet Extraction',
      'Rotary Brush Dryer Vent Lint Cleanout',
      'Non-Toxic Botanical Sanitizing Spray'
    ],
    regularPrice: 368,
    bundlePrice: 312,
    savings: 56,
    accent: 'emerald'
  }
];

export default function BundlesPage() {
  return (
    <div className="w-full pb-20 space-y-12">
      {/* Header */}
      <section className="pt-8 pb-12 lg:pt-14 lg:pb-16 bg-stone-50/60 border-b border-stone-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Multi-Service Packages
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight">
            Curated Seasonal Care Bundles
          </h1>
          <p className="text-sm sm:text-base text-stone-600 max-w-xl mx-auto leading-relaxed">
            Save up to 15% automatically by scheduling complementary trade services together. Fully coordinated single-day dispatch with certified technicians.
          </p>
        </div>
      </section>

      {/* Packages Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BUNDLE_PACKAGES.map((pkg) => {
            const Icon = pkg.icon;
            return (
              <div
                key={pkg.id}
                className="bg-white rounded-3xl border border-stone-200/90 shadow-sm hover:shadow-md transition-all p-6 sm:p-8 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </span>
                    <span className="px-3 py-1 rounded-full bg-stone-100 text-stone-700 font-bold text-[10px] uppercase tracking-wide">
                      {pkg.badge}
                    </span>
                  </div>

                  <div>
                    <h2 className="text-xl font-black text-stone-900 tracking-tight">{pkg.name}</h2>
                    <p className="text-xs text-stone-500 mt-1 leading-relaxed">{pkg.description}</p>
                  </div>

                  {/* Included Services List */}
                  <div className="pt-2 border-t border-stone-100 space-y-2">
                    <span className="text-[11px] font-bold text-stone-700 uppercase tracking-wider block">
                      Services Included in Package:
                    </span>
                    <ul className="space-y-1.5 text-xs text-stone-600">
                      {pkg.includedServices.map((svc, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{svc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Price & Booking Action */}
                <div className="pt-4 border-t border-stone-100 space-y-4">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] text-stone-400 font-bold uppercase block">Package Price</span>
                      <div className="text-2xl font-black text-stone-900 font-mono flex items-baseline gap-2">
                        <span>${pkg.bundlePrice}</span>
                        <span className="text-xs text-stone-400 line-through font-normal">${pkg.regularPrice}</span>
                        <span className="text-xs text-stone-500 font-normal">USD</span>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                      Save ${pkg.savings}
                    </span>
                  </div>

                  <Link
                    href={`/book`}
                    className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs transition-colors shadow-sm flex items-center justify-center gap-2"
                  >
                    <span>Schedule This Package</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
