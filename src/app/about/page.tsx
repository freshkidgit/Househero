'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Shield,
  Star,
  CheckCircle2,
  Users,
  Award,
  HeartHandshake,
  Phone,
  ArrowRight,
  FileText
} from 'lucide-react';

export default function AboutPage() {
  const [activePillar, setActivePillar] = useState<'insurance' | 'vetting' | 'guarantee'>('insurance');

  return (
    <div className="w-full">
      {/* =========================================================================
          HERO SECTION WITH FUNCTIONAL CREDENTIAL EXPLORER & TEAM PHOTOGRAPHY
      ========================================================================= */}
      <section className="relative pt-6 pb-12 lg:pt-12 lg:pb-20 overflow-hidden border-b border-amber-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-900 text-xs font-semibold tracking-wide uppercase">
                <span>The House Hero Standard</span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-stone-900 leading-tight">
                Built on Reliability,{' '}
                <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent">
                  Vetted Crews &amp; Integrity.
                </span>
              </h1>

              <p className="text-base text-stone-600 max-w-xl font-normal leading-relaxed">
                Founded to eliminate the frustration of erratic subcontractors and hidden fees. Standardized property maintenance backed by $2,000,000 general liability and transparent USD billing.
              </p>

              {/* Functional Hero Interactive Credential Explorer */}
              <div className="p-5 rounded-2xl bg-white/90 backdrop-blur-xl border border-amber-200/80 shadow-lg shadow-amber-500/5 max-w-xl space-y-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => setActivePillar('insurance')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      activePillar === 'insurance'
                        ? 'bg-stone-900 text-white'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    $2M Liability Policy
                  </button>
                  <button
                    onClick={() => setActivePillar('vetting')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      activePillar === 'vetting'
                        ? 'bg-stone-900 text-white'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    100% W-2 Vetting
                  </button>
                  <button
                    onClick={() => setActivePillar('guarantee')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      activePillar === 'guarantee'
                        ? 'bg-stone-900 text-white'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    24-Hour Guarantee
                  </button>
                </div>

                <div className="pt-2 border-t border-stone-100 text-xs">
                  {activePillar === 'insurance' && (
                    <div className="space-y-1.5 animate-in fade-in duration-200">
                      <div className="font-bold text-stone-900">Comprehensive $2,000,000 Aggregate Coverage</div>
                      <p className="text-stone-600 leading-relaxed">
                        Underwritten by Travelers Insurance. Covers property damage, equipment operation, and accidental liability on every job site with zero customer deductible.
                      </p>
                      <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block mt-1">
                        ✓ Verified Policy Active • COI Issued for HOAs on Request
                      </span>
                    </div>
                  )}

                  {activePillar === 'vetting' && (
                    <div className="space-y-1.5 animate-in fade-in duration-200">
                      <div className="font-bold text-stone-900">7-Year Criminal Screening &amp; Drug Testing</div>
                      <p className="text-stone-600 leading-relaxed">
                        We never dispatch random gig workers. All staff are direct W-2 employees in branded company uniforms with GPS tracking and verified driver records.
                      </p>
                      <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block mt-1">
                        ✓ 100% Direct Employees • Zero Unvetted Contractors
                      </span>
                    </div>
                  )}

                  {activePillar === 'guarantee' && (
                    <div className="space-y-1.5 animate-in fade-in duration-200">
                      <div className="font-bold text-stone-900">Walkthrough Inspection &amp; Free Re-Service</div>
                      <p className="text-stone-600 leading-relaxed">
                        If any item does not meet your expectations, notify our dispatch desk within 24 hours. A supervisor will return to re-service the area at zero charge.
                      </p>
                      <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block mt-1">
                        ✓ 100% Satisfaction or Immediate Correction
                      </span>
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px]">
                  <span className="text-stone-500">Established 2018 • 2,400+ Homes Maintained</span>
                  <Link href="/services" className="font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1">
                    <span>Explore Services</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Architectural Image Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-amber-500/10 border border-white/80 aspect-4/3 sm:aspect-5/4">
                <img
                  src="/images/house-cleaning.jpg"
                  alt="Certified HouseHero property care team"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/90 backdrop-blur-xl border border-white/90 shadow-lg text-stone-800">
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-stone-900 block text-sm">Certified Field Crews</span>
                      <span className="text-stone-500 text-[11px]">OSHA compliant &amp; Green Seal certified</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 font-bold text-[10px] border border-emerald-200">
                      Vetted
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          FOUR PILLARS OF EXCELLENCE
      ========================================================================= */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
            How House Hero Sets the Industry Standard
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            Four commitments that separate our work from informal contractors.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Shield,
              title: '$2,000,000 Liability',
              desc: 'Every technician, vehicle, and property is backed by an industry-leading $2M aggregate policy. Peace of mind is non-negotiable.'
            },
            {
              icon: Users,
              title: '100% W-2 Vetted Staff',
              desc: 'Zero random subcontractors. Our field technicians undergo rigorous background checks, 7-year criminal screening, and continuous safety training.'
            },
            {
              icon: Award,
              title: 'Exact USD Upfront Rates',
              desc: 'No vague ranges or unexpected arrival surprises. What you see calculated in USD is what you pay upon completed satisfaction.'
            },
            {
              icon: HeartHandshake,
              title: '24-Hour Re-Clean Promise',
              desc: 'If any service area does not meet your exacting standards, notify us within 24 hours. A supervisor returns to re-service at zero cost.'
            }
          ].map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-stone-200/80 p-6 rounded-2xl shadow-xs space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/60 text-amber-600 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-stone-900">{pillar.title}</h3>
                <p className="text-xs text-stone-600 leading-relaxed">{pillar.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Environmental Commitment Card */}
        <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h3 className="text-2xl font-black text-stone-900">
              Pet-Safe &amp; Botanical Solutions by Default
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              We never cut corners with harsh caustic chemicals that threaten family pets, children, or landscaping. From botanical thyme-based interior disinfectants to concrete-safe magnesium chloride ice melt, our formulations protect the long-term value of your property.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-stone-900 hover:bg-amber-600 text-white font-bold text-xs transition-colors"
              >
                <span>Book Your Appointment</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="space-y-3 text-xs text-stone-700">
            <div className="p-4 rounded-xl bg-white border border-stone-200/80 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-stone-900 block">Green Seal Certified Solutions</span>
                <span className="text-stone-500">Non-toxic, zero-VOC formulas safe for delicate stone and hardwood finishes.</span>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-white border border-stone-200/80 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-stone-900 block">HEPA Filtration Vacuums</span>
                <span className="text-stone-500">Commercial ProTeam units capture 99.97% of particulates down to 0.3 microns.</span>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-white border border-stone-200/80 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-stone-900 block">Magnesium Chloride De-Icing</span>
                <span className="text-stone-500">Zero rock salt pitting. Gentle on concrete surfaces and pet paws.</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
