// app/Components/OProducts.tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'

type OProduct = {
  _id: string
  name: string
  imageUrl: string
  price: number
  slug: string
}

export default function OProducts({ products }: { products: OProduct[] }) {
  return (
    <section className='px-4 py-12'>
      <div className='mb-8'>
        <h2 className='text-2xl md:text-3xl text-black/70 font-semibold tracking-tight text-center'>
          Our Products
        </h2>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
        {products.map((product) => (
          <Link
            key={product._id}
            href={`/products/${product.slug}`}
            className='group block'
          >
            <div className='relative aspect-[3/4.5] w-full overflow-hidden bg-gray-100 shadow-sm rounded-lg'>
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className='object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out'
              />
            </div>
            <div className='mt-2 text-sm text-gray-800 group-hover:underline'>
              {product.name}
            </div>
            <div className='text-sm font-semibold text-gray-600'>
              ₹{product.price}
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
