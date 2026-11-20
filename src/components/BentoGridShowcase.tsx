'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  Shield,
  Layers,
  Home,
  Droplets,
  Snowflake,
  Wrench,
  Flame,
  CheckCheck,
  TrendingUp,
  Eye,
  Activity,
  Fan,
  Wind,
  Gauge,
  ChevronDown,
  ChevronUp,
  ShieldCheck
} from 'lucide-react';
import SpotlightCard from './SpotlightCard';
import InteractiveComparison from './InteractiveComparison';
import InteractiveQuickBooker from './InteractiveQuickBooker';

export default function BentoGridShowcase() {
  const [activePsi, setActivePsi] = useState<number>(3200);
  const [showCleaningChecklist, setShowCleaningChecklist] = useState<boolean>(false);
  const [activeHvacTab, setActiveHvacTab] = useState<'airflow' | 'electrical' | 'coils'>('airflow');
  const [snowMode, setSnowMode] = useState<'clearing' | 'salting'>('clearing');
  const [showGutterChecklist, setShowGutterChecklist] = useState<boolean>(false);

  return (
    <section className="space-y-12">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Professional Care &amp; Dedicated Trades
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight mt-2">
            See the difference a <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">proper clean makes.</span>
          </h2>
          <p className="text-sm sm:text-base text-stone-600 mt-1 max-w-xl leading-relaxed">
            From detailed interior sanitization to hot water extraction, exterior soft-washing, and winter driveway clearing — explore how each service is handled down to the details.
          </p>
        </div>

        <Link
          href="/book"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs shadow-md transition-all self-start md:self-end"
        >
          <span>Schedule Multi-Service Visit</span>
          <ArrowRight className="w-4 h-4 text-amber-400" />
        </Link>
      </div>

      {/* 1. VERIFIED SERVICE HIGHLIGHTS MARQUEE */}
      <div className="relative overflow-hidden py-3 rounded-2xl bg-stone-100/70 border border-stone-200/80">
        <div className="animate-marquee-left flex items-center gap-4 whitespace-nowrap">
          {[
            { tag: 'SERVICE ROUTE', title: 'Pressure Washing & Pavers', city: 'Denver Metro', img: '/images/pressure-washing.jpg', price: '$140' },
            { tag: 'SERVICE ROUTE', title: 'Carpet Hot Water Extraction', city: 'Boulder Corridor', img: '/images/carpet-cleaning.jpg', price: '$129' },
            { tag: 'SERVICE ROUTE', title: 'House & Deep Detailing', city: 'Highlands Ranch', img: '/images/house-cleaning.jpg', price: '$120' },
            { tag: 'SERVICE ROUTE', title: 'Driveway Snow Clearance', city: 'Lakewood & Golden', img: '/images/snow-removal.jpg', price: '$65' },
            { tag: 'SERVICE ROUTE', title: 'Roofline & Gutter Flush', city: 'Centennial', img: '/images/gutter-cleaning.jpg', price: '$135' },
            { tag: 'SERVICE ROUTE', title: 'HVAC Seasonal Tune-Up', city: 'Littleton Area', img: '/images/hvac-maintenance.jpg', price: '$115' },
            // Repeat for seamless loop
            { tag: 'SERVICE ROUTE', title: 'Pressure Washing & Pavers', city: 'Denver Metro', img: '/images/pressure-washing.jpg', price: '$140' },
            { tag: 'SERVICE ROUTE', title: 'Carpet Hot Water Extraction', city: 'Boulder Corridor', img: '/images/carpet-cleaning.jpg', price: '$129' },
            { tag: 'SERVICE ROUTE', title: 'House & Deep Detailing', city: 'Highlands Ranch', img: '/images/house-cleaning.jpg', price: '$120' },
            { tag: 'SERVICE ROUTE', title: 'Driveway Snow Clearance', city: 'Lakewood & Golden', img: '/images/snow-removal.jpg', price: '$65' },
            { tag: 'SERVICE ROUTE', title: 'Roofline & Gutter Flush', city: 'Centennial', img: '/images/gutter-cleaning.jpg', price: '$135' },
            { tag: 'SERVICE ROUTE', title: 'HVAC Seasonal Tune-Up', city: 'Littleton Area', img: '/images/hvac-maintenance.jpg', price: '$115' }
          ].map((item, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-white border border-stone-200/80 shadow-2xs text-xs"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-8 h-8 rounded-lg object-cover border border-amber-200"
              />
              <div>
                <div className="font-extrabold text-stone-900">{item.title}</div>
                <div className="text-[10px] text-stone-500 font-medium">
                  {item.city} · From <strong className="text-amber-700">{item.price}</strong>
                </div>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
            </div>
          ))}
        </div>
      </div>

      {/* 2. ASYMMETRIC BENTO GRID WITH PURPOSEFUL MICROINTERACTIONS */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">

        {/* CARD A: 7-COL WIDE — RESIDENTIAL HOUSE CLEANING WITH CHECKLIST REVEAL */}
        <div className="md:col-span-7">
          <SpotlightCard
            enableTilt={false}
            className="h-full bg-white rounded-3xl border border-stone-200/90 shadow-sm flex flex-col justify-between overflow-hidden"
          >
            <div className="relative h-64 sm:h-72 w-full overflow-hidden">
              <img
                src="/images/house-cleaning.jpg"
                alt="House cleaning technician cleaning kitchen"
                className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/25 to-transparent" />

              <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-amber-600 text-white text-[11px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Detailed Home Care
                </span>
                <span className="px-3 py-1 rounded-full bg-stone-900/80 backdrop-blur-md text-amber-200 text-[11px] font-semibold">
                  64-Point Inspection Protocol
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[11px] uppercase tracking-wider text-amber-300 font-bold block">
                  A thorough clean, down to the details
                </span>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight mt-0.5">
                  House &amp; Deep Interior Detailing
                </h3>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Our bonded cleaning technicians clean baseboards, interior appliances, bathroom grout, and deploy HEPA multi-stage vacuums safe for pets and children.
              </p>

              {/* Interactive Progressive Checklist Expander */}
              <div className="rounded-2xl border border-amber-200/80 bg-amber-50/50 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setShowCleaningChecklist(!showCleaningChecklist)}
                  className="w-full p-3.5 text-left flex items-center justify-between text-xs font-bold text-stone-900 hover:bg-amber-100/50 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-700" />
                    <span>Explore 64-Point Room-by-Room Checklist</span>
                  </span>
                  {showCleaningChecklist ? <ChevronUp className="w-4 h-4 text-stone-500" /> : <ChevronDown className="w-4 h-4 text-stone-500" />}
                </button>

                {showCleaningChecklist && (
                  <div className="p-4 pt-1 border-t border-amber-200/60 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-stone-700 animate-slide-up">
                    <div className="space-y-1">
                      <strong className="text-stone-900 block font-bold">Kitchen:</strong>
                      <div>• Stovetop &amp; backsplash degreasing</div>
                      <div>• Exterior of all appliances sanitized</div>
                      <div>• Countertop &amp; waterfall edge polish</div>
                      <div>• Cabinet faces &amp; handles wiped</div>
                    </div>
                    <div className="space-y-1">
                      <strong className="text-stone-900 block font-bold">Bathrooms &amp; Living:</strong>
                      <div>• Tile grout scrubbed &amp; descaled</div>
                      <div>• Mirrors &amp; chrome fixtures polished</div>
                      <div>• Baseboards &amp; door casings detailed</div>
                      <div>• HEPA filtration vacuuming &amp; mopping</div>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase text-stone-400 font-bold block">Starting at</span>
                  <div className="text-2xl font-black text-stone-900 font-mono">$120 <span className="text-xs font-normal text-stone-500">USD</span></div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href="/services/house-deep-cleaning"
                    className="px-4 py-2 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs font-bold transition-colors"
                  >
                    Details
                  </Link>
                  <Link
                    href="/book"
                    className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors shadow-xs"
                  >
                    Select Service
                  </Link>
                </div>
              </div>
            </div>
          </SpotlightCard>
        </div>

        {/* CARD B: 5-COL — PRESSURE WASHING WITH INTERACTIVE PSI CALIBRATOR */}
        <div className="md:col-span-5">
          <SpotlightCard
            enableTilt={false}
            className="h-full bg-white rounded-3xl border border-stone-200/90 shadow-sm flex flex-col justify-between overflow-hidden"
          >
            <div className="relative h-56 w-full overflow-hidden">
              <img
                src="/images/pressure-washing.jpg"
                alt="Pressure washing technician spraying driveway"
                className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent" />

              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-blue-700 text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                <Droplets className="w-3.5 h-3.5" />
                <span>Adjustable Pressure Jet</span>
              </div>

              <div className="absolute bottom-3 left-3 text-white">
                <span className="text-[10px] uppercase text-amber-300 font-bold block">Exterior Restoration</span>
                <h3 className="text-lg font-black tracking-tight">Pressure &amp; Soft-Washing</h3>
              </div>
            </div>

            <div className="p-5 space-y-4">
              <p className="text-xs text-stone-600 leading-relaxed">
                We calibrate water pressure precisely to your surface type to safely clear moss, oil, and grime without damaging siding or sealants.
              </p>

              {/* Dynamic PSI Surface Calibrator */}
              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-stone-800 flex items-center gap-1">
                    <Gauge className="w-3.5 h-3.5 text-amber-600" />
                    <span>Surface Pressure Setting:</span>
                  </span>
                  <span className="font-black font-mono text-stone-900 bg-white px-2 py-0.5 rounded-md border border-stone-200">
                    {activePsi} PSI
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1.5 text-center text-[10px] font-bold">
                  <button
                    type="button"
                    onClick={() => setActivePsi(350)}
                    className={`py-1.5 rounded-lg transition-colors cursor-pointer ${
                      activePsi === 350 ? 'bg-amber-600 text-white' : 'bg-white text-stone-600 border border-stone-200'
                    }`}
                  >
                    350 Soft (Siding)
                  </button>
                  <button
                    type="button"
                    onClick={() => setActivePsi(2200)}
                    className={`py-1.5 rounded-lg transition-colors cursor-pointer ${
                      activePsi === 2200 ? 'bg-amber-600 text-white' : 'bg-white text-stone-600 border border-stone-200'
                    }`}
                  >
                    2.2K Deck / Wood
                  </button>
                  <button
                    type="button"
                    onClick={() => setActivePsi(4000)}
                    className={`py-1.5 rounded-lg transition-colors cursor-pointer ${
                      activePsi === 4000 ? 'bg-amber-600 text-white' : 'bg-white text-stone-600 border border-stone-200'
                    }`}
                  >
                    4K Paver / Driveway
                  </button>
                </div>
              </div>

              <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase text-stone-400 font-bold block">Starting at</span>
                  <div className="text-xl font-black text-stone-900 font-mono">$140 <span className="text-xs font-normal text-stone-500">USD</span></div>
                </div>
                <Link
                  href="/book"
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors shadow-xs"
                >
                  Select Service
                </Link>
              </div>
            </div>
          </SpotlightCard>
        </div>

        {/* CARD C: 4-COL — CARPET EXTRACTION */}
        <div className="md:col-span-4">
          <SpotlightCard
            enableTilt={false}
            className="h-full bg-white rounded-3xl border border-stone-200/90 shadow-sm flex flex-col justify-between overflow-hidden"
          >
            <div className="relative h-48 w-full overflow-hidden">
              <img
                src="/images/carpet-cleaning.jpg"
                alt="Carpet cleaning technician operating extraction wand"
                className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent" />

              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-amber-600 text-white text-[10px] font-bold uppercase flex items-center gap-1 shadow-sm">
                <Flame className="w-3.5 h-3.5" />
                <span>220°F Thermal Rinse</span>
              </div>

              <div className="absolute bottom-3 left-3 text-white">
                <span className="text-[10px] uppercase text-amber-300 font-bold block">Deep Fiber Clean</span>
                <h3 className="text-base font-black tracking-tight">Carpet &amp; Rug Extraction</h3>
              </div>
            </div>

            <div className="p-5 space-y-3">
              <p className="text-xs text-stone-600 leading-relaxed">
                Commercial hot-water extraction extracts deep pet odors, allergens, and traffic stains with rapid 2 to 4 hour drying times.
              </p>

              <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase text-stone-400 font-bold block">Starting at</span>
                  <div className="text-lg font-black text-stone-900 font-mono">$129 <span className="text-xs font-normal text-stone-500">USD</span></div>
                </div>
                <Link
                  href="/book"
                  className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors shadow-xs"
                >
                  Select Service
                </Link>
              </div>
            </div>
          </SpotlightCard>
        </div>

        {/* CARD D: 4-COL — ROOF & GUTTER CLEANING */}
        <div className="md:col-span-4">
          <SpotlightCard
            enableTilt={false}
            className="h-full bg-white rounded-3xl border border-stone-200/90 shadow-sm flex flex-col justify-between overflow-hidden"
          >
            <div className="relative h-48 w-full overflow-hidden">
              <img
                src="/images/gutter-cleaning.jpg"
                alt="Technician on roof clearing gutters"
                className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent" />

              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-stone-900/80 backdrop-blur-md text-amber-200 text-[10px] font-bold flex items-center gap-1">
                <Eye className="w-3 h-3" />
                <span>Digital Photo Audit</span>
              </div>

              <div className="absolute bottom-3 left-3 text-white">
                <span className="text-[10px] uppercase text-amber-300 font-bold block">Roofline Drainage</span>
                <h3 className="text-base font-black tracking-tight">Roof &amp; Gutter Cleaning</h3>
              </div>
            </div>

            <div className="p-5 space-y-3">
              <p className="text-xs text-stone-600 leading-relaxed">
                Hand scoop of all debris, downspout pressure flushing, and before-and-after photo verification to protect your roof eaves.
              </p>

              <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase text-stone-400 font-bold block">Starting at</span>
                  <div className="text-lg font-black text-stone-900 font-mono">$135 <span className="text-xs font-normal text-stone-500">USD</span></div>
                </div>
                <Link
                  href="/book"
                  className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors shadow-xs"
                >
                  Select Service
                </Link>
              </div>
            </div>
          </SpotlightCard>
        </div>

        {/* CARD E: 4-COL — HVAC MAINTENANCE WITH ILLUSTRATIVE DIAGNOSTIC TABS */}
        <div className="md:col-span-4">
          <SpotlightCard
            enableTilt={false}
            className="h-full bg-white rounded-3xl border border-stone-200/90 shadow-sm flex flex-col justify-between overflow-hidden"
          >
            <div className="relative h-48 w-full overflow-hidden">
              <img
                src="/images/hvac-maintenance.jpg"
                alt="HVAC technician inspecting condenser unit with test gauges"
                className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent" />

              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-emerald-700 text-white text-[10px] font-bold uppercase flex items-center gap-1.5 shadow-sm">
                <Fan className="w-3.5 h-3.5" />
                <span>21-Point Safety Check</span>
              </div>

              <div className="absolute bottom-3 left-3 text-white">
                <span className="text-[10px] uppercase text-amber-300 font-bold block">Home Systems</span>
                <h3 className="text-base font-black tracking-tight">HVAC Seasonal Tune-Up</h3>
              </div>
            </div>

            <div className="p-5 space-y-3">
              {/* Illustrative Technical Inspection Tab */}
              <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1.5">
                <div className="flex items-center gap-1 text-[10px] font-bold text-stone-600">
                  <button
                    type="button"
                    onClick={() => setActiveHvacTab('airflow')}
                    className={`px-2 py-1 rounded ${activeHvacTab === 'airflow' ? 'bg-amber-600 text-white' : 'hover:bg-stone-200/60'}`}
                  >
                    Airflow
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveHvacTab('electrical')}
                    className={`px-2 py-1 rounded ${activeHvacTab === 'electrical' ? 'bg-amber-600 text-white' : 'hover:bg-stone-200/60'}`}
                  >
                    Electrical
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveHvacTab('coils')}
                    className={`px-2 py-1 rounded ${activeHvacTab === 'coils' ? 'bg-amber-600 text-white' : 'hover:bg-stone-200/60'}`}
                  >
                    Coils
                  </button>
                </div>
                <div className="text-[11px] text-stone-600 font-medium">
                  {activeHvacTab === 'airflow' && '• Static air duct pressure & filter seal efficiency check'}
                  {activeHvacTab === 'electrical' && '• Capacitor microfarad amp draw & safety switch test'}
                  {activeHvacTab === 'coils' && '• Condenser outdoor coil foam rinse & refrigerant subcool check'}
                </div>
              </div>

              <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase text-stone-400 font-bold block">Starting at</span>
                  <div className="text-lg font-black text-stone-900 font-mono">$115 <span className="text-xs font-normal text-stone-500">USD</span></div>
                </div>
                <Link
                  href="/book"
                  className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors shadow-xs"
                >
                  Select Service
                </Link>
              </div>
            </div>
          </SpotlightCard>
        </div>

        {/* CARD F: FULL 12-COL WIDE — SNOW REMOVAL WITH MODE PREVIEW */}
        <div className="md:col-span-12">
          <SpotlightCard
            enableTilt={false}
            className="bg-white rounded-3xl border border-stone-200/90 shadow-sm flex flex-col md:flex-row items-center justify-between overflow-hidden"
          >
            <div className="relative h-64 md:h-auto md:w-5/12 w-full self-stretch overflow-hidden">
              <img
                src="/images/snow-removal.jpg"
                alt="Snow removal technician clearing residential driveway"
                className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-stone-950/80 via-transparent to-transparent" />

              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-blue-700 text-white text-[11px] font-bold uppercase flex items-center gap-1.5 shadow-sm">
                  <Snowflake className="w-3.5 h-3.5" />
                  <span>2&quot; Snow Accumulation Trigger</span>
                </span>
                <span className="px-3 py-1 rounded-full bg-stone-900/80 text-amber-200 text-[11px] font-bold">
                  Rubber Poly Edge
                </span>
              </div>
            </div>

            <div className="p-6 md:p-8 md:w-7/12 w-full space-y-4">
              <span className="text-xs uppercase font-extrabold text-amber-700 tracking-wider">
                Winter Storm &amp; Morning Commute Defense
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
                Prompt Driveway Plowing &amp; Walkway Clearing
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                When winter storms hit, our crews clear driveways and entry steps before your morning departure. Rubber-edged plows and snow blowers protect stone pavers and stamped concrete.
              </p>

              {/* Mode Toggle */}
              <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-center justify-between gap-3 text-xs">
                <span className="font-bold text-stone-700">Clearing Protocol:</span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setSnowMode('clearing')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                      snowMode === 'clearing' ? 'bg-amber-600 text-white' : 'bg-white text-stone-600 border border-stone-200'
                    }`}
                  >
                    Driveway Clear
                  </button>
                  <button
                    type="button"
                    onClick={() => setSnowMode('salting')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                      snowMode === 'salting' ? 'bg-amber-600 text-white' : 'bg-white text-stone-600 border border-stone-200'
                    }`}
                  >
                    + Pet-Safe Salt Treatment
                  </button>
                </div>
              </div>

              <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase text-stone-400 font-bold block">Starting at</span>
                  <div className="text-2xl font-black text-stone-900 font-mono">$65 <span className="text-xs font-normal text-stone-500">USD / Push</span></div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href="/services/snow-removal"
                    className="px-4 py-2.5 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs font-bold transition-colors"
                  >
                    Service Details
                  </Link>
                  <Link
                    href="/book"
                    className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors shadow-xs"
                  >
                    Schedule Snow Visit
                  </Link>
                </div>
              </div>
            </div>
          </SpotlightCard>
        </div>

      </div>

      {/* 3. INTERACTIVE BEFORE / AFTER PATIO COMPARISON SLIDER */}
      <div className="pt-4">
        <InteractiveComparison
          title="See the difference a proper clean makes"
          subtitle="Slide the handle horizontally to view the high-temperature surface restoration on this residential patio."
          beforeImage="/images/before-patio.jpg"
          afterImage="/images/after-patio.jpg"
          beforeLabel="Before Treatment"
          afterLabel="After House Hero Care"
        />
      </div>

      {/* 4. MULTI-SERVICE QUICK BOOKER */}
      <div className="pt-2">
        <InteractiveQuickBooker />
      </div>
    </section>
  );
}
