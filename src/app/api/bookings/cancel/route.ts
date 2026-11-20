import { NextResponse } from 'next/server';
import { lookupBooking, cancelBooking } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { reference, identifier, reason } = await request.json();

    if (!reference || !identifier) {
      return NextResponse.json({ success: false, error: 'Verification credentials required' }, { status: 400 });
    }

    // Verify ownership
    const verified = await lookupBooking(reference, identifier);
    if (!verified) {
      return NextResponse.json({ success: false, error: 'Booking verification failed' }, { status: 403 });
    }

    if (verified.status === 'Completed') {
      return NextResponse.json({ success: false, error: 'Completed services cannot be cancelled' }, { status: 400 });
    }

    const cancelled = await cancelBooking(verified.id);
    return NextResponse.json({
      success: true,
      booking: cancelled,
      message: 'Your reservation has been cancelled. No fees or charges apply under our flexible policy.'
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to cancel reservation' }, { status: 500 });
  }
}
