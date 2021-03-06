import React from 'react'
import { render } from 'react-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import 'typeface-roboto'
import * as serviceWorker from './serviceWorker'

import client from './apollo'

import AppRouter from './routers/AppRouter'

const App = (
  <ApolloProvider client={client}>
    <AppRouter />
  </ApolloProvider>
)

render(App, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
