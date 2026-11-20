import Link from 'next/link';
import { Home, Phone, MessageCircle, Send, Mail } from 'lucide-react';

const SERVICES = [
  { label: 'Lawn & Landscaping', href: '/services' },
  { label: 'House Cleaning', href: '/services' },
  { label: 'Plumbing & Repairs', href: '/services' },
  { label: 'HVAC Maintenance', href: '/services' },
  { label: 'Painting & Touch-Ups', href: '/services' },
  { label: 'Gutter Cleaning', href: '/services' },
];

const QUICK_LINKS = [
  { label: 'Book Multi-Service', href: '/book' },
  { label: 'Customer Portal', href: '/portal' },
  { label: 'About Us', href: '/about' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact & Quotes', href: '/contact' },
  { label: 'Dispatch Admin', href: '/admin' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Service', href: '/terms-of-service' },
];

export default function Footer() {
  return (
    <footer className="bg-[#FFFDF9] border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">

          {/* Column 1 — Brand */}
          <div className="space-y-5">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group w-fit">
              <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-amber-500 group-hover:bg-amber-600 transition-colors shadow-sm">
                <Home className="w-5 h-5 text-white" strokeWidth={2.2} />
              </span>
              <span className="text-xl font-bold tracking-tight leading-none">
                <span className="text-stone-900">House</span>
                <span className="text-amber-600">Hero</span>
              </span>
            </Link>

            <p className="text-sm text-stone-500 leading-relaxed max-w-xs">
              Professional Property Care you can count on — upfront pricing, background-checked technicians, and a 100% satisfaction guarantee.
            </p>

            {/* Contact */}
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+2349134204578"
                  className="flex items-center gap-2.5 text-sm text-stone-700 hover:text-amber-600 transition-colors font-medium"
                >
                  <Phone className="w-4 h-4 text-stone-500 shrink-0" />
                  +234 913 420 4578
                </a>
              </li>
              <li>
                <a
                  href="mailto:dispatch@househero.com"
                  className="flex items-center gap-2.5 text-sm text-stone-700 hover:text-amber-600 transition-colors font-medium"
                >
                  <Mail className="w-4 h-4 text-stone-500 shrink-0" />
                  dispatch@househero.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/2349134204578"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-stone-700 hover:text-emerald-600 transition-colors font-medium"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  WhatsApp Us
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/househerocare"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-stone-700 hover:text-amber-600 transition-colors font-medium"
                >
                  <Send className="w-4 h-4 text-amber-600 shrink-0" />
                  @househerocare on Telegram
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2 — Services */}
          <div>
            <h3 className="text-sm font-semibold text-stone-900 uppercase tracking-widest mb-5">
              Services
            </h3>
            <ul className="space-y-3">
              {SERVICES.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-stone-500 hover:text-amber-600 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-stone-900 uppercase tracking-widest mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {QUICK_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-stone-500 hover:text-amber-600 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-stone-200 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-stone-400">
            © 2026 House Hero LLC. All rights reserved.
          </p>
          <p className="text-xs text-stone-400 text-center">
            Licensed, Bonded &amp; $2M Insured&nbsp;·&nbsp;All prices in USD
          </p>
        </div>
      </div>
    </footer>
  );
}
