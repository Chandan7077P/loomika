// app/(client)/products/[slug]/page.tsx

import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import { notFound } from 'next/navigation'

// Define the shape of the product data we expect from Sanity
type Product = {
  _id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
};

// This function fetches the data for a single product
async function getProduct(slug: string): Promise<Product | null> {
  const query = `*[_type == "oproduct" && slug.current == $slug][0] {
    _id,
    name,
    price,
    description,
    "imageUrl": image.asset->url
  }`

  const product = await client.fetch(query, { slug })

  return product
}

// This is the main page component
export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug)

  // If no product is found, show a 404 page
  if (!product) {
    notFound()
  }

  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
        <div className='lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start'>
          {/* Image gallery */}
          <div className='relative w-full aspect-w-1 aspect-h-1'>
            <Image
              src={urlFor(product.imageUrl).width(1200).url()}
              alt={product.name}
              fill
              priority
              className='object-center object-cover rounded-lg'
            />
          </div>

          {/* Product info */}
          <div className='mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0'>
            <h1 className='text-3xl font-extrabold tracking-tight text-gray-900'>
              {product.name}
            </h1>

            <div className='mt-3'>
              <p className='text-3xl text-gray-900'>₹{product.price}</p>
            </div>

            <div className='mt-6'>
              <h3 className='sr-only'>Description</h3>
              <div
                className='text-base text-gray-700 space-y-6'
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>

            <div className='mt-10 flex'>
              <button
                type='submit'
                className='max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full'
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}