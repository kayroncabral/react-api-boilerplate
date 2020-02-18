import { ObjectID } from 'mongodb'

import { salesReport } from '../statistics/resolvers'

import { product, products, searchProducts } from '../product/resolvers'

import { order, orders } from '../order/resolvers'

import { customer, customers, searchCustomers } from '../customer/resolvers'

import { supplier, suppliers } from '../supplier/resolvers'

import { purchase, purchases } from '../purchase/resolvers'

import { billingHistory } from '../subscription/resolvers'

import User from '../../models/user'
import Inventory from '../../models/inventory'

import { authenticate } from '../../utils/user'
import { pagination } from '../../utils/pagination'

const Query = {
  async me(parent, args, { request }, info) {
    const userId = await authenticate(request, true, true)

    const me = await User.findById(userId)
    if (!me) throw new Error('User not found')

    return me
  },

  async user(parent, args, { request }, info) {
    await authenticate(request)

    if (!ObjectID.isValid(args.id)) throw new Error('Usuário não encontado')

    const user = await User.findById(args.id)
    if (!user) throw new Error('Usuário não encontado')

    return user
  },
  product,
  products,
  searchProducts,

  order,
  orders,

  customer,
  customers,
  searchCustomers,

  async movements(parent, args, { request }, info) {
    const userId = await authenticate(request)

    const { first, skip } = args
    const movements = await Inventory.find(
      {
        product: new ObjectID(args.productId),
        grocery: new ObjectID(userId)
      },
      null,
      { skip: skip, limit: first }
    )
    if (!movements) throw new Error('Error while fetch inventory movements')

    const count = await Inventory.countDocuments({
      product: new ObjectID(args.productId),
      grocery: new ObjectID(userId)
    })

    const movementsPaginationPayload = {
      movements,
      pagination: pagination({ first, skip, count })
    }

    return movementsPaginationPayload
  },

  supplier,
  suppliers,

  purchase,
  purchases,
  salesReport,

  billingHistory
}

export { Query as default }
