// app/(client)/Products/AllProducts.tsx
'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

// Define the type here to avoid build errors
type Product = {
  _id: string;
  name: string;
  imageUrl: string;
  price: number;
  slug: string;
};

const AllProducts = ({ products }: { products: Product[] }) => {
  return (
    <section className='w-full bg-white'>
      <div className='mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8'>
        <h1 className='text-center text-3xl font-bold text-gray-900'>
          All Products
        </h1>
      </div>

      {/* Product grid starts here */}
      <div className='grid grid-cols-2'>
        {products.map((product) => (
          <Link
            key={product._id}
            href={`/products/${product.slug}`}
            className='group block border-b border-r border-gray-200'
          >
            {/* Image container with forced 3:4 aspect ratio */}
            <div className='relative overflow-hidden bg-gray-100' style={{ paddingTop: '133.33%' }}>
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                sizes='(max-width: 768px) 50vw, 33vw'
                className='absolute left-0 top-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
              />
            </div>

            {/* Product name and price */}
            <div className='p-3'>
              <h3 className='truncate text-sm font-medium text-gray-800 group-hover:underline'>
                {product.name}
              </h3>
              <p className='mt-1 text-sm font-semibold text-gray-900'>
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