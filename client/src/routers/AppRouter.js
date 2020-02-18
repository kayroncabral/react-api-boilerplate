import React from 'react'
import { Router } from '@reach/router'
import { useQuery } from '@apollo/react-hooks'

import { MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import theme from './theme'

import AppBar from '../components/AppBar'
import Drawer from '../components/Drawer'
import BotoomNavigation from '../components/BottomNavigation'
import Snackbar from '../components/Snackbar'
import RefreshSnackbar from '../components/RefreshSnackbar'

import NotFoundView from '../views/NotFoundView'
import NoEmployerView from '../views/NoEmployerView'
import SigninView from '../views/SigninView'

import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

import { GET_APP } from '../graphql/app/gqls'

import { Paths } from '../utils/enums'

const AppRouter = () => {
  const { data: { app: { openRefreshSnackbar } } } = useQuery(GET_APP)

  return (
    <MuiThemeProvider theme={theme()}>
      <CssBaseline />
      <AppBar/>
      <Drawer/>
      <Router>
        <PublicRoute path={Paths.home.path} component={SigninView} />
        <PrivateRoute path={Paths.wait_for_employer.path} component={NoEmployerView} />
        <NotFoundView default />
      </Router>
      <BotoomNavigation/>
      <Snackbar />
      <RefreshSnackbar open={openRefreshSnackbar} />
    </MuiThemeProvider>
  )
}

export default AppRouter
