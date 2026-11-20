'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Phone, Menu, X, ChevronDown, ArrowRight } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Services', href: '/services' },
  { label: 'Bundles', href: '/bundles' },
  { label: 'Portal', href: '/portal' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
  { label: 'Book Now', href: '/book' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Trap focus / close on outside click
  useEffect(() => {
    if (!mobileOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [mobileOpen]);

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      {/* Main navbar */}
      <header
        className={`glass-nav sticky top-0 z-50 transition-shadow duration-200 ${scrolled ? 'shadow-md' : ''}`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group select-none">
            <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-amber-500 group-hover:bg-amber-600 transition-colors shadow-sm">
              <Home className="w-5 h-5 text-white" strokeWidth={2.2} />
            </span>
            <span className="text-xl font-bold tracking-tight leading-none">
              <span className="text-stone-900">House</span>
              <span className="text-amber-600">Hero</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ label, href }) => {
              const active = pathname === href || pathname.startsWith(href + '/');
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`animated-underline px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                      active
                        ? 'text-amber-600 bg-amber-50'
                        : 'text-stone-700 hover:text-stone-900 hover:bg-stone-50'
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop right actions */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:+2349134204578"
              className="flex items-center gap-2 text-sm font-semibold text-stone-700 hover:text-amber-600 transition-colors px-2 py-2 rounded-lg hover:bg-amber-50"
            >
              <Phone className="w-4 h-4" />
              <span>+234 913 420 4578</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors shadow-sm"
            >
              Get a Quote
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-stone-700 hover:bg-stone-100 transition-colors"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </nav>
      </header>

      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[60] bg-stone-900/30 backdrop-blur-sm"
          aria-hidden="true"
        />
      )}

      {/* Mobile drawer panel */}
      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 z-[70] h-full w-72 bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-modal="true"
        role="dialog"
        aria-label="Navigation menu"
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100">
          <Link
            href="/"
            className="flex items-center gap-2"
            onClick={() => setMobileOpen(false)}
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500">
              <Home className="w-4 h-4 text-white" strokeWidth={2.2} />
            </span>
            <span className="text-lg font-bold">
              <span className="text-stone-900">House</span>
              <span className="text-amber-600">Hero</span>
            </span>
          </Link>
          <button
            type="button"
            className="flex items-center justify-center w-9 h-9 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors"
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer nav links */}
        <nav className="flex-1 overflow-y-auto px-4 py-5">
          <ul className="space-y-1">
            {NAV_LINKS.map(({ label, href }) => {
              const active = pathname === href || pathname.startsWith(href + '/');
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      active
                        ? 'bg-amber-50 text-amber-600'
                        : 'text-stone-700 hover:bg-stone-50 hover:text-stone-900'
                    }`}
                  >
                    {label}
                    <ChevronDown className="w-4 h-4 -rotate-90 opacity-40" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Drawer footer actions */}
        <div className="border-t border-stone-100 px-4 py-5 space-y-3">
          <a
            href="tel:+2349134204578"
            className="flex items-center gap-2.5 w-full px-4 py-3 rounded-xl bg-stone-50 hover:bg-stone-100 transition-colors text-stone-700 text-sm font-semibold"
          >
            <Phone className="w-4 h-4 text-amber-500" />
            +234 913 420 4578
          </a>
          <Link
            href="/contact"
            className="flex items-center justify-center gap-1.5 w-full bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold px-4 py-3 rounded-xl transition-colors shadow-sm"
            onClick={() => setMobileOpen(false)}
          >
            Get a Quote
            <ArrowRight className="w-4 h-4" />
          </Link>

          {/* Trust bar (mobile) */}
          <div className="text-center pt-1">
            <p className="text-xs text-stone-400 leading-relaxed">
              $2M Insured · 4.9★ Rated · Background-Checked
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
