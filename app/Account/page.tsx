'use client'

import React, { useState } from 'react'

const Account = () => {
  const [mobile, setMobile] = useState('')

  const handleSendOtp = () => {
    if (!mobile.trim()) return alert('Please enter your mobile number')
    alert(`OTP sent to +91-${mobile}`) // Replace with actual logic later
  }

  return (
    <section className='min-h-screen bg-white text-gray-800 flex items-center justify-center px-4 py-12'>
      <div className='max-w-md w-full bg-white p-8 rounded-xl shadow-lg border border-gray-100'>
        <h2 className='text-2xl font-semibold text-center mb-2'>
          Welcome to Loomika
        </h2>
        <p className='text-center text-gray-500 mb-6'>
          Login or Signup using your mobile number
        </p>

        <label
          htmlFor='mobile'
          className='block text-sm font-medium text-gray-700 mb-2'
        >
          Mobile Number
        </label>
        <input
          id='mobile'
          type='tel'
          maxLength={10}
          placeholder='Enter your 10-digit mobile number'
          value={mobile}
          onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
          className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 mb-4'
        />

        <button
          onClick={handleSendOtp}
          className='w-full py-3 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition'
        >
          Send OTP
        </button>
      </div>
    </section>
  )
}

export default Account
