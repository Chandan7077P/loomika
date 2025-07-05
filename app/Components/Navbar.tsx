'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/16/solid'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)
  const pathname = usePathname()

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev)
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const menuItems = [
    { href: '/', label: 'Home' },
    { href: '/Products', label: 'Product' },
    { href: '/Facility', label: 'Our Facility' },
    { href: '/About', label: 'About Us' },
    { href: '/Contact', label: 'Contact' },
  ]

  return (
    <>
      {/* Navbar */}
      <nav
        className={`fixed w-full z-50 transition-colors duration-300 ${
          isScrolled
            ? 'bg-blue-950/90 backdrop-blur-md'
            : isMobileMenuOpen
            ? 'bg-white/10 backdrop-blur-lg'
            : 'bg-gradient-to-b from-black/30 via-black/10 to-transparent'
        }`}
      >
        <div className='max-w-7xl mx-auto px-6'>
          <div className='flex items-center justify-between h-16 text-white'>
            <Link
              href='/'
              className='flex items-center gap-2 hover:text-cyan-400'
            >
              <Image
                src='/logo.webp'
                alt='Logo'
                width={80}
                height={80}
                className='object-contain'
                priority
              />
              <span className='text-lg md:text-xl font-bold'>
                Baby Marine International
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className='hidden md:flex items-center space-x-4 text-sm font-semibold'>
              {menuItems.map((item) => {
                const isActive =
                  item.href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(item.href)

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-2 rounded-full transition-colors duration-200 ${
                      (isScrolled || isMobileMenuOpen) && isActive
                        ? 'bg-white/10 backdrop-blur-lg shadow-lg text-cyan-400'
                        : 'text-white hover:text-cyan-400'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>

            {/* Mobile Toggle */}
            <button onClick={toggleMobileMenu} className='md:hidden'>
              {isMobileMenuOpen ? (
                <XMarkIcon className='w-6 h-6' />
              ) : (
                <Bars3Icon className='w-6 h-6' />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div
          className='
            fixed
            top-16
            left-0
            w-full
            z-40
            rounded-b-xl
            bg-white/10
            backdrop-blur-lg
            shadow-lg
            p-2
          '
        >
          {menuItems.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href)

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-2 rounded transition-colors duration-200 ${
                  isActive
                    ? 'bg-white/10 text-cyan-400'
                    : 'text-white hover:text-cyan-400'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </div>
      )}
    </>
  )
}

export default Navbar
