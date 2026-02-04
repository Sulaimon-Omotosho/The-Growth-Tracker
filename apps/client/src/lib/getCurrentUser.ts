import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

const USERS_SERVICE_URL = process.env.USERS_SERVICE_URL!

export async function getCurrentUser() {
  const session = await getServerSession(authOptions)
  // console.log('Session in server:', session)

  if (!session?.accessToken) {
    return null
  }

  const res = await fetch(`${USERS_SERVICE_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
    cache: 'no-store',
  })

  if (!res.ok) {
    console.error('Failed to fetch user:', await res.text())
    return null
  }

  return res.json()
}
