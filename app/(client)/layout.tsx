import type { Metadata } from 'next'
import '../globals.css'
import Navbar from '../Components/Navbar'
import { ClerkProvider } from '@clerk/nextjs'
export const metadata: Metadata = {
  title: 'Loomika | Online Sambalpuri Store',
  description: 'Shop Online for Sambalpuri Dress, Kurtis, Sarees and Shirts',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      {/* MOBILE-LIKE CONTAINER */}
      <div className='mx-auto max-w-[480px] min-h-screen bg-white shadow-md relative overflow-hidden'>
        <Navbar />
        <main className='pb-24'>{children}</main>{' '}
        {/* Extra space for bottom nav if needed */}
      </div>
    </ClerkProvider>
  )
}
