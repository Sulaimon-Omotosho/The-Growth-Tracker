import Image from 'next/image'
import Link from 'next/link'
import { Home, LogIn } from 'lucide-react'

const Navbar = () => {
  return (
    <nav className='w-full bg-white border-b border-gray-200 shadow-2xl fixed z-10'>
      <div className='flex items-center justify-between p-4'>
        {/* LEFT */}
        <Link href='/' className='flex items-center'>
          <Image
            src='/assets/Logo.jpeg'
            alt='HICC'
            width={50}
            height={50}
            className='w-10 h-10'
          />
          <p className='hidden md:block text-md font-medium tracking-wider'>
            THE GROWTH TRACKER
          </p>
        </Link>
        {/* RIGHT */}
        <div className='flex items-center gap-6'>
          <Link href='/' className='flex items-center justify-center gap-1'>
            <Home className='w-6 h-6 md:w-4 md:h-4 text-gray-600' />
            <p className='hidden md:block text-gray-600 font-bold'>Home</p>
          </Link>
          <Link
            href='/sign-in'
            className='flex items-center justify-center gap-1'
          >
            <LogIn className='w-6 h-6 md:w-4 md:h-4 text-gray-600' />
            <p className='hidden md:block text-gray-600 font-bold'>Login</p>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
