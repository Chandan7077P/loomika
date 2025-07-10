'use client'

import Image from 'next/image'
import Link from 'next/link'

const products = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Sambalpuri Style ${i + 1}`,
  image: `https://cdn.jsdelivr.net/gh/AiChandan007/loomika-Assets@main/product-${
    (i % 5) + 1
  }.jpg`,
  price: `₹${1499 + i * 50}`,
  slug: `/products/sambalpuri-style-${i + 1}`,
}))

const NewAndPopularSection = () => {
  return (
    <section className='px-4 py-12'>
      <div className='mb-8'>
        <h2 className='text-2xl md:text-3xl text-black/70 font-semibold tracking-tight text-center'>
          New & Popular
        </h2>
      </div>

      {/* Fixed 2-column layout on all screen sizes */}
      <div className='grid grid-cols-2 gap-4'>
        {products.map((product) => (
          <Link key={product.id} href={product.slug} className='group block'>
            <div className='relative aspect-[3/4.5] w-full overflow-hidden bg-gray-100 shadow-sm'>
              <Image
                src={product.image}
                alt={product.name}
                fill
                className='object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out'
              />
            </div>
            <div className='mt-2 text-sm text-gray-800 group-hover:underline'>
              {product.name}
            </div>
            <div className='text-sm font-semibold text-gray-600'>
              {product.price}
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default NewAndPopularSection
