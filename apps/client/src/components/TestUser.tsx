'use client'

import { useSession } from 'next-auth/react'

const TestUser = () => {
  const { data: session, status } = useSession()

  if (status === 'loading') return <p>Loading...</p>
  if (!session) return <p>Not logged in</p>
  return (
    <div className='flex flex-col text-center text-3xl font-bold'>
      <p>User ID: {session.user.id}</p>
      <p>Email: {session.user.email}</p>
      <p>Role: {session.user.role}</p>
    </div>
  )
}

export default TestUser
