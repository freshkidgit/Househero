import { NextResponse } from 'next/server';
import { createBooking, getAllBookingsAdmin, updateBookingStatusAdmin, BookingServiceItem } from '@/lib/db';
import { isAuthenticatedAdmin } from '@/lib/auth';
import { calculateServicePrice, calculateMultiServiceBundle } from '@/data/pricingEngine';
import { SERVICES } from '@/data/services';

export async function GET() {
  const isAdmin = await isAuthenticatedAdmin();
  if (!isAdmin) {
    return NextResponse.json(
      {
        success: false,
        error: 'Unauthorized. Administrative credentials required to access customer booking records.'
      },
      { status: 401 }
    );
  }

  const bookings = await getAllBookingsAdmin();
  return NextResponse.json({
    success: true,
    data: bookings,
    count: bookings.length
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customer, services: rawServices, scheduledDate, timeWindow } = body;

    // 1. Validate Customer
    if (!customer?.fullName?.trim()) {
      return NextResponse.json({ success: false, error: 'Full name is required' }, { status: 400 });
    }
    if (!customer?.email?.trim() || !customer.email.includes('@')) {
      return NextResponse.json({ success: false, error: 'Valid email address is required' }, { status: 400 });
    }
    if (!customer?.phone?.trim() || customer.phone.replace(/[^0-9]/g, '').length < 10) {
      return NextResponse.json({ success: false, error: 'Valid 10-digit phone number is required' }, { status: 400 });
    }
    if (!customer?.address?.trim()) {
      return NextResponse.json({ success: false, error: 'Service street address is required' }, { status: 400 });
    }
    if (!customer?.zipCode?.trim()) {
      return NextResponse.json({ success: false, error: 'Postal code (ZIP) is required' }, { status: 400 });
    }

    // 2. Validate Services
    if (!Array.isArray(rawServices) || rawServices.length === 0) {
      return NextResponse.json({ success: false, error: 'At least one service must be selected' }, { status: 400 });
    }

    // 3. Validate Date (Cannot be past)
    if (!scheduledDate) {
      return NextResponse.json({ success: false, error: 'Service appointment date is required' }, { status: 400 });
    }
    const appointmentDate = new Date(scheduledDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (appointmentDate < today) {
      return NextResponse.json({ success: false, error: 'Appointment date cannot be in the past' }, { status: 400 });
    }

    // 4. Authoritative Server-Side Price Calculation
    const verifiedServices: BookingServiceItem[] = [];
    const bundleItemsForCalc: { serviceId: string; config: any }[] = [];

    for (const item of rawServices) {
      const sId = typeof item === 'string' ? item : item.serviceId;
      const cfg = typeof item === 'object' && item.config ? item.config : {};
      const serviceMeta = SERVICES.find((s) => s.id === sId);
      const title = serviceMeta ? serviceMeta.title : sId;

      const calc = calculateServicePrice(sId, cfg);
      const itemSubtotal = calc.subtotal > 0 ? calc.subtotal : (serviceMeta?.startingPrice || 120);

      verifiedServices.push({
        serviceId: sId,
        serviceTitle: title,
        subtotal: itemSubtotal,
        config: cfg
      });

      bundleItemsForCalc.push({
        serviceId: sId,
        config: cfg
      });
    }

    const bundleResult = calculateMultiServiceBundle(bundleItemsForCalc);

    // 5. Persist to Durable Server Storage
    const newBooking = await createBooking({
      services: verifiedServices,
      customer: {
        fullName: customer.fullName.trim(),
        email: customer.email.trim().toLowerCase(),
        phone: customer.phone.trim(),
        address: customer.address.trim(),
        city: customer.city?.trim() || 'Denver',
        state: customer.state?.trim() || 'CO',
        zipCode: customer.zipCode.trim(),
        gateCode: customer.gateCode?.trim() || '',
        notes: customer.notes?.trim() || ''
      },
      scheduledDate,
      timeWindow: timeWindow || 'Morning 8:00 AM – 11:00 AM',
      subtotalUSD: bundleResult.combinedSubtotal,
      discountUSD: bundleResult.bundleDiscountAmount,
      totalUSD: bundleResult.finalTotal
    });

    return NextResponse.json(
      {
        success: true,
        reference: newBooking.id,
        booking: newBooking
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process booking request. Please check inputs and try again.'
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const isAdmin = await isAuthenticatedAdmin();
  if (!isAdmin) {
    return NextResponse.json({ success: false, error: 'Admin authentication required to alter booking status' }, { status: 401 });
  }

  try {
    const { id, status } = await request.json();
    if (!id || !status) {
      return NextResponse.json({ success: false, error: 'Booking ID and target status required' }, { status: 400 });
    }

    const updated = await updateBookingStatusAdmin(id, status);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Booking not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, booking: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update booking' }, { status: 500 });
  }
}
