import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

// middleware checks every request going into the website
// this feature start after next 12
// it is similar to anglar auth guard
export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET });
  const { pathname } = req.nextUrl;

  /**
   * 1. it's a request
   * 2. token exists
   */
  if (pathname.includes('/api/auth') || token) {
    return NextResponse.next(); // continue on
  }

  // requesting a protected route
  // [TODO:] bug occur when deployed
  // if (!token && pathname !== '/login') {
  //   return NextResponse.redirect('/login');
  // }
}
