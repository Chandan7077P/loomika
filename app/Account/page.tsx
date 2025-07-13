'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { onAuthStateChanged, signOut, User } from 'firebase/auth'
import { auth } from '@/firebase'
import OtpLogin from '../Components/OtpLogin'

const Account = () => {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser)
        setLoading(false)
        router.push('/dashboard') // Redirect logged-in users immediately
      } else {
        setUser(null)
        setLoading(false) // Show login UI when no user
      }
    })

    return () => unsubscribe()
  }, [router])

  const handleSignOut = async () => {
    await signOut(auth)
    setUser(null)
    router.push('/account') // Redirect back to login page
  }

  if (loading) {
    return (
      <div className='h-screen flex justify-center items-center text-gray-600'>
        Checking login status...
      </div>
    )
  }

  // If user is logged in (before redirect to dashboard), you can also show sign out here if you want
  if (user) {
    return (
      <section className='min-h-screen flex flex-col justify-center items-center gap-4'>
        <h1 className='text-2xl font-semibold'>Welcome, {user.phoneNumber}</h1>
        <button
          onClick={handleSignOut}
          className='px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700'
        >
          Sign Out
        </button>
      </section>
    )
  }

  // No user, show login form
  return (
    <section className='min-h-screen bg-white flex justify-center items-center px-4 py-12'>
      <OtpLogin />
    </section>
  )
}

export default Account
