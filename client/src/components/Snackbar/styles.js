import { makeStyles } from '@material-ui/core/styles'

import green from '@material-ui/core/colors/green'
import amber from '@material-ui/core/colors/amber'
import blue from '@material-ui/core/colors/blue'

import { SnackbarVariations } from '../../utils/enums'

const useStyles = makeStyles((theme) => ({
  content: {
    color: theme.palette.common.white
  },
  [SnackbarVariations.success]: {
    backgroundColor: green[600]
  },
  [SnackbarVariations.error]: {
    backgroundColor: theme.palette.error.dark
  },
  [SnackbarVariations.info]: {
    backgroundColor: theme.palette.primary.dark
  },
  [SnackbarVariations.warning]: {
    backgroundColor: amber[700]
  },
  [SnackbarVariations.refresh]: {
    backgroundColor: blue[700]
  },
  iconVariant: {
    marginRight: theme.spacing(1)
  },
  message: {
    display: 'flex',
    alignItems: 'center'
  }
}))

export default useStyles
