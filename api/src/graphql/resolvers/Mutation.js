import {
  updateMe,
  addEmployee,
  createGrocery,
  signinGoogleEmployer,
  signinGoogleEmployee
} from '../user/resolvers'

import {
  createProduct,
  updateProduct,
  deleteProduct,
  createProductBulk,
  updateAllCompletionIndexes,
} from '../product/resolvers'

import {
  addPayment,
  createOrder,
  addItemOrder,
  deleteItemOrder,
  cancelOrder,
  closeOrder,
  updateOrder
} from '../order/resolvers'

import {
  createCustomer,
  updateCustomer,
  deleteCustomer,
  createCustomerAddress,
  updateCustomerAddress,
  deleteCustomerAddress,
} from '../customer/resolvers'

import {
  addToInventory,
  increaseInventory,
  decreaseInventory,
} from '../inventory/resolvers'

import {
  createSupplier,
  updateSupplier,
  deleteSupplier,
} from '../supplier/resolvers'

import {
  addPurchase,
  createPurchaseItem,
  updatePurchaseItem,
  importPurchaseItems,
} from '../purchase/resolvers'

import {
  createSession,
  subscribePlan,
  cancelSubscription
} from '../subscription/resolvers'

const Mutation = {
  updateMe,
  addEmployee,
  createGrocery,
  signinGoogleEmployer,
  signinGoogleEmployee,

  createProduct,
  updateProduct,
  deleteProduct,
  createProductBulk,
  updateAllCompletionIndexes,

  addPayment,
  createOrder,
  addItemOrder,
  deleteItemOrder,
  cancelOrder,
  closeOrder,
  updateOrder,

  createCustomer,
  updateCustomer,
  deleteCustomer,
  createCustomerAddress,
  updateCustomerAddress,
  deleteCustomerAddress,

  addToInventory,
  increaseInventory,
  decreaseInventory,

  createSupplier,
  updateSupplier,
  deleteSupplier,

  addPurchase,
  createPurchaseItem,
  updatePurchaseItem,
  importPurchaseItems,

  createSession,
  subscribePlan,
  cancelSubscription
}

export { Mutation as default }
