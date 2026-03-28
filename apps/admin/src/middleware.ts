import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Read the highly secure explicit admin_token payload mapping from node express
  const token = request.cookies.get('admin_token')?.value;

  const isLoginPage = request.nextUrl.pathname.startsWith('/login');

  // Hard Redirect unauthenticated users directly to the Firewall
  if (!token && !isLoginPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Prevent authenticated Admins from viewing the login sequence again
  if (token && isLoginPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// Map the strict Middleware logic onto all structural client endpoints explicitly ignoring generic Static Assets
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
