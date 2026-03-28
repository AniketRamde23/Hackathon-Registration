import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const STATIC_ADMINS: Record<string, string> = {
  '2311it010159@mallareddyuniversity.ac.in': '2311it010159',
  '2311it010135@mallareddyuniversity.ac.in': '2311it010135',
  '2311it010055@mallareddyuniversity.ac.in': '2311it010055'
};

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, error: 'Email and password are required.' }, { status: 400 });
    }

    const validPassword = STATIC_ADMINS[email as string];

    if (!validPassword || validPassword !== password) {
      return NextResponse.json({ success: false, error: 'Invalid Administrator Credentials.' }, { status: 403 });
    }

    // Sign the explicit separate Admin payload
    const token = jwt.sign(
      { id: 'SUPERADMIN_STATIC', email, role: 'admin' }, 
      process.env.JWT_SECRET || 'fallback-secret-key-12345',
      { expiresIn: '12h' }
    );

    const response = NextResponse.json({ success: true, email });

    // Drop secure runtime cookie identical to user sessions but specifically mapped for isolated App domains
    response.cookies.set('admin_token', token, {
      httpOnly: false, // Edge middleware bypass hooks require raw node accessibility
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 12 * 60 * 60, // 12 Hours in seconds for NextJS natively
      path: '/'
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ success: false, error: 'Internal Next.js Route Error' }, { status: 500 });
  }
}
