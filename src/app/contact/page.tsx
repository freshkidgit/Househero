'use client';

import React, { useState } from 'react';
import {
  Phone,
  Mail,
  Clock,
  MapPin,
  CheckCircle2,
  Send,
  MessageCircle,
  ArrowRight,
  AlertCircle,
  RefreshCw
} from 'lucide-react';

const ALL_SERVICES = [
  'House & Deep Cleaning',
  'Carpet Cleaning',
  'Roof & Gutter Cleaning',
  'Snow Removal',
  'Pressure Washing & Soft-Wash',
  'Junk Removal & Hauling',
  'Dryer Vent Cleaning',
  'Lawn & Garden Cleanup',
  'HVAC Maintenance & Tune-Up',
  'Driveway & Walkway De-Icing',
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    services: [] as string[],
    address: '',
    message: '',
    honeypot: ''
  });

  const toggleService = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(data.error || 'Failed to submit inquiry.');
      }
    } catch {
      setErrorMessage('Network connection error. Please try again or reach out on WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3 animate-slide-up">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          Direct Customer Service
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight">
          Request a Quote &amp; Dispatch
        </h1>
        <p className="text-sm sm:text-base text-stone-600">
          Tell us about your home care project. We respond promptly with an upfront USD estimate and available arrival windows.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl space-y-6 border border-stone-200/90 shadow-sm">
          <div>
            <h2 className="text-xl font-bold text-stone-900">Send an Inquiry or Quote Request</h2>
            <p className="text-xs text-stone-500 mt-1">
              Directly routed to our central dispatch team. No obligations or hidden fees.
            </p>
          </div>

          {errorMessage && (
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-200 p-8 rounded-2xl text-center space-y-3">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-stone-900">Thank You, {formData.name || 'Valued Homeowner'}!</h3>
              <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
                Your request has been received by our dispatch team. A team supervisor will contact you via email or phone within 2 hours during active business hours.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', phone: '', services: [], address: '', message: '', honeypot: '' });
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs transition-colors"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              {/* Spam Honeypot */}
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. David Sterling"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-stone-50/60 border border-stone-200 rounded-xl p-3 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. (303) 555-0194"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-stone-50/60 border border-stone-200 rounded-xl p-3 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. david.sterling@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-stone-50/60 border border-stone-200 rounded-xl p-3 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Services You Are Interested In (Select all that apply)
                </label>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {ALL_SERVICES.map((s) => {
                    const active = formData.services.includes(s);
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => toggleService(s)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                          active
                            ? 'bg-amber-600 text-white border-amber-600 shadow-2xs'
                            : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-amber-300'
                        }`}
                      >
                        {active ? '✓ ' : '+ '}
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Property Address &amp; ZIP</label>
                <input
                  type="text"
                  placeholder="e.g. 1482 Willow Creek Drive, Denver CO 80206"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-stone-50/60 border border-stone-200 rounded-xl p-3 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Message or Project Notes *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe your home size, square footage, specific issue, or preferred service timing..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-stone-50/60 border border-stone-200 rounded-xl p-3 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl font-bold text-white bg-amber-500 hover:bg-amber-600 transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    <span>Sending Inquiry...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit to Dispatch Desk</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Direct Channels & Offices */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 sm:p-7 rounded-3xl space-y-5 border border-stone-200/90 shadow-sm">
            <h3 className="font-extrabold text-stone-900 text-base">
              Instant Contact Channels
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Prefer direct messaging? Our dispatch team is available via Phone, WhatsApp, and Telegram.
            </p>

            <div className="space-y-3">
              {/* Phone */}
              <a
                href="tel:+2349134204578"
                className="flex items-center justify-between p-3.5 rounded-xl bg-stone-50 hover:bg-stone-100 border border-stone-200 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700">
                    <Phone className="w-4 h-4" />
                  </span>
                  <div>
                    <div className="text-xs font-bold text-stone-900">Direct Phone Support</div>
                    <div className="text-xs text-stone-600">+234 913 420 4578</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-amber-600 transition-colors" />
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/2349134204578"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-xl bg-emerald-50 hover:bg-emerald-100/70 border border-emerald-200 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                    <MessageCircle className="w-4 h-4" />
                  </span>
                  <div>
                    <div className="text-xs font-bold text-emerald-950">WhatsApp Desk</div>
                    <div className="text-xs text-emerald-700">+234 913 420 4578</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-emerald-600 group-hover:translate-x-0.5 transition-transform" />
              </a>

              {/* Telegram */}
              <a
                href="https://t.me/househerocare"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-xl bg-amber-50 hover:bg-amber-100/70 border border-amber-200 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-lg bg-amber-600 text-white flex items-center justify-center">
                    <Send className="w-4 h-4 text-white" />
                  </span>
                  <div>
                    <div className="text-xs font-bold text-stone-900">Telegram Channel</div>
                    <div className="text-xs text-stone-600">@househerocare</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-amber-600 group-hover:translate-x-0.5 transition-transform" />
              </a>

              {/* Email */}
              <a
                href="mailto:househero.dispatch@gmail.com"
                className="flex items-center justify-between p-3.5 rounded-xl bg-stone-50 hover:bg-stone-100 border border-stone-200 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-lg bg-stone-200 text-stone-700 flex items-center justify-center">
                    <Mail className="w-4 h-4" />
                  </span>
                  <div>
                    <div className="text-xs font-bold text-stone-900">Email Dispatch</div>
                    <div className="text-xs text-stone-600">househero.dispatch@gmail.com</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-amber-600 transition-colors" />
              </a>
            </div>
          </div>

          {/* Operating Hours & Hub */}
          <div className="bg-white p-6 rounded-3xl space-y-4 text-xs border border-stone-200/90 shadow-sm">
            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-stone-900">Support Hours</div>
                <div className="text-stone-600">Monday – Saturday: 7:00 AM – 7:00 PM</div>
                <div className="text-stone-500 text-[11px] mt-0.5">Prompt responses within 2 hours during active business hours</div>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-3 border-t border-stone-100">
              <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-stone-900">Regional Dispatch Center</div>
                <div className="text-stone-600">
                  HouseHero Property Care<br />
                  Denver Metro Operations Hub<br />
                  Serving Denver, Boulder, Littleton, Lakewood &amp; Metro Areas
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
