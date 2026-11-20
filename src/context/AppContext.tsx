'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SERVICES } from '@/data/services';

export interface BookingServiceItem {
  serviceId: string;
  serviceTitle: string;
  subtotal: number;
  config: any;
}

export interface CustomerDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  gateCode?: string;
  notes?: string;
}

export interface Booking {
  id: string; // e.g. "HH-2026-X8P2"
  services: BookingServiceItem[];
  customer: CustomerDetails;
  scheduledDate: string;
  timeWindow: string;
  paymentMethod: 'pay-upon-completion' | 'card-hold';
  subtotalUSD: number;
  discountUSD: number;
  totalUSD: number;
  status: 'Confirmed' | 'Crew Dispatched' | 'Completed' | 'Cancelled';
  createdAt: string;
  updatedAt?: string;
  rescheduledCount?: number;
}

export interface SavedQuote {
  id: string;
  services: BookingServiceItem[];
  subtotalUSD: number;
  discountUSD: number;
  totalUSD: number;
  zipCode: string;
  createdAt: string;
}

interface AppContextType {
  bookings: Booking[];
  quotes: SavedQuote[];
  basePrices: Record<string, number>;
  activeQuoteServices: { serviceId: string; config: any }[];
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt' | 'status'>) => Promise<Booking>;
  updateBookingStatus: (id: string, status: Booking['status']) => Promise<void>;
  rescheduleBooking: (id: string, newDate: string, newWindow?: string) => Promise<void>;
  cancelBooking: (id: string) => Promise<void>;
  saveQuote: (quote: Omit<SavedQuote, 'id' | 'createdAt'>) => Promise<SavedQuote>;
  updateBasePrice: (serviceId: string, newPrice: number) => void;
  resetBasePrices: () => void;
  setActiveQuoteServices: React.Dispatch<React.SetStateAction<{ serviceId: string; config: any }[]>>;
  addServiceToActiveQuote: (serviceId: string, config?: any) => void;
  removeServiceFromActiveQuote: (serviceId: string) => void;
  refreshAdminBookings: () => Promise<void>;
  setBookings: React.Dispatch<React.SetStateAction<Booking[]>>;
}

