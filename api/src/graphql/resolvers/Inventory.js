import Product from '../../models/product'
import Supplier from '../../models/supplier'
import User from '../../models/user'

const Inventory = {
  product(parent) {
    return Product.findById(parent.product)
  },
  supplier(parent) {
    return Supplier.findById(parent.supplier)
  },
  grocery(parent) {
    return User.findById(parent.grocery)
  },
}

export { Inventory as default }