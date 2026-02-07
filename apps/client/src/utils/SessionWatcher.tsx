'use client'

import { useSession, signOut } from 'next-auth/react'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function SessionWatcher() {
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === 'authenticated' && session?.error === 'TokenExpired') {
      console.log('Session expired, logging out...')
      signOut({ callbackUrl: '/sign-in' })
    }
  }, [session, status])

  return null
}
