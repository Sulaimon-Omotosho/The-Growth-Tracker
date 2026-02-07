import { AppSidebar } from '@/components/dashboard/AppSidebar'
import Navbar from '@/components/dashboard/Navbar'
import Footer from '@/components/Footer'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
// import { AuthGuard } from '@/utils/auth-guard'
import { cookies } from 'next/headers'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true'

  return (
    <div className='h-full'>
      {/* <AuthGuard> */}
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar />
        <main className='w-full'>
          <Navbar />
          {children}
        </main>
      </SidebarProvider>
      {/* </AuthGuard> */}
    </div>
  )
}
