import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

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
  paymentMethod: 'pay-upon-completion';
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

const DATA_DIR = path.join(process.cwd(), 'data');
const BOOKINGS_FILE = path.join(DATA_DIR, 'bookings.json');
const QUOTES_FILE = path.join(DATA_DIR, 'quotes.json');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readBookings(): Booking[] {
  ensureDataDir();
  if (!fs.existsSync(BOOKINGS_FILE)) {
    return [];
  }
  try {
    const raw = fs.readFileSync(BOOKINGS_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeBookings(bookings: Booking[]): void {
  ensureDataDir();
  const tmp = `${BOOKINGS_FILE}.${Date.now()}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(bookings, null, 2), 'utf-8');
  fs.renameSync(tmp, BOOKINGS_FILE);
}

function readQuotes(): SavedQuote[] {
  ensureDataDir();
  if (!fs.existsSync(QUOTES_FILE)) {
    return [];
  }
  try {
    const raw = fs.readFileSync(QUOTES_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeQuotes(quotes: SavedQuote[]): void {
  ensureDataDir();
  const tmp = `${QUOTES_FILE}.${Date.now()}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(quotes, null, 2), 'utf-8');
  fs.renameSync(tmp, QUOTES_FILE);
}

export function generateBookingReference(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(crypto.randomInt(0, chars.length));
  }
  const year = new Date().getFullYear();
  return `HH-${year}-${code}`;
}

export async function createBooking(data: {
  services: BookingServiceItem[];
  customer: CustomerDetails;
  scheduledDate: string;
  timeWindow: string;
  subtotalUSD: number;
  discountUSD: number;
  totalUSD: number;
}): Promise<Booking> {
  const bookings = readBookings();
  const reference = generateBookingReference();

  const newBooking: Booking = {
    id: reference,
    services: data.services,
    customer: data.customer,
    scheduledDate: data.scheduledDate,
    timeWindow: data.timeWindow,
    paymentMethod: 'pay-upon-completion',
    subtotalUSD: Math.round(data.subtotalUSD),
    discountUSD: Math.round(data.discountUSD),
    totalUSD: Math.round(data.totalUSD),
    status: 'Confirmed',
    createdAt: new Date().toISOString()
  };

  bookings.unshift(newBooking);
  writeBookings(bookings);
  return newBooking;
}

export async function lookupBooking(reference: string, identifier: string): Promise<Booking | null> {
  if (!reference || !identifier) return null;
  const bookings = readBookings();
  const refClean = reference.trim().toUpperCase();
  const idClean = identifier.trim().toLowerCase().replace(/[^a-z0-9@.]/g, '');

  const match = bookings.find((b) => {
    if (b.id.toUpperCase() !== refClean) return false;
    const emailClean = b.customer.email.toLowerCase().trim();
    const phoneClean = b.customer.phone.replace(/[^0-9]/g, '');
    const searchPhone = idClean.replace(/[^0-9]/g, '');

    return emailClean === idClean || (searchPhone.length >= 7 && phoneClean.includes(searchPhone));
  });

  return match || null;
}

export async function getBookingById(id: string): Promise<Booking | null> {
  const bookings = readBookings();
  return bookings.find((b) => b.id.toUpperCase() === id.trim().toUpperCase()) || null;
}

export async function getAllBookingsAdmin(): Promise<Booking[]> {
  return readBookings();
}

export async function updateBookingStatusAdmin(id: string, status: Booking['status']): Promise<Booking | null> {
  const bookings = readBookings();
  const idx = bookings.findIndex((b) => b.id.toUpperCase() === id.trim().toUpperCase());
  if (idx === -1) return null;

  bookings[idx].status = status;
  bookings[idx].updatedAt = new Date().toISOString();
  writeBookings(bookings);
  return bookings[idx];
}

export async function rescheduleBooking(id: string, newDate: string, newWindow?: string): Promise<Booking | null> {
  const bookings = readBookings();
  const idx = bookings.findIndex((b) => b.id.toUpperCase() === id.trim().toUpperCase());
  if (idx === -1) return null;

  bookings[idx].scheduledDate = newDate;
  if (newWindow) {
    bookings[idx].timeWindow = newWindow;
  }
  bookings[idx].rescheduledCount = (bookings[idx].rescheduledCount || 0) + 1;
  bookings[idx].updatedAt = new Date().toISOString();
  writeBookings(bookings);
  return bookings[idx];
}

export async function cancelBooking(id: string): Promise<Booking | null> {
  const bookings = readBookings();
  const idx = bookings.findIndex((b) => b.id.toUpperCase() === id.trim().toUpperCase());
  if (idx === -1) return null;

  bookings[idx].status = 'Cancelled';
  bookings[idx].updatedAt = new Date().toISOString();
  writeBookings(bookings);
  return bookings[idx];
}

export async function saveQuote(data: {
  services: BookingServiceItem[];
  subtotalUSD: number;
  discountUSD: number;
  totalUSD: number;
  zipCode: string;
}): Promise<SavedQuote> {
  const quotes = readQuotes();
  const id = `QUOTE-${Date.now().toString(36).toUpperCase()}`;

  const newQuote: SavedQuote = {
    id,
    services: data.services,
    subtotalUSD: data.subtotalUSD,
    discountUSD: data.discountUSD,
    totalUSD: data.totalUSD,
    zipCode: data.zipCode,
    createdAt: new Date().toISOString()
  };

  quotes.unshift(newQuote);
  writeQuotes(quotes);
  return newQuote;
}
