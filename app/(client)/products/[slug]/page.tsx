// app/(client)/products/[slug]/page.tsx

import { client } from '@/sanity/lib/client'
import { notFound } from 'next/navigation'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'

// Defines the shape of the product data from Sanity
interface SanityProduct {
  _id: string;
  name: string;
  price: number;
  image: {
    asset: {
      _ref: string;
    };
  };
}

// Updated interface to match Next.js 15 requirements
interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Fetches the data for a single product
async function getProduct(slug: string): Promise<SanityProduct> {
  const query = `*[_type == "oproduct" && slug.current == $slug][0] {
    _id,
    name,
    price,
    image // Fetches the single image field
  }`

  const product = await client.fetch(query, { slug });
  if (!product) {
    notFound();
  }
  return product;
}

export default async function ProductPage({ params }: ProductPageProps) {
  // Await the params since it's now a Promise
  const { slug } = await params;
  const product = await getProduct(slug);

  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
        <div className='lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start'>
          {/* ## This is the section that creates the 1:1 image layout ## */}
          <div className='relative aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg'>
            <Image
              src={urlFor(product.image).width(1200).url()}
              alt={product.name}
              fill
              priority
              className='object-cover object-center'
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
            <div className='mt-10 flex'>
              <button
                type='submit'
                className='w-full max-w-xs flex-1 rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50'
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
