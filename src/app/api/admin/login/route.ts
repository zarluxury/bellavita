import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { requireApiToken } from '@/lib/apiToken';

export async function POST(request: NextRequest) {
  const authError = requireApiToken(request);
  if (authError) return authError;
  try {
    const { email, password } = await request.json();

    // Simple authentication - in production, use proper password hashing and database
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@123';
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin';

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Set a secure cookie
      const cookieStore = cookies();
      (await cookieStore).set('admin_auth', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/',
      });

      return NextResponse.json({
        success: true,
        message: 'Login successful'
      });
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Login failed' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const authError = requireApiToken(request);
  if (authError) return authError;
  try {
    const cookieStore = cookies();
    (await cookieStore).delete('admin_auth');

    return NextResponse.json({
      success: true,
      message: 'Logout successful'
    });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { success: false, error: 'Logout failed' },
      { status: 500 }
    );
  }
}
