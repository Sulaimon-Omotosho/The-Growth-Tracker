'use client'

import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/sign-in')
    }
  }, [status, router])

  if (status === 'loading') return <div>Loading...</div>
  if (status === 'unauthenticated') return null

  return <>{children}</>
}
