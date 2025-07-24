// app/Components/OProducts.tsx
'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { OProduct } from '@/types'

const OProducts = ({ products }: { products: OProduct[] }) => {
  return (
    <section className='w-full bg-white text-gray-800'>
      {/* Container to center the title */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <h2 className='text-2xl font-bold my-10 text-center text-gray-900'>
          Featured Products
        </h2>
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

export default OProducts