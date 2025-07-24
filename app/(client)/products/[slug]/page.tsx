// app/(client)/products/[slug]/page.tsx

import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react' // Import the new component

// Define the shape of the product data we expect
type Product = {
  _id: string;
  name: string;
  price: number;
  description: any; // Use 'any' for Portable Text content
  image: {
    asset: {
      _ref: string;
    };
  };
};

// Define the shape of the component's props robustly
interface Props {
  params: {
    slug: string;
  };
}

// This function fetches the data for a single product
async function getProduct(slug: string): Promise<Product | null> {
  // Update the query to fetch the full image object and description
  const query = `*[_type == "oproduct" && slug.current == $slug][0] {
    _id,
    name,
    price,
    description,
    image
  }`

  const product = await client.fetch(query, { slug })
  return product
}

// This is the main page component, now using the 'Props' interface
export default async function ProductPage({ params }: Props) {
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

            <div className='mt-6 prose text-base text-gray-700 space-y-6'>
              {/* Safely render the description using PortableText */}
              <PortableText value={product.description} />
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