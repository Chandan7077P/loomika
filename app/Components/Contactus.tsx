'use client'

import React, { useState } from 'react'

const Contactus = () => {
  const [message, setMessage] = useState('')

  const handleSubmit = () => {
    const phoneNumber = '917077683007'
    const encodedMessage = encodeURIComponent(message.trim())
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`

    if (message.trim()) {
      window.open(url, '_blank')
    }
  }

  return (
    <section className='px-6 py-6 bg-white text-black/70 max-w-3xl mx-auto'>
      <h2 className='text-2xl md:text-3xl font-semibold text-center mb-6'>
        Chat with Us
      </h2>

      <div className='bg-gray-100 p-6 rounded-xl shadow-md'>
        <label
          htmlFor='query'
          className='block text-lg font-medium text-gray-700 mb-2'
        >
          Your Message
        </label>
        <textarea
          id='query'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          placeholder='Type your query here...'
          className='w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none'
        />

        <button
          onClick={handleSubmit}
          className='mt-4 w-full bg-green-600 text-white py-3 rounded-full font-semibold hover:bg-green-700 transition'
        >
          Send on WhatsApp
        </button>
      </div>
    </section>
  )
}

export default Contactus
