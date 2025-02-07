import { type SchemaTypeDefinition } from 'sanity'
import product from './product'
import order from './order'
import customer from './customer'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product,order,customer],
}
