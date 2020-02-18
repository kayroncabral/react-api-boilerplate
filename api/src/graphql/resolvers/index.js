import Query from './Query'
import Mutation from './Mutation'
import Subscription from './Subscription'
import Product from './Product'
import Order from './Order'
import Supplier from './Supplier'
import Inventory from './Inventory'
import Purchase from './Purchase'

const resolvers = {
  Query,
  Mutation,
  Subscription,
  Product,
  Order,
  Supplier,
  Inventory,
  Purchase,
}

export { resolvers as default }