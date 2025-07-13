// sanity/lib/queries.ts
export const oproductsQuery = `*[_type == "oproduct"] {
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
