import { useQuery } from '@apollo/react-hooks'

import { createMuiTheme } from '@material-ui/core/styles'
import blue from '@material-ui/core/colors/blue'

import { GET_SETTINGS } from '../graphql/settings/queries'

const theme = () => {
  // const {
  //   data: {
  //     settings: {
  //       options: { dark, performace }
  //     }
  //   }
  // } = useQuery(GET_SETTINGS)

  // const transitions = {}

  // if (performace) {
  //   transitions.transitions = { create: () => 'none' }
  // }

  return createMuiTheme({
    palette: {
      primary: blue
      // type: dark ? 'dark' : 'light',
    }
    // ...transitions,
  })
}

export { theme as default }
