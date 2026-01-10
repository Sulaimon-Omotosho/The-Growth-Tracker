'use client'

import { Eye, EyeClosed, Mail, User } from 'lucide-react'
import React, { useState } from 'react'
import SubmitButton from '../SubmitButton'

const LoginForm = () => {
  const [signUp, setSignUp] = useState(false)
  const [view, setView] = useState(true)

  return (
    <div>
      <h1 className='font-bold text-center text-xl lg:text-3xl pb-3'>
        {signUp ? 'Sign Up' : 'Login'}
      </h1>
      <form className='space-y-3 flex-1 bg-transparent'>
        {signUp && (
          <>
            <div className='flex gap-2 items-center rounded-md border border-black bg-black'>
              <User className='w-6 h-6 text-gray-200 ml-2' />
              <input
                type='text'
                id='firstName'
                placeholder='First Name'
                // {...register('name')}
                className='bg-black placeholder:text-dark-500 h-9 focus-visible:ring-0 focus-visible:ring-offset-0 text-white border-0 w-full px-2'
              />
              {/* {errors.name && (
            <p className='text-xs text-red-500'>
              {errorsToRecord.name.message}{' '}
            </p>
          )} */}
            </div>
            <div className='flex gap-2 items-center rounded-md border border-black bg-black'>
              <User className='w-6 h-6 text-gray-200 ml-2' />
              <input
                type='text'
                id='lastName'
                placeholder='Last Name'
                // {...register('name')}
                className='bg-black placeholder:text-dark-500 h-9 focus-visible:ring-0 focus-visible:ring-offset-0 text-white border-0 w-full px-2'
              />
              {/* {errors.name && (
            <p className='text-xs text-red-500'>
              {errorsToRecord.name.message}{' '}
            </p>
          )} */}
            </div>
            <div className='flex gap-2 items-center rounded-md border border-black bg-black'>
              <User className='w-6 h-6 text-gray-200 ml-2' />
              <input
                type='text'
                id='username'
                placeholder='Username'
                // {...register('name')}
                className='bg-black placeholder:text-dark-500 h-9 focus-visible:ring-0 focus-visible:ring-offset-0 text-white border-0 w-full px-2'
              />
              {/* {errors.name && (
            <p className='text-xs text-red-500'>
              {errorsToRecord.name.message}{' '}
            </p>
          )} */}
            </div>
          </>
        )}
        <div className='flex gap-2 items-center rounded-md border border-black bg-black'>
          <Mail className='w-6 h-6 text-gray-200 ml-2' />
          <input
            type='email'
            id='email'
            placeholder='Email'
            // {...register('name')}
            className='bg-black placeholder:text-dark-500 h-9 focus-visible:ring-0 focus-visible:ring-offset-0 text-white border-0 w-full px-2'
          />
          {/* {errors.name && (
            <p className='text-xs text-red-500'>
              {errorsToRecord.name.message}{' '}
            </p>
          )} */}
        </div>
        <div className='flex gap-2 items-center rounded-md border border-black bg-black'>
          <button type='button' onClick={() => setView(!view)}>
            {view ? (
              <EyeClosed className='w-6 h-6 text-gray-200 ml-2 cursor-pointer' />
            ) : (
              <Eye className='w-6 h-6 text-gray-200 ml-2 cursor-pointer' />
            )}
          </button>
          <input
            type={view ? 'text' : 'password'}
            id='password'
            placeholder='Password'
            // {...register('name')}
            className='bg-black placeholder:text-dark-500 h-9 focus-visible:ring-0 focus-visible:ring-offset-0 text-white border-0 w-full px-2'
          />
          {/* {errors.name && (
            <p className='text-xs text-red-500'>
              {errorsToRecord.name.message}{' '}
            </p>
          )} */}
        </div>

        <div className=''>
          <SubmitButton>{signUp ? 'Sign Up' : 'Login'}</SubmitButton>
          <p className='text-sm pt-2'>
            {signUp ? 'Have An Account?' : 'Dont Have An Account?'}
            <span
              onClick={() => setSignUp(!signUp)}
              className='underline text-amber-500 hover:text-amber-800 pl-2 cursor-pointer'
            >
              {signUp ? 'Login' : 'Sign Up'}
            </span>
          </p>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
