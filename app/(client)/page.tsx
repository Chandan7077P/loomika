import Hero from '../Components/Hero'
import OProducts from '../Components/OProducts'
import Contactus from '../Components/Contactus'
import { client } from '../../sanity/lib/client' // ✅ corrected import

export default async function HomePage() {
  const products = await client.fetch(`
    *[_type == "oproduct" && isPopular == true]{
      _id,
      name,
      price,
      "imageUrl": image.asset->url,
      "slug": slug.current
    }
  `)

  return (
    <>
      <Hero />
      <OProducts products={products} />
      <Contactus />
    </>
  )
}
