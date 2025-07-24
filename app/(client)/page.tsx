// app/(client)/page.tsx
import Hero from '../Components/Hero'
import OProducts from '../Components/OProducts'
import Contactus from '../Components/Contactus'

import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'

type SanityProduct = {
  _id: string
  name: string
  price: number
  image: {
    asset: {
      _ref: string
    }
  }
  slug: string // The query returns slug as a string
}

type OProduct = {
  _id: string
  name: string
  price: number
  slug: string
  imageUrl: string
}

export default async function HomePage() {
  const rawProducts: SanityProduct[] = await client.fetch(`
    *[_type == "oproduct" && isPopular == true]{
      _id,
      name,
      price,
      image,
      "slug": slug.current
    }
  `)

  const products: OProduct[] = rawProducts.map((product) => ({
    _id: product._id,
    name: product.name,
    price: product.price,
    slug: product.slug, // <-- THE FIX IS HERE: Changed from product.slug.current
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