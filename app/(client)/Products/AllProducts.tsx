// app/(client)/Products/AllProducts.tsx
'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

type Product = {
  _id: string
  name: string
  imageUrl: string
  price: number
  slug: string
}

const AllProducts = ({ products }: { products: Product[] }) => {
  return (
    <section className='min-h-screen w-full bg-white text-gray-800'>
      {/* Container to center the title */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <h1 className='text-3xl font-bold my-10 text-center text-gray-900'>
          All Products
        </h1>
      </div>

      {/* The product grid - no horizontal padding, no gaps */}
      <div className='grid grid-cols-2'>
        {products.map((product) => (
          <Link
            key={product._id}
            href={`/products/${product.slug}`}
            className='group relative flex flex-col overflow-hidden bg-white'
          >
            {/* Image container with a fixed aspect ratio and no rounded corners */}
            <div className='aspect-w-3 aspect-h-4 bg-gray-200'>
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className='object-cover object-center group-hover:scale-105 transition-transform duration-300'
              />
            </div>
            {/* Product info section */}
            <div className='flex flex-1 flex-col space-y-1 p-4'>
              <h3 className='text-sm font-medium text-gray-900'>
                {product.name}
              </h3>
              <p className='text-sm font-semibold text-gray-900'>
                ₹{product.price}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default AllProducts