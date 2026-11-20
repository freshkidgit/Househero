import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');

export async function POST(request: Request) {
  try {
    const { name, email, phone, services, message, honeypot } = await request.json();

    // Honeypot spam check
    if (honeypot) {
      return NextResponse.json({ success: true, message: 'Inquiry received' });
    }

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ success: false, error: 'Name, email, and message are required.' }, { status: 400 });
    }

    const inquiry = {
      id: `INQ-${Date.now().toString(36).toUpperCase()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || '',
      services: services || [],
      message: message.trim(),
      createdAt: new Date().toISOString()
    };

    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    let inquiries = [];
    if (fs.existsSync(INQUIRIES_FILE)) {
      try {
        inquiries = JSON.parse(fs.readFileSync(INQUIRIES_FILE, 'utf-8'));
      } catch {
        inquiries = [];
      }
    }
    inquiries.unshift(inquiry);
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2), 'utf-8');

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your dispatch inquiry has been received. Our team will review and reply within 2 hours during active business hours.',
      inquiryId: inquiry.id
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to process inquiry' }, { status: 500 });
  }
}
