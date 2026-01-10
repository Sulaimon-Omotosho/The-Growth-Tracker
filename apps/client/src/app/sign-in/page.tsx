import LoginForm from '@/src/components/forms/LoginForm'
import LoginGoogle from '@/src/components/LoginGoogle'
import Image from 'next/image'
import React from 'react'

const SignIn = () => {
  return (
    <div className='p-4 h-[calc(100vh-64px)]  md:h-[calc(100vh-9rem)] flex items-center justify-center'>
      <section className='shadow-2xl dark:shadow-slate-900 rounded-md flex flex-col md:flex-row md:h-[70%] md:w-full lg:w-[60%] xl:w-1/2 gap-8 md:pr-6'>
        {/* Image Container */}
        <div className='relative h-1/3 w-full md:h-full md:w-1/2'>
          <Image
            src='/assets/Growthtrack-img1.jpg'
            alt='Growth Track'
            fill
            className='object-cover'
            priority
          />
        </div>

        {/* Form Container */}
        <div className=' flex flex-col gap-3 md:w-1/2 p-1'>
          <LoginForm />
          <div className=''>
            <p className='text-center pb-1'>Or</p>
            <LoginGoogle />
          </div>
        </div>
      </section>
    </div>
  )
}

export default SignIn
