'use client'

import React from 'react'
import Image from 'next/image'

const products = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: `Sambalpuri Style ${i + 1}`,
  price: `₹${1499 + i * 50}`,
  image: `https://cdn.jsdelivr.net/gh/AiChandan007/loomika-Assets@main/product-${(i % 5) + 1}.jpg`,
}))

const Products = () => {
  return (
    <section className="min-h-screen bg-white px-6 py-12 text-gray-800">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold mb-8 text-center">All Products</h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-800">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Products
