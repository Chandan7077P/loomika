// app/(client)/Products/page.tsx

import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import AllProducts from './AllProducts' // The new client component

// Define the shape of the data coming from Sanity
type SanityProduct = {
  _id: string
  name: string
  price: number
  image: {
    asset: {
      _ref: string
    }
  }
  slug: string // Slug is already a string here from the query
}

// Define the shape of the data we'll pass to the component
type Product = {
  _id: string
  name: string
  price: number
  slug: string
  imageUrl: string
}

export default async function ProductsPage() {
  // Fetch all products using the new query
  const rawProducts: SanityProduct[] = await client.fetch(
    `*[_type == "oproduct"]{
      _id,
      name,
      price,
      image,
      "slug": slug.current
    }`
  )

  // Process the data to create image URLs
  const products: Product[] = rawProducts.map((product) => ({
    _id: product._id,
    name: product.name,
    price: product.price,
    slug: product.slug,
    imageUrl: urlFor(product.image).width(600).url(),
  }))

  // Render the client component with the fetched products
  return <AllProducts products={products} />
}