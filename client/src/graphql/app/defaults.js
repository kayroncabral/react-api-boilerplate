import { load } from '../../utils/localStorage'
import {
  TOKEN_KEY,
  USER_KEY,
} from './constants'

const defaults = {
  logged: !!load(TOKEN_KEY),
  user: load(USER_KEY),
  openDrawer: {
    xs: false,
    sm: false,
    md: true,
    lg: true,
    xl: true,
    __typename: 'Drawer',
  },
  openRefreshSnackbar: false,
  openSignout: false,
  __typename: 'App',
}

export { defaults as default }
