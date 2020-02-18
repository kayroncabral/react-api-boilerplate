import React from 'react'
import { useQuery } from '@apollo/react-hooks'

import Loading from '../components/Loading'

import { GET_APP } from '../graphql/app/queries'

const PublicRoute = (props) => {
  // const { loading, error, data: { app: { logged } } } = useQuery(GET_APP)

  // if (loading) return <Loading message='Carregando'/>
  // if (error) return <div>Ops... Alguma coisa deu errado</div>

  const {
    component: Component,
    ...rest
  } = props

  // if (logged) {
  // }

  return (
    <Component {...rest}/>
  )
}

export default PublicRoute
