import React, { FC } from 'react'
import Logo from './Logo'
import { X } from 'lucide-react'
interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const SideMenu: FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed inset-y-0 h-screen left-0 z-50 w-full backdrop-blur-sm text-crimson shadow-xl transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } hoverEffect`}
    >
      <div className='min-w-full max-w-full bg-white/75 h-screen p-5 border-r border-r-white/20 shadow-2xl flex flex-col gap-6'>
        <div className='flex items-center justify-between gap-5'>
          <Logo />
          <button
            onClick={onClose}
            className='hover:text-royal-green hover:cursor-pointer hoverEffect'
          >
            <X />
          </button>
        </div>
        <div></div>
      </div>
    </div>
  )
}

export default SideMenu
