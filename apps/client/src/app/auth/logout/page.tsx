'use client'

import { useEffect } from 'react'
import { signOut } from 'next-auth/react'

export default function LogoutPage() {
  useEffect(() => {
    signOut({
      callbackUrl: '/sign-in',
    })
  }, [])

  return (
    <p className='p-4 text-center text-sm text-gray-500'>Signing you out…</p>
  )
}
// app/auth/logout/route.ts
// import { NextResponse } from 'next/server'

// export async function GET() {
//   return NextResponse.redirect(
//     new URL('/api/auth/signout?callbackUrl=/sign-in', process.env.NEXTAUTH_URL),
//   )
// }
