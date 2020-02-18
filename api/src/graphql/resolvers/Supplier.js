import User from '../../models/user'

const Supplier = {
  grocery(parent) {
    return User.findById(parent.grocery)
  },
}

export { Supplier as default }