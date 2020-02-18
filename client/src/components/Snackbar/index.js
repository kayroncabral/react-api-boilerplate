import React from 'react'
import classNames from 'classnames'
import { useQuery, useMutation } from '@apollo/react-hooks'

import SnackbarBase from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import IconButton from '@material-ui/core/IconButton'

import Close from '@material-ui/icons/Close'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import WarningIcon from '@material-ui/icons/Warning'

import useStyles from './styles'

import { GET_NOTIFICATION, CLOSE_NOTIFICATION, CLEAR_NOTIFICATION } from '../../graphql/notification/queries'

import { SnackbarVariations } from '../../utils/enums'

const variantIcon = {
  [SnackbarVariations.success]: CheckCircleIcon,
  [SnackbarVariations.warning]: WarningIcon,
  [SnackbarVariations.error]: ErrorIcon,
  [SnackbarVariations.info]: InfoIcon
}

const Snackbar = () => {
  const classes = useStyles()
  const {
    data: { notification }
  } = useQuery(GET_NOTIFICATION)
  const [closeNotification] = useMutation(CLOSE_NOTIFICATION)
  const [clearNotification] = useMutation(CLEAR_NOTIFICATION)

  const handleClose = () => {
    closeNotification()
  }

  const handleExited = () => {
    clearNotification()
  }

  const { open, variant, message } = notification
  const Icon = variantIcon[variant]

  return (
    <SnackbarBase
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      onExited={handleExited}
      ContentProps={{ 'aria-describedby': 'message-id' }}
    >
      <SnackbarContent
        className={classNames(classes.content, classes[variant])}
        data-cy='snackbar-content'
        aria-describedby='snackbar-message'
        message={
          <span className={classes.message} id='snackbar-message'>
            {variant && <Icon className={classes.iconVariant} fontSize='small' />}
            {message}
          </span>
        }
        action={
          <IconButton key='close' aria-label='Close' color='inherit' onClick={handleClose}>
            <Close fontSize='small' />
          </IconButton>
        }
      />
    </SnackbarBase>
  )
}

export default Snackbar
