'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  DollarSign,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCheck,
  Info,
  Clock
} from 'lucide-react';
import { SERVICES } from '@/data/services';

export default function PricingPage() {
  const [selectedIds, setSelectedIds] = useState<string[]>([
    'house-deep-cleaning',
    'gutter-cleaning'
  ]);

  const toggle = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const selectedServices = useMemo(
    () => SERVICES.filter((s) => selectedIds.includes(s.id)),
    [selectedIds]
  );

  const subtotal = useMemo(
    () => selectedServices.reduce((sum, s) => sum + s.startingPrice, 0),
    [selectedServices]
  );

  const discount = useMemo(() => {
    if (selectedServices.length >= 3) return Math.round(subtotal * 0.15);
    if (selectedServices.length === 2) return Math.round(subtotal * 0.10);
    return 0;
  }, [selectedServices.length, subtotal]);

  const total = subtotal - discount;

  return (
    <div className="w-full pb-20 space-y-12">
      {/* Header */}
      <section className="pt-8 pb-12 lg:pt-14 lg:pb-16 bg-stone-50/60 border-b border-stone-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Transparent Pricing
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight">
            Upfront Rates in US Dollars
          </h1>
          <p className="text-sm sm:text-base text-stone-600 max-w-xl mx-auto leading-relaxed">
            No vague quotes, travel surcharges, or hidden fees. Review starting rates below or select multiple services to see automatic multi-service bundle savings.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* INTERACTIVE BUNDLE CALCULATOR STRIP */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/90 shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-900 text-xs font-bold uppercase tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Live Multi-Service Estimator</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-stone-900 mt-1">
                Customize Your Service Package
              </h2>
            </div>
            <div className="text-xs text-stone-500">
              Bundle 2 services for <strong className="text-stone-900">10% off</strong> · 3+ for <strong className="text-stone-900">15% off</strong>
            </div>
          </div>

          {/* Interactive Chips */}
          <div className="flex flex-wrap gap-2">
            {SERVICES.map((s) => {
              const active = selectedIds.includes(s.id);
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => toggle(s.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    active
                      ? 'bg-amber-600 border-amber-600 text-white shadow-xs'
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <span>{s.title}</span>
                  <span className={`ml-1.5 text-[11px] ${active ? 'text-amber-100' : 'text-stone-500'}`}>
                    (${s.startingPrice})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Result Row */}
          <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-stone-50/70 p-5 rounded-2xl">
            <div>
              <div className="text-xs text-stone-500 font-semibold uppercase">
                {selectedServices.length} {selectedServices.length === 1 ? 'Trade Selected' : 'Trades Selected'}
              </div>
              <div className="text-2xl sm:text-3xl font-black text-stone-900 mt-0.5 flex items-baseline gap-2">
                <span>${total}</span>
                {discount > 0 && <span className="text-sm text-stone-400 line-through">${subtotal}</span>}
                <span className="text-xs font-normal text-stone-500">USD Estimated Total</span>
              </div>
              {discount > 0 && (
                <div className="text-xs text-emerald-700 font-bold mt-0.5">
                  ✓ Includes ${discount} multi-service bundle discount
                </div>
              )}
            </div>

            <Link
              href="/book"
              className="px-6 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 self-stretch sm:self-center justify-center"
            >
              <span>Book This Combination</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </Link>
          </div>
        </div>

        {/* FULL RATE CARD TABLE */}
        <div className="bg-white rounded-3xl border border-stone-200/90 shadow-xs overflow-hidden space-y-0">
          <div className="p-6 border-b border-stone-100">
            <h2 className="text-lg font-black text-stone-900">Comprehensive Trade Rate Schedule</h2>
            <p className="text-xs text-stone-500 mt-0.5">
              All services include certified technician dispatch, professional machinery, eco-friendly supplies, and insurance coverage.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-stone-50/80 border-b border-stone-200 text-stone-500 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-5">Trade Service</th>
                  <th className="py-3 px-5">Starting Base Rate</th>
                  <th className="py-3 px-5">Price Unit / Baseline</th>
                  <th className="py-3 px-5">Average Duration</th>
                  <th className="py-3 px-5">What&apos;s Included</th>
                  <th className="py-3 px-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {SERVICES.map((s) => (
                  <tr key={s.id} className="hover:bg-amber-50/20 transition-colors">
                    <td className="py-4 px-5">
                      <div className="font-bold text-stone-900 text-sm">{s.title}</div>
                      <div className="text-[11px] text-stone-500 line-clamp-1">{s.shortDesc}</div>
                    </td>
                    <td className="py-4 px-5">
                      <div className="font-black text-base text-stone-900 font-mono">${s.startingPrice}</div>
                      <div className="text-[10px] text-stone-400">USD</div>
                    </td>
                    <td className="py-4 px-5 text-stone-600 font-medium">
                      {s.priceUnit}
                    </td>
                    <td className="py-4 px-5 text-stone-600">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-stone-400" />
                        <span>{s.avgDuration}</span>
                      </div>
                    </td>
                    <td className="py-4 px-5 text-stone-600 max-w-xs">
                      <div className="text-[11px] space-y-0.5">
                        {s.includedFeatures.slice(0, 2).map((feat, i) => (
                          <div key={i} className="line-clamp-1">• {feat}</div>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-5 text-right">
                      <Link
                        href={`/book`}
                        className="px-3.5 py-1.5 rounded-lg bg-amber-50 text-amber-900 hover:bg-amber-600 hover:text-white font-bold text-xs border border-amber-200 transition-colors inline-block"
                      >
                        Book Trade
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* POLICY FOOTNOTE */}
        <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200/80 text-xs text-stone-600 space-y-2">
          <div className="font-bold text-stone-900 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-amber-600" />
            <span>Honest Pricing Standards</span>
          </div>
          <p className="leading-relaxed">
            All prices are calculated authoritatively in US Dollars ($). We never collect or store credit card details on our website. You inspect the completed work with our technician supervisor before finalizing payment via cash, card on completion, or WhatsApp invoice.
          </p>
        </div>
      </div>
    </div>
  );
}
