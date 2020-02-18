import Supplier from '../../models/supplier'
import User from '../../models/user'

const Purchase = {
  supplier(parent) {
    return Supplier.findById(parent.supplier)
  },
  grocery(parent) {
    return User.findById(parent.grocery)
  },
}

export { Purchase as default }