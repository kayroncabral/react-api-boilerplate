import React from 'react'
import { Redirect } from '@reach/router'
import { useQuery } from '@apollo/react-hooks'

import Loading from '../components/Loading'

import { GET_APP } from '../graphql/app/queries'

import {
  Paths
} from '../utils/enums'

const PrivateRoute = ({
  component: Component,
  ...props
}) => {
  const { loading, error, data: { app: { logged, grocery } } } = useQuery(GET_APP)

  if (loading) return <Loading message='Carregando'/>
  if (error) return <div>Ops... Alguma coisa deu errado</div>

  if (!logged) return <Redirect to={Paths.home.path} />

  // DISABLED FOR NOW
  // const isPlanActive = grocery.subscription && grocery.subscription.status === PagSeguroSubscriptionStatus.active
  let hasPermission = false

  if (grocery) { }

  return (
    hasPermission && <Component {...props}/>
  )
}

export default PrivateRoute
