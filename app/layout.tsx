import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Loomika',
  description: 'Handloom Sambalpuri Clothings.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className='font-poppins antialiased'>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
