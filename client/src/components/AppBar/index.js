import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import classNames from 'classnames'

import useMediaQuery from '@material-ui/core/useMediaQuery'
import AppBarBase from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Avatar from '@material-ui/core/Avatar'

import MenuIcon from '@material-ui/icons/Menu'
import StoreIcon from '@material-ui/icons/Store'

import { useTheme } from '@material-ui/core/styles'

import Spacer from '../Spacer'

import useStyles from './styles'

import { GET_APP, TOGGLE_DRAWER } from '../../graphql/app/gqls'

import useWidth from '../../utils/useWidth'

const AppBar = () => {
  const classes = useStyles()
  const theme = useTheme()
  const width = useWidth()
  const upMedium = useMediaQuery(theme.breakpoints.up('md'))

  const {
    loading,
    data: {
      app: { logged, grocery }
    }
  } = useQuery(GET_APP)
  const [toggleDrawer] = useMutation(TOGGLE_DRAWER)

  const handleToggleDrawer = () => {
    toggleDrawer({ variables: { width } })
  }

  if (!logged) return null

  return (
    <AppBarBase
      className={classNames(classes.appBar, { [classes.appBarShift]: upMedium })}
      color='default'
      elevation={0}
    >
      <Toolbar>
        <div className={classes.menu}>
          <IconButton className={classes.menuButton} aria-label='Menu' onClick={handleToggleDrawer}>
            <MenuIcon />
          </IconButton>
          {upMedium && (
            <>
              <StoreIcon className={classes.icon} color='primary' />
              <Typography className={classes.title} variant='h5'>
                {!loading && grocery && grocery.name}
              </Typography>
            </>
          )}
        </div>
        <Spacer />
        {!loading && grocery && <Avatar src={grocery.picture} alt={grocery.name} />}
      </Toolbar>
    </AppBarBase>
  )
}

export default AppBar
