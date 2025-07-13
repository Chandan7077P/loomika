'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  getAuth,
  signInWithPhoneNumber,
  ConfirmationResult,
} from 'firebase/auth'
import { initializeApp, getApps, getApp } from 'firebase/app'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp'

// ✅ Firebase config
const firebaseConfig = {
  apiKey: 'AIzaSyBwNpS8VZCOi82dvJDCOwra6dmzVpKMrwQ',
  authDomain: 'lookika-auth-otp.firebaseapp.com',
  projectId: 'lookika-auth-otp',
  storageBucket: 'lookika-auth-otp.appspot.com',
  messagingSenderId: '197887879399',
  appId: '1:197887879399:web:3950d3650a94dab7141a42',
}

// ✅ Safer Firebase initialization (prevents crash on hot reload)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()
const auth = getAuth(app)
auth.useDeviceLanguage()

const OtpLogin = () => {
  const router = useRouter()
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [timer, setTimer] = useState(0)

  // ⏱ Countdown timer
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [timer])

  const sendOtp = async () => {
    setError('')
    setLoading(true)
    try {
      const result = await signInWithPhoneNumber(auth, phone)
      setConfirmationResult(result)
      setTimer(60)
    } catch (err) {
      if (err instanceof Error) setError(err.message)
      else setError('Failed to send OTP.')
    } finally {
      setLoading(false)
    }
  }

  const verifyOtp = async () => {
    setError('')
    setLoading(true)
    try {
      if (!confirmationResult) throw new Error('OTP not sent')
      await confirmationResult.confirm(otp)
      router.push('/dashboard') //Redirects to user dashboard
    } catch (err) {
      if (err instanceof Error) setError(err.message)
      else setError('Invalid OTP.')
    } finally {
      setLoading(false)
    }
  }

  const resendOtp = () => {
    if (timer === 0) sendOtp()
  }

  return (
    <div className='max-w-sm mx-auto mt-10 space-y-4'>
      {!confirmationResult ? (
        <>
          <Input
            type='tel'
            placeholder='+91XXXXXXXXXX'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Button onClick={sendOtp} disabled={loading || !phone}>
            {loading ? 'Sending...' : 'Send OTP'}
          </Button>
        </>
      ) : (
        <>
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={(value) => setOtp(value)}
          >
            <InputOTPGroup>
              {[...Array(6)].map((_, i) => (
                <InputOTPSlot key={i} index={i} />
              ))}
            </InputOTPGroup>
          </InputOTP>
          <Button onClick={verifyOtp} disabled={loading || otp.length !== 6}>
            {loading ? 'Verifying...' : 'Verify OTP'}
          </Button>
          <div className='text-sm text-center text-gray-600'>
            {timer > 0 ? (
              <>Resend OTP in {timer} sec</>
            ) : (
              <button
                onClick={resendOtp}
                className='text-blue-600 underline hover:text-blue-800'
              >
                Resend OTP
              </button>
            )}
          </div>
        </>
      )}
      {error && <p className='text-red-500 text-sm'>{error}</p>}
    </div>
  )
}

export default OtpLogin
