import React from 'react'
import { Redirect } from '@reach/router'
import { useQuery } from '@apollo/react-hooks'

import Loading from '../components/Loading'
import Error from '../components/Error'

import { GET_APP } from '../graphql/app/gqls'

import {
  Paths,
  Roles
  /* PagSeguroSubscriptionStatus */
} from '../utils/enums'

const PrivateRoute = ({
  component: Component,
  ...props
}) => {
  const { loading, error, data: { app: { logged, grocery } } } = useQuery(GET_APP)

  if (loading) return <Loading message='Carregando'/>
  if (error) return <Error message='Ops... Alguma coisa deu errado'/>

  if (!logged) return <Redirect to={Paths.home.path} />

  // DISABLED FOR NOW
  // const isPlanActive = grocery.subscription && grocery.subscription.status === PagSeguroSubscriptionStatus.active
  let hasPermission = false

  if (grocery) {
    hasPermission = (grocery.role === Roles.admin.type ||
    grocery.role === Roles.employer.type ||
    (grocery.role === Roles.employee.type && grocery.employer))

    if (!hasPermission) {
      if (grocery.role === Roles.employee.type && !grocery.employer) {
        return <Redirect to={Paths.wait_for_employer.path} />
      } else {
        if (grocery.role === Roles.employer.type) return <Redirect to={Paths.reports.path} />
        if (grocery.role === Roles.employee.type) return <Redirect to={Paths.orders.path} />
      }
    }
  }

  return (
    hasPermission && <Component {...props}/>
  )
}

export default PrivateRoute
