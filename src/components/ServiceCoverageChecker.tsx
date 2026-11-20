'use client';

import React, { useState } from 'react';
import { MapPin, CheckCircle2, AlertCircle, ArrowRight, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { checkCoverage } from '@/lib/serviceAreas';

export default function ServiceCoverageChecker() {
  const [zipInput, setZipInput] = useState('');
  const [result, setResult] = useState<any | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!zipInput.trim()) return;
    setIsChecking(true);
    setTimeout(() => {
      const res = checkCoverage(zipInput.trim());
      setResult(res);
      setIsChecking(false);
    }, 250);
  };

  return (
    <div className="bg-stone-50 rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm max-w-4xl mx-auto space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-200/60">
        <div>
          <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider block">
            Direct Dispatch Coverage
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-stone-900 mt-0.5">
            Check Service Availability in Your Neighborhood
          </h3>
        </div>
        <div className="text-xs text-stone-500 font-medium">
          Active Hubs: Denver, Boulder, Littleton, Lakewood, Aurora &amp; Metro
        </div>
      </div>

      <form onSubmit={handleCheck} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <MapPin className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            maxLength={5}
            value={zipInput}
            onChange={(e) => {
              setZipInput(e.target.value);
              setResult(null);
            }}
            placeholder="Enter 5-digit postal ZIP code (e.g. 80203, 80302, 80120)..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 bg-white text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 font-medium"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isChecking || !zipInput}
          className="px-6 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs shadow-sm transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer shrink-0"
        >
          {isChecking ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-400" />
              <span>Verifying...</span>
            </>
          ) : (
            <>
              <span>Check Eligibility</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
            </>
          )}
        </button>
      </form>

      {/* Result feedback */}
      {result && (
        <div
          className={`p-4 rounded-2xl border text-xs leading-relaxed animate-slide-up flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
            result.covered
              ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
              : 'bg-amber-50 text-amber-900 border-amber-200'
          }`}
        >
          <div className="flex items-start gap-2.5">
            {result.covered ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            )}
            <div>
              <div className="font-bold">{result.message}</div>
              {result.covered && (
                <div className="text-[11px] text-emerald-700 mt-0.5">
                  Standard dispatch arrival within 24 to 48 hours. Multi-service bundles eligible for priority booking.
                </div>
              )}
            </div>
          </div>

          {result.covered && (
            <Link
              href={`/book`}
              className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shrink-0 transition-colors shadow-2xs self-start sm:self-center"
            >
              Schedule Service →
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
