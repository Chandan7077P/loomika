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
    <section className='min-h-screen bg-white px-4 py-12 text-gray-800 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <h1 className='text-3xl font-bold mb-10 text-center text-gray-900'>
          All Products
        </h1>

        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8'>
          {products.map((product) => (
            <Link
              key={product._id}
              href={`/products/${product.slug}`}
              className='group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white'
            >
              <div className='aspect-w-3 aspect-h-4 bg-gray-200 sm:aspect-none sm:h-60'>
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={400}
                  height={500}
                  className='h-full w-full object-cover object-center sm:h-full sm:w-full group-hover:scale-105 transition-transform duration-300'
                />
              </div>
              <div className='flex flex-1 flex-col space-y-2 p-4'>
                <h3 className='text-sm font-medium text-gray-900 group-hover:underline'>
                  {product.name}
                </h3>
                <div className='flex flex-1 flex-col justify-end'>
                  <p className='text-base font-semibold text-gray-900'>
                    ₹{product.price}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AllProducts