import { type SchemaTypeDefinition } from 'sanity'

// 👇 Import your schemas here
import oproduct from './oproducts'

// 👇 Export the full schema object
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [oproduct],
}
