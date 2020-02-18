import { ObjectID } from 'mongodb'

import UserProduct from '../../models/userProduct'

import { authenticate } from '../../utils/user'

const Product = {
  price: async (parent, args, { request }, info) => {
    const userId = await authenticate(request)
    const conditions = { grocery: new ObjectID(userId), product: new ObjectID(parent._id)}

    const { price } = await UserProduct.findOne(conditions)
    return price
  },
  deletedAt: async (parent, args, { request }, info) => {
    const userId = await authenticate(request)
    const conditions = { grocery: new ObjectID(userId), product: new ObjectID(parent._id)}

    const { deletedAt } = await UserProduct.findOne(conditions)
    return deletedAt
  },
}

export { Product as default }