// sanity/lib/queries.ts

// This query remains for your homepage "Oproducts" section
export const oproductsQuery = `*[_type == "oproduct" && isPopular == true] {
  _id,
  name,
  slug,
  price,
  isPopular,
  image {
    asset->{
      _id,
      url
    }
  }
}`

// Add this new query for the "All Products" page
export const allProductsQuery = `*[_type == "oproduct"] {
  _id,
  name,
  price,
  image,
  "slug": slug.current
}`