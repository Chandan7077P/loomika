// app/Components/Navbar.tsx

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Search, Boxes, ShoppingCart, User } from 'lucide-react'
import { SignInButton, SignedIn, SignedOut } from '@clerk/nextjs'

// 1. Import your new custom component
import { CustomUserButton } from './CustomUserButton'

const navItems = [
  { href: '/', icon: Home },
  { href: '/Search', icon: Search },
  { href: '/AllProducts', icon: Boxes },
  { href: '/Cart', icon: ShoppingCart },
]

const Navbar = () => {
  const pathname = usePathname()
  const isActive = (href: string) => pathname === href

  return (
    <div className='fixed bottom-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-[480px]'>
      <nav className='bg-white shadow-[0_-2px_8px_rgba(0,0,0,0.06)]'>
        <ul className='flex justify-around items-center h-16 text-xs text-gray-600'>
          {navItems.map(({ href, icon: Icon }) => (
            <li key={href} className='flex-1 text-center'>
              <Link
                href={href}
                className={`flex flex-col items-center justify-center gap-0.5 transition-colors ${
                  isActive(href)
                    ? 'text-black font-semibold'
                    : 'hover:text-black'
                }`}
              >
                <Icon size={24} />
              </Link>
            </li>
          ))}

          {/* Account icon (Sign in or Avatar) */}
          <li className='flex-1 text-center'>
            <div className='flex flex-col items-center justify-center gap-0.5'>
              <SignedOut>
                <SignInButton mode='modal'>
                  <button className='hover:text-black'>
                    <User size={24} />
                  </button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                {/* 2. Replace UserButton with your new CustomUserButton */}
                <CustomUserButton />
              </SignedIn>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar