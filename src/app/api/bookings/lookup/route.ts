import { NextResponse } from 'next/server';
import { lookupBooking } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { reference, identifier } = await request.json();

    if (!reference?.trim()) {
      return NextResponse.json({ success: false, error: 'Booking reference is required (e.g. HH-2026-XXXX)' }, { status: 400 });
    }
    if (!identifier?.trim()) {
      return NextResponse.json({ success: false, error: 'Email address or phone number is required for verification' }, { status: 400 });
    }

    const booking = await lookupBooking(reference, identifier);
    if (!booking) {
      return NextResponse.json(
        {
          success: false,
          error: 'No active reservation matches that Reference ID and verification contact. Please double-check and try again.'
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      booking
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to look up booking' }, { status: 500 });
  }
}
