import { AttendanceChart } from '@/components/dashboard/AttendanceChart'
import Events from '@/components/dashboard/Events'
import MessageCard from '@/components/dashboard/MessageCard'
import NextStepCard from '@/components/dashboard/NextStepCard'
import { Progress } from '@/components/ui/progress'
import { getCurrentUser } from '@/lib/get-current-user'
import { Dot } from 'lucide-react'

const UserDashboard = async () => {
  const user = await getCurrentUser()

  return (
    <div className='px-4 md:px-6 py-6'>
      {user ? (
        <>
          {/* HEADER  */}
          <div className='flex flex-col gap-1'>
            <p className='font-semibold text-lg'>
              Welcome,{' '}
              <span className='font-normal'>
                {user?.firstName} {user?.lastName}{' '}
              </span>
            </p>
            <p className='text-sm'>
              You're 75% through your Growth Track Classes
            </p>
            <Progress value={75} className='w-50' />
          </div>
          {/* BODY  */}
          <div className='w-full lg:flex gap-3 pt-3'>
            {/* Left  */}
            <div className='lg:flex-4/6 flex flex-col gap-4 rounded-sm'>
              <NextStepCard />
              <Events />
              <AttendanceChart />
            </div>
            {/* Right  */}
            <div className='lg:flex-2/6 flex flex-col mt-4 lg:mt-0 gap-3 lg:gap-6 rounded-sm w-full'>
              <div className=' flex flex-col rounded-sm w-full'>
                <h1 className='font-semibold'>Messages</h1>
                <div className='flex flex-col gap-3 p-2'>
                  <MessageCard />
                  <MessageCard />
                  <MessageCard />
                  <MessageCard />
                  <div className='w-full flex items-center justify-end'>
                    <div className='flex gap-0.5 hover:cursor-pointer pr-3'>
                      <Dot className='w-3 h-3 text-white bg-gray-600 rounded-full' />
                      <Dot className='w-3 h-3 text-white bg-gray-600 rounded-full' />
                      <Dot className='w-3 h-3 text-white bg-gray-600 rounded-full' />
                    </div>
                  </div>
                </div>
              </div>
              <div className=' flex flex-col rounded-sm w-full'>
                <h1 className='font-semibold'>Announcements</h1>
                <div className='flex flex-col gap-3 p-2'>
                  <MessageCard />
                  <MessageCard />
                  <MessageCard />
                  <MessageCard />
                  <div className='w-full flex items-center justify-end'>
                    <div className='flex gap-0.5 hover:cursor-pointer pr-3'>
                      <Dot className='w-3 h-3 text-white bg-gray-600 rounded-full' />
                      <Dot className='w-3 h-3 text-white bg-gray-600 rounded-full' />
                      <Dot className='w-3 h-3 text-white bg-gray-600 rounded-full' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className='flex items-center justify-center'>
          <h2 className='font-bold text-center text-xl'>Loading ...</h2>
        </div>
      )}
    </div>
  )
}

export default UserDashboard
