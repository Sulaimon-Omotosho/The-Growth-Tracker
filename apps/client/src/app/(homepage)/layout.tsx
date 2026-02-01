import Navbar from '@/components/Navbar'
// import './globals.css'
import Footer from '@/components/Footer'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className=''>
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}
