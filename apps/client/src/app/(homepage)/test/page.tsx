import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import TestUser from '@/components/TestUser'
import { getCurrentUser } from '@/lib/get-current-user'
import { getServerSession } from 'next-auth'

const Test = async () => {
  const session = await getServerSession(authOptions)

  const user = await getCurrentUser()

  // console.log('Session', session)
  // console.log('User', user)

  return (
    <div className=''>
      <div className='pt-40 pb-20'>
        <TestUser />
        <p className=''>{user?.id || 'null'}</p>
      </div>
    </div>
  )
}

export default Test
