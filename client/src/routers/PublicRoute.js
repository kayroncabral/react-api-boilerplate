import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Redirect } from '@reach/router'

import Loading from '../components/Loading'
import Error from '../components/Error'

import { GET_APP } from '../graphql/app/gqls'

import {
  Paths,
  Roles
} from '../utils/enums'

const PublicRoute = (props) => {
  const { loading, error, data: { app: { logged, grocery } } } = useQuery(GET_APP)

  if (loading) return <Loading message='Carregando'/>
  if (error) return <Error message='Ops... Alguma coisa deu errado'/>

  const {
    component: Component,
    ...rest
  } = props

  if (logged) {
    // DISABLED FOR NOW
    // if (grocery.subscription && grocery.subscription.status === 'ACTIVE') {
    //   redirect = (<Redirect to={Paths.reports.path}/>)
    // } else {
    //   redirect = (<Redirect to={Paths.subscribe.path}/>)
    // }

    if (grocery.role === Roles.admin.type || grocery.role === Roles.employer.type) {
      return <Redirect to={Paths.reports.path} />
    } else if (grocery.role === Roles.employee.type && !grocery.employer) {
      return <Redirect to={Paths.wait_for_employer.path} />
    } else if (grocery.role === Roles.employee.type && grocery.employer) {
      return <Redirect to={Paths.orders.path} />
    }
  }

  return (
    <Component {...rest}/>
  )
}

export default PublicRoute
