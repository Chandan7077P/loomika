// sanity/schemaTypes/index.ts
import { type SchemaTypeDefinition } from 'sanity'

// Import all your schemas
import oproduct from './oproducts'
// import category from './category' // <-- Example: Add other schemas like this
// import author from './author'   // <-- Example: And this one

export const schemaTypes: SchemaTypeDefinition[] = [
  oproduct,
  // category, // <-- Then add them to the array
  // author,
]