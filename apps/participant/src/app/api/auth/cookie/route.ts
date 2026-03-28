import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { token } = body;

    if (token) {
      cookies().set('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/'
      });
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ success: false }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function DELETE() {
  cookies().delete('jwt');
  return NextResponse.json({ success: true });
}
