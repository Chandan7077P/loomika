'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Search, Boxes, ShoppingCart, User } from 'lucide-react'

const navItems = [
  { href: '/', icon: Home },
  { href: '/Search', icon: Search },
  { href: '/Products', icon: Boxes },
  { href: '/Cart', icon: ShoppingCart },
  { href: '/Account', icon: User },
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
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
