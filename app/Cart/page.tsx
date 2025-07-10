'use client'

import React from 'react'
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react' // Optional icon, install `lucide-react`

const Cart = () => {
  return (
    <section className="min-h-screen bg-white text-gray-800 px-6 py-20 flex flex-col items-center justify-center text-center">
      <ShoppingCart className="w-16 h-16 text-gray-400 mb-6" />

      <h1 className="text-2xl font-semibold mb-2">Your Cart is Empty</h1>

      <p className="text-gray-600 mb-6">Looks like you haven’t added anything to your cart yet.</p>

      <Link
        href="/products"
        className="inline-block px-6 py-3 bg-blue-900 text-white rounded-full font-medium hover:bg-blue-800 transition"
      >
        Browse Products
      </Link>
    </section>
  )
}

export default Cart
