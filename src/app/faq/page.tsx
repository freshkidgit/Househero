'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  ChevronDown,
  Phone,
  ArrowRight,
  HelpCircle,
  CheckCircle2
} from 'lucide-react';

interface FAQItem {
  category: 'billing' | 'weather' | 'prep' | 'guarantee';
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    category: 'billing',
    question: 'Are your prices guaranteed in USD with no surprise fees?',
    answer: 'Yes. Every quote generated on House Hero is 100% upfront in US Dollars ($). The price you see in your itemized breakdown includes technician labor, commercial equipment, fuel, and supplies. If on-site property conditions vary substantially, our crew verifies any change before touching a tool.'
  },
  {
    category: 'billing',
    question: 'When is payment collected?',
    answer: 'We believe in earning your trust. All standard residential jobs operate on a Pay Upon Completion policy, meaning $0 is charged today. You inspect the work first and then settle via cash, check, debit, or digital invoice. We never harvest or store raw credit card numbers on-site.'
  },
  {
    category: 'billing',
    question: 'How do multi-service bundle discounts work?',
    answer: 'Whenever you combine 2 services in your booking or master calculator, an automatic 10% discount applies across the entire order. Combine 3 or more services for an automatic 15% discount.'
  },
  {
    category: 'weather',
    question: 'How do snow removal and de-icing weather triggers work?',
    answer: 'Our winter storm dispatch system connects directly to NOAA Doppler radar. Snow removal kicks off automatically at 2.0 inches of accumulation. For driveway de-icing with the temperature trigger enabled, crews salt surfaces before temperatures drop below 32°F.'
  },
  {
    category: 'weather',
    question: 'What happens if severe rain delays exterior pressure washing or gutter cleaning?',
    answer: 'In the event of lightning or severe wind that makes ladder work hazardous, our dispatch supervisor will text and call you at least 2 hours in advance to reschedule to the next clear day with priority morning placement.'
  },
  {
    category: 'weather',
    question: 'Can I book a specific 3-hour arrival window?',
    answer: 'Yes. You choose between Morning (8–11 AM), Midday (11 AM–2 PM), or Afternoon (2–5 PM). Our crew sends an automated GPS text alert 30 minutes before pulling into your driveway.'
  },
  {
    category: 'prep',
    question: 'Do I need to be home during the service?',
    answer: 'No. Over 65% of our clients are away at work or errands. For exterior services (gutters, pressure wash, snow, lawn), we require unlocked side gates and active water spigots. For interior cleaning, clients supply a garage code or digital lockbox PIN.'
  },
  {
    category: 'prep',
    question: 'What should I do with my pets during house or carpet cleaning?',
    answer: 'We love pets! To keep dogs and cats stress-free during vacuuming and open-door periods, we recommend securing them in a designated room, backyard run, or kennel.'
  },
  {
    category: 'prep',
    question: 'Do I need to move heavy furniture before carpet cleaning?',
    answer: 'Our technicians will gladly slide light furniture (chairs, coffee tables, end tables) and place protective foil pads underneath. We request that heavy electronics, beds, and china cabinets remain stationary.'
  },
  {
    category: 'guarantee',
    question: 'What is your 24-Hour Re-Service Guarantee?',
    answer: 'If any portion of your completed service fails to meet our 64-point standards, simply contact us within 24 hours. A supervisor will return to re-clean, re-flush, or re-treat the area at zero cost to you.'
  },
  {
    category: 'guarantee',
    question: 'Are your technicians insured and bonded?',
    answer: 'Every House Hero technician is a direct employee covered by our $2,000,000 general liability policy and statutory workers’ compensation.'
  }
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const filtered = FAQS.filter((f) => {
    const matchesCat = activeCategory === 'all' || f.category === activeCategory;
    const matchesSearch =
      f.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="w-full">
      {/* =========================================================================
          HERO SECTION WITH FUNCTIONAL SEARCH & CONCIERGE PHOTOGRAPHY
      ========================================================================= */}
      <section className="relative pt-6 pb-12 lg:pt-12 lg:pb-20 overflow-hidden border-b border-amber-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-900 text-xs font-semibold tracking-wide uppercase">
                <span>Knowledge Base</span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-stone-900 leading-tight">
                Frequently Asked{' '}
                <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent">
                  Questions.
                </span>
              </h1>

              <p className="text-base text-stone-600 max-w-xl font-normal leading-relaxed">
                Everything you need to know about our USD pricing, weather dispatch policies, technician standards, and guarantees.
              </p>

              {/* Functional Hero Search & Category Switcher */}
              <div className="p-5 rounded-2xl bg-white/90 backdrop-blur-xl border border-amber-200/80 shadow-lg shadow-amber-500/5 max-w-xl space-y-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search questions by keyword (e.g. payment, pets, snow)..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm font-medium text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {[
                    { id: 'all', label: 'All FAQs' },
                    { id: 'billing', label: 'Pricing & Billing' },
                    { id: 'weather', label: 'Weather Dispatch' },
                    { id: 'prep', label: 'Client Prep' },
                    { id: 'guarantee', label: 'Guarantees' }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                        activeCategory === cat.id
                          ? 'bg-stone-900 text-white'
                          : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                  <span>Displaying {filtered.length} answered questions</span>
                  {searchTerm && (
                    <button onClick={() => setSearchTerm('')} className="text-amber-700 hover:underline font-bold">
                      Clear Search
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Right Architectural Image Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-amber-500/10 border border-white/80 aspect-4/3 sm:aspect-5/4">
                <img
                  src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85"
                  alt="Customer knowledge concierge"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/90 backdrop-blur-xl border border-white/90 shadow-lg text-stone-800">
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-stone-900 block text-sm">24/7 Concierge Hotline</span>
                      <span className="text-stone-500 text-[11px]">Direct answers from dispatch supervisors</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 font-bold text-[10px] border border-emerald-200">
                      Live
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          ACCORDION QUESTIONS LIST
      ========================================================================= */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white border border-stone-200/80 rounded-2xl p-6 sm:p-8 shadow-xs divide-y divide-stone-100">
          {filtered.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={idx} className="py-4">
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between text-left gap-4 font-bold text-sm sm:text-base text-stone-900 hover:text-amber-600 transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-stone-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-amber-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <p className="mt-2.5 text-xs sm:text-sm text-stone-600 leading-relaxed animate-in fade-in duration-150">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
