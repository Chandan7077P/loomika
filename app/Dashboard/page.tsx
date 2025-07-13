'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { onAuthStateChanged, signOut, User } from 'firebase/auth'
import { auth } from '@/firebase'
import { Button } from '@/components/ui/button'

const DashboardPage = () => {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        router.push('/account')
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [router])

  const handleLogout = async () => {
    await signOut(auth)
    router.push('/account')
  }

  if (loading) return <p className='text-center mt-20'>Loading...</p>

  return (
    <div className='min-h-screen p-6 bg-white'>
      <div className='max-w-xl mx-auto'>
        <div className='flex justify-between items-center mb-4'>
          <h1 className='text-xl font-bold'>Welcome, {user?.phoneNumber}</h1>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
        <p className='text-gray-600'>
          You have successfully logged in via OTP.
        </p>
      </div>
    </div>
  )
}

export default DashboardPage
