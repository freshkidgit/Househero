import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import PersistentMobileCTA from '@/components/PersistentMobileCTA';

export const metadata: Metadata = {
  title: 'House Hero | Professional Property Care',
  description:
    'House Hero delivers trusted residential and commercial property maintenance across the US — upfront pricing, background-checked technicians, 100% satisfaction guarantee.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#FFFDF9] text-stone-900 antialiased min-h-screen flex flex-col relative overflow-x-hidden selection:bg-amber-200 selection:text-stone-900">
        {/* Warm ambient background orbs */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
          <div className="orb-a absolute -top-32 -left-32 w-80 h-80 rounded-full bg-amber-200/40 blur-3xl" />
          <div className="orb-b absolute top-1/2 -right-40 w-96 h-96 rounded-full bg-orange-200/30 blur-3xl" />
          <div className="orb-a absolute -bottom-32 left-1/3 w-72 h-72 rounded-full bg-amber-100/50 blur-3xl" />
        </div>
        <AppProvider>
          <ScrollProgressBar />
          <div className="relative z-10 flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <PersistentMobileCTA />
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
