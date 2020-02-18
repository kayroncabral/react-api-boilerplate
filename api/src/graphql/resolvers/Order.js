import User from '../../models/user'
import Customer from '../../models/customer'

const Order = {
  grocery(parent) {
    return User.findById(parent.grocery)
  },
  customer(parent) {
    return Customer.findById(parent.customer)
  },
}

export { Order as default }