// app/Components/CustomUserButton.tsx

'use client'

import { UserButton, useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { ShieldCheck } from 'lucide-react'

export function CustomUserButton() {
  const { user } = useUser()
  const router = useRouter()
  const isStudio = user?.publicMetadata?.role === 'studio'

  const navigateToStudio = () => {
    router.push('/studio')
  }

  return (
    <UserButton afterSignOutUrl='/'>
      <UserButton.MenuItems>
        {isStudio && (
          // This is the correct way to structure the component
          <UserButton.Action
            onClick={navigateToStudio}
            label='Studio'
            labelIcon={<ShieldCheck className='h-4 w-4' />}
          />
        )}
      </UserButton.MenuItems>
    </UserButton>
  )
}
