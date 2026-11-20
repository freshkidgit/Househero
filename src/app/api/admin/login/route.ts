import { NextResponse } from 'next/server';
import { validateAdminPassword, createAdminSessionToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (!validateAdminPassword(password)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid administrative security key.'
        },
        { status: 401 }
      );
    }

    const token = createAdminSessionToken();
    const response = NextResponse.json({
      success: true,
      message: 'Administrative session established.'
    });

    response.cookies.set({
      name: 'hh_admin_session',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    return response;
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Authentication failed' }, { status: 500 });
  }
}
