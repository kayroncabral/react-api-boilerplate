import {
  updateApp,
  openSignout,
  closeSignout,
} from '../app/resolvers'

import {
  openNotification,
  closeNotification,
  clearNotification,
} from '../notification/resolvers'

const Mutation = {
  updateApp,
  openNotification,
  closeNotification,
  clearNotification,
  openSignout,
  closeSignout
}

export { Mutation as default }
