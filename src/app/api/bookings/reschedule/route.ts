import { NextResponse } from 'next/server';
import { lookupBooking, rescheduleBooking } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { reference, identifier, newDate, newWindow } = await request.json();

    if (!reference || !identifier) {
      return NextResponse.json({ success: false, error: 'Verification credentials required' }, { status: 400 });
    }
    if (!newDate) {
      return NextResponse.json({ success: false, error: 'New appointment date is required' }, { status: 400 });
    }

    const targetDate = new Date(newDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (targetDate < today) {
      return NextResponse.json({ success: false, error: 'Rescheduled date cannot be in the past' }, { status: 400 });
    }

    // Verify ownership
    const verified = await lookupBooking(reference, identifier);
    if (!verified) {
      return NextResponse.json({ success: false, error: 'Booking verification failed' }, { status: 403 });
    }

    if (verified.status === 'Cancelled') {
      return NextResponse.json({ success: false, error: 'Cannot reschedule a cancelled reservation' }, { status: 400 });
    }

    const updated = await rescheduleBooking(verified.id, newDate, newWindow);
    return NextResponse.json({
      success: true,
      booking: updated,
      message: 'Your appointment has been successfully rescheduled.'
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to reschedule appointment' }, { status: 500 });
  }
}
