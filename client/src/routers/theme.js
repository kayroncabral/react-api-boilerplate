import { createMuiTheme } from '@material-ui/core/styles'
import blue from '@material-ui/core/colors/blue'


const theme = () => {
  return createMuiTheme({
    palette: {
      primary: blue
      // type: dark ? 'dark' : 'light',
    }
    // ...transitions,
  })
}

export { theme as default }
