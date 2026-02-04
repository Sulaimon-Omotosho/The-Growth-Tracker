import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const path = req.nextUrl.pathname
    const token = req.nextauth.token

    if (token && path.endsWith('/sign-in')) {
      return NextResponse.redirect(new URL('/user', req.url))
    }

    if (!token && path.startsWith('/(dashboard)')) {
      return NextResponse.redirect(new URL('/(homepage)/sign-in', req.url))
    }

    // Otherwise, continue
    return NextResponse.next()
  },
  {
    callbacks: {
      // Only allow authorized users to access any route protected by matcher
      authorized: ({ token }) => !!token,
    },
  },
)

export const config = {
  matcher: ['/sign-in', '/(dashboard)/:path*'],
}
