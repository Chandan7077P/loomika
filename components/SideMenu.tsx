import React, { FC } from 'react'
interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const SideMenu: FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed inset-y-0 h-screen left-0 z-50 w-full bg-black/50 shadow-xl ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } hoverEffect`}
    >
      SideMenu
    </div>
  )
}

export default SideMenu
