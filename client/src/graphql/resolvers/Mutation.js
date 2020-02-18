import {
  updateApp,
  toggleDrawer,
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
  toggleDrawer,
  openSignout,
  closeSignout
}

export { Mutation as default }
