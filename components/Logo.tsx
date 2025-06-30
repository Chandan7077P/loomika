import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href={'/'}>
      <h2
        className={cn(
          'text-2xl text-crimson font-black tracking-wider uppercase hover:text-royal-green hoverEffect group font-serif',
          className
        )}
      >
        L
        <span className='text-royal-green group-hover:text-crimson hoverEffect'>
          oo
        </span>
        mika
      </h2>
    </Link>
  )
}

export default Logo
