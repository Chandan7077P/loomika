// app/(client)/AllProducts/page.tsx

import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import AllProducts from './AllProducts' // The client component
import { SanityOproduct } from '@/sanity.types' // 1. Import the auto-generated type

// Define the shape of the data we'll pass to the client component
type Product = {
  _id: string
  name: string
  price: number
  slug: string
  imageUrl: string
}

export default async function ProductsPage() {
  // 2. Fetch all products and type the result with our reliable, auto-generated type
  const rawProducts: SanityOproduct[] = await client.fetch(
    `*[_type == "oproduct"]{
      _id,
      name,
      price,
      image,
      "slug": slug.current
    }`
  )

  // 3. Process the raw data to create image URLs, just like before
  const products: Product[] = rawProducts.map((product) => ({
    _id: product._id,
    name: product.name,
    price: product.price,
    slug: product.slug,
    imageUrl: urlFor(product.image).width(600).url(),
  }))

  // 4. Render the client component with the processed products
  return <AllProducts products={products} />
}
