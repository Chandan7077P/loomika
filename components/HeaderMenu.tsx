'use client'
import { headerData } from '@/constants/data'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const HeaderMenu = () => {
  const pathname = usePathname()
  const [hovered, setHovered] = React.useState<string | null>(null)

  return (
    <div className='hidden md:inline-flex items-center gap-7 text-base capitalize font-semibold text-royal-green whitespace-nowrap'>
      {headerData?.map((item) => (
        <Link
          key={item?.title}
          href={item?.href}
          onMouseEnter={() => setHovered(item?.href)}
          onMouseLeave={() => setHovered(null)}
          className={`hover:text-crimson hoverEffect relative group ${
            pathname === item?.href && 'text-royal-green'
          }`}
        >
          {item?.title}
          <span
            className={`absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-crimson group-hover:w-1/2 hoverEffect group-hover:left-0 ${
              pathname === item?.href && hovered === null ? 'w-1/2' : ``
            }`}
          />
          <span
            className={`absolute -bottom-0.5 right-1/2 w-0 h-0.5 bg-crimson group-hover:w-1/2 hoverEffect group-hover:right-0 ${
              pathname === item?.href && hovered === null ? 'w-1/2' : ``
            }`}
          />
        </Link>
      ))}
    </div>
  )
}

export default HeaderMenu
