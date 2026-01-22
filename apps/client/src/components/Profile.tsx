'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { LogOut, Settings, User } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

const Profile = () => {
  const session = useSession()

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          {/* <Avatar>
            <AvatarImage src='https://avatars.githubusercontent.com/u/1486366' />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar> */}
          <User className='h-6 w-6 m-2' />
        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={10}>
          <DropdownMenuLabel>{session.data?.user.role}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href='/user' className='flex gap-2'>
              <User className='h-[1.2rem] w-[1.2rem] mr-2' />
              Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className='h-[1.2rem] w-[1.2rem] mr-2' />
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem
            variant='destructive'
            onClick={() => signOut({ callbackUrl: '/' })}
          >
            <LogOut className='h-[1.2rem] w-[1.2rem] mr-2' />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default Profile