const DEFAULT_BASE_PRICES: Record<string, number> = {
  'house-deep-cleaning': 120,
  'carpet-cleaning': 129,
  'gutter-cleaning': 135,
  'snow-removal': 65,
  'pressure-washing': 140,
  'junk-removal': 89,
  'dryer-vent': 119,
  'lawn-care': 130,
  'hvac-maintenance': 115,
  'de-icing': 55
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [quotes, setQuotes] = useState<SavedQuote[]>([]);
  const [basePrices, setBasePrices] = useState<Record<string, number>>(DEFAULT_BASE_PRICES);
  const [activeQuoteServices, setActiveQuoteServices] = useState<{ serviceId: string; config: any }[]>([
    { serviceId: 'house-deep-cleaning', config: { homeSize: '3br', tier: 'standard', oven: false, fridge: false, windows: false, frequency: 'once' } }
  ]);

  // Load from localStorage on mount (customer session bookings only)
  useEffect(() => {
    try {
      const storedBookings = localStorage.getItem('househero_customer_bookings');
      if (storedBookings) {
        setBookings(JSON.parse(storedBookings));
      }

      const storedQuotes = localStorage.getItem('househero_quotes');
      if (storedQuotes) {
        setQuotes(JSON.parse(storedQuotes));
      }

      const storedPrices = localStorage.getItem('househero_base_prices');
      if (storedPrices) {
        setBasePrices(JSON.parse(storedPrices));
      }
    } catch (e) {
      console.error('Failed to parse localStorage data:', e);
    }
  }, []);

  const refreshAdminBookings = async () => {
    try {
      const res = await fetch('/api/bookings');
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.data)) {
          setBookings(data.data);
        }
      }
    } catch (err) {
      console.error('Failed to fetch admin bookings:', err);
    }
  };

  const addBooking = async (bookingData: Omit<Booking, 'id' | 'createdAt' | 'status'>): Promise<Booking> => {
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });
      const data = await res.json();
      if (data.success && data.booking) {
        const confirmedBooking = data.booking as Booking;
        setBookings((prev) => {
          const updated = [confirmedBooking, ...prev.filter((b) => b.id !== confirmedBooking.id)];
          try {
            localStorage.setItem('househero_customer_bookings', JSON.stringify(updated));
          } catch {}
          return updated;
        });
        return confirmedBooking;
      }
      throw new Error(data.error || 'Server error creating booking');
    } catch (err) {
      // Fallback local booking if network is unavailable
      const fallbackId = `HH-2026-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
      const localBooking: Booking = {
        ...bookingData,
        id: fallbackId,
        status: 'Confirmed',
        createdAt: new Date().toISOString()
      };
      setBookings((prev) => {
        const updated = [localBooking, ...prev];
        try {
          localStorage.setItem('househero_customer_bookings', JSON.stringify(updated));
        } catch {}
        return updated;
      });
      return localBooking;
    }
  };

  const updateBookingStatus = async (id: string, status: Booking['status']) => {
    try {
      await fetch('/api/bookings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status })
      });
    } catch (err) {
      console.error('Failed to update booking on server:', err);
    }

    setBookings((prev) => {
      const updated = prev.map((b) => (b.id === id ? { ...b, status, updatedAt: new Date().toISOString() } : b));
      try {
        localStorage.setItem('househero_customer_bookings', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const rescheduleBooking = async (id: string, newDate: string, newWindow?: string) => {
    setBookings((prev) => {
      const updated = prev.map((b) =>
        b.id === id
          ? {
              ...b,
              scheduledDate: newDate,
              timeWindow: newWindow || b.timeWindow,
              rescheduledCount: (b.rescheduledCount || 0) + 1,
              updatedAt: new Date().toISOString()
            }
          : b
      );
      try {
        localStorage.setItem('househero_customer_bookings', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const cancelBooking = async (id: string) => {
    setBookings((prev) => {
      const updated = prev.map((b) => (b.id === id ? { ...b, status: 'Cancelled' as const, updatedAt: new Date().toISOString() } : b));
      try {
        localStorage.setItem('househero_customer_bookings', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const saveQuote = async (quoteData: Omit<SavedQuote, 'id' | 'createdAt'>): Promise<SavedQuote> => {
    try {
      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quoteData)
      });
      const data = await res.json();
      if (data.success && data.quote) {
        setQuotes((prev) => [data.quote, ...prev]);
        return data.quote;
      }
    } catch {}

    const localQuote: SavedQuote = {
      ...quoteData,
      id: `QUOTE-${Date.now().toString(36).toUpperCase()}`,
      createdAt: new Date().toISOString()
    };
    setQuotes((prev) => [localQuote, ...prev]);
    return localQuote;
  };

  const updateBasePrice = (serviceId: string, newPrice: number) => {
    setBasePrices((prev) => {
      const updated = { ...prev, [serviceId]: newPrice };
      try {
        localStorage.setItem('househero_base_prices', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const resetBasePrices = () => {
    setBasePrices(DEFAULT_BASE_PRICES);
    try {
      localStorage.removeItem('househero_base_prices');
    } catch {}
  };

  const addServiceToActiveQuote = (serviceId: string, config: any = {}) => {
    setActiveQuoteServices((prev) => {
      if (prev.some((s) => s.serviceId === serviceId)) return prev;
      return [...prev, { serviceId, config }];
    });
  };

  const removeServiceFromActiveQuote = (serviceId: string) => {
    setActiveQuoteServices((prev) => prev.filter((s) => s.serviceId !== serviceId));
  };

  return (
    <AppContext.Provider
      value={{
        bookings,
        quotes,
        basePrices,
        activeQuoteServices,
        addBooking,
        updateBookingStatus,
        rescheduleBooking,
        cancelBooking,
        saveQuote,
        updateBasePrice,
        resetBasePrices,
        setActiveQuoteServices,
        addServiceToActiveQuote,
        removeServiceFromActiveQuote,
        refreshAdminBookings,
        setBookings
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
