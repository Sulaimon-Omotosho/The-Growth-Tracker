import LoginForm from '@/components/forms/LoginForm'
import LoginGoogle from '@/components/LoginGoogle'
import Image from 'next/image'
// import { prisma } from '@repo/db'

const SignIn = () => {
  // const user = await prisma.user.findFirst()

  return (
    <div className='p-4 h-[calc(100vh-64px)]  md:h-[calc(100vh-9rem)] flex items-center justify-center rounded-md'>
      <section className='md:mt-15 shadow-2xl dark:shadow-slate-900 rounded-md flex flex-col md:flex-row md:h-[85%] lg:h-[60%] xl:h-[75%] md:w-full lg:w-[60%] xl:w-1/2 gap-8 md:pr-6'>
        {/* Image Container */}
        <div className='relative h-1/3 w-full md:h-full md:w-1/2'>
          <Image
            src='/assets/Growthtrack-img1.jpg'
            alt='Growth Track'
            fill
            className='object-cover rounded-l-md'
            priority
          />
        </div>

        {/* Form Container */}
        <div className=' flex flex-col gap-3 md:w-1/2 p-4'>
          <LoginForm />
          <div className=''>
            <p className='text-center pb-1'>Or</p>
            <LoginGoogle />
          </div>
        </div>
      </section>
      {/* <div className='text-bold text-3xl text-center'>
        {user?.name ?? 'No user found'}{' '}
      </div> */}
    </div>
  )
}

export default SignIn
