// app/(client)/page.tsx

import Hero from '../Components/Hero'
import OProducts from '../Components/OProducts'
import Contactus from '../Components/Contactus'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { SanityOproduct } from '@/sanity.types' // Import the auto-generated type

// This type defines the final shape of the data your OProducts component needs.
// It includes the `imageUrl` which is created by processing the raw Sanity data.
type OProduct = {
  _id: string
  name: string
  price: number
  slug: string
  imageUrl: string
}

export default async function HomePage() {
  // Fetch the raw data from Sanity.
  // We type the result of the fetch with the auto-generated `SanityOproduct` type.
  const rawProducts: SanityOproduct[] = await client.fetch(`
    *[_type == "oproduct" && isPopular == true]{
      _id,
      name,
      price,
      image,
      "slug": slug.current
    }
  `)

  // Transform the raw Sanity data into the shape your component expects.
  // This is where we use the urlFor helper to create a usable image URL.
  const products: OProduct[] = rawProducts.map((product) => ({
    _id: product._id,
    name: product.name,
    price: product.price,
    slug: product.slug,
    imageUrl: urlFor(product.image).width(600).url(),
  }))

  return (
    <>
      <Hero />
      <OProducts products={products} />
      <Contactus />
    </>
  )
}
