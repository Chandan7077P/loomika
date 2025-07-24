// app/(client)/products/[slug]/page.tsx

import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import { notFound } from 'next/navigation'

// Define the shape of the data, now without the description
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

// Define the props for our page component - FIXED for Next.js 15
interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Fetch the product data, removing 'description' from the query
async function getProduct(slug: string): Promise<SanityProduct> {
  const query = `*[_type == "oproduct" && slug.current == $slug][0] {
    _id,
    name,
    price,
    image
  }`

  const product = await client.fetch(query, { slug });
  if (!product) {
    notFound();
  }
  return product;
}

// This is the main page component - FIXED for Next.js 15
export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params; // ADDED: await the params Promise
  const product = await getProduct(slug);

  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
        <div className='lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start'>
          {/* Image gallery */}
          <div className='relative w-full aspect-w-1 aspect-h-1'>
            <Image
              src={urlFor(product.image).width(1200).url()}
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

            {/* The description section has been completely removed */}

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
  );
}

//100th Comit