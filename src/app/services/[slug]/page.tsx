import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Clock,
  ArrowRight,
  Phone,
  CheckCircle2,
  CalendarCheck,
  Star,
  Check
} from 'lucide-react';
import { SERVICES } from '@/data/services';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';

export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="w-full">
      {/* =========================================================================
          HERO SECTION WITH FUNCTIONAL ESTIMATOR & HIGH-RES PHOTOGRAPHY
      ========================================================================= */}
      <section className="relative pt-6 pb-12 lg:pt-12 lg:pb-20 overflow-hidden border-b border-amber-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-900 text-xs font-semibold tracking-wide uppercase">
                <span>{service.category.toUpperCase()} CARE</span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-stone-900 leading-tight">
                {service.title}
              </h1>

              <p className="text-base sm:text-lg text-stone-600 max-w-xl font-normal leading-relaxed">
                {service.fullDesc}
              </p>

              {/* Functional Hero Booking & Estimator Widget */}
              <div className="p-5 rounded-2xl bg-white/90 backdrop-blur-xl border border-amber-200/80 shadow-lg shadow-amber-500/5 max-w-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-stone-500 uppercase tracking-wider block font-semibold">
                      Starting USD Price
                    </span>
                    <div className="text-2xl font-black text-stone-900">
                      ${service.startingPrice}{' '}
                      <span className="text-xs font-normal text-stone-500">
                        USD / {service.priceUnit}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-stone-600 bg-stone-100 px-3 py-1.5 rounded-lg">
                    <Clock className="w-4 h-4 text-stone-500" />
                    <span>{service.avgDuration}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100 flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/book"
                    className="flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs shadow-md shadow-amber-500/20 transition-all text-center flex items-center justify-center gap-1.5 pulse-ring"
                  >
                    <span>Instant Book (Multi-Service)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <a
                    href="tel:+2349134204578"
                    className="py-3 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-600" />
                    <span>Call +234 913 420 4578</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Photographic Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-amber-500/10 border border-white/80 aspect-4/3 sm:aspect-5/4">
                <img
                  src={service.afterImage}
                  alt={`${service.title} project completed by House Hero`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/90 backdrop-blur-xl border border-white/90 shadow-lg text-stone-800">
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-stone-900 block text-sm">{service.caseStudyTitle || service.title}</span>
                      <span className="text-stone-500 text-[11px]">Actual Project Cost: ${service.caseStudyCost || service.startingPrice} USD</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 font-bold text-[10px] border border-emerald-200">
                      Completed
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          WHAT'S INCLUDED & EQUIPMENT
      ========================================================================= */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="bg-white border border-stone-200/80 rounded-2xl p-6 sm:p-10 shadow-xs space-y-6">
          <div>
            <h2 className="text-2xl font-black text-stone-900 tracking-tight">
              Standard Operating Checklist
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Every appointment includes strict adherence to our standard quality protocol.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {service.includedFeatures.map((feat, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 flex items-start gap-3 text-xs"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="font-medium text-stone-800">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Process Steps */}
        <div className="space-y-6">
          <h2 className="text-2xl font-black text-stone-900 tracking-tight">
            Our 4-Step Execution Process
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.processSteps.map((s) => (
              <div
                key={s.step}
                className="bg-white border border-stone-200/80 rounded-2xl p-6 shadow-xs relative"
              >
                <div className="w-8 h-8 rounded-lg bg-stone-900 text-white font-bold text-xs flex items-center justify-center mb-4">
                  0{s.step}
                </div>
                <h3 className="font-bold text-sm text-stone-900 mb-1">
                  {s.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Before / After Section */}
        {service.beforeImage && service.afterImage && (
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-stone-900 tracking-tight">
              Real Project Transformation
            </h2>
            <div className="max-w-4xl mx-auto">
              <BeforeAfterSlider
                beforeImage={service.beforeImage}
                afterImage={service.afterImage}
                beforeLabel="INITIAL CONDITION"
                afterLabel="COMPLETED WORK"
              />
            </div>
          </div>
        )}

        {/* FAQs */}
        <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-6 sm:p-10 space-y-6">
          <h2 className="text-2xl font-black text-stone-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <div className="divide-y divide-stone-200">
            {service.faqs.map((faq, idx) => (
              <div key={idx} className="py-4 space-y-1">
                <h4 className="font-bold text-sm text-stone-900">{faq.question}</h4>
                <p className="text-xs text-stone-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
