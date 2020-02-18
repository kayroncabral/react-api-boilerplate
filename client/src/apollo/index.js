import ApolloClient from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { withClientState } from 'apollo-link-state'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory'

import { resolvers, defaults } from '../graphql'

import { TOKEN_KEY } from '../graphql/app/constants'

import { load } from '../utils/localStorage'

const cache = new InMemoryCache({
  dataIdFromObject: (object) => {
    switch (object.__typename) {
      case 'Order':
        return object._id
      case 'Product':
        return object.gtin
      case 'Customer':
        return object.cpf
      case 'Purchase':
        return object.accessKey
      default:
        return defaultDataIdFromObject(object)
    }
  },
  cacheRedirects: {
    Query: {
      order: (_, args, { getCacheKey }) => getCacheKey({ __typename: 'Order', _id: args._id }),
      product: (_, args, { getCacheKey }) => getCacheKey({ __typename: 'Product', gtin: args.gtin }),
      customer: (_, args, { getCacheKey }) => getCacheKey({ __typename: 'Customer', cpf: args.cpf }),
      purchase: (_, args, { getCacheKey }) => getCacheKey({ __typename: 'Purchase', accessKey: args.accessKey })
    }
  }
})

// Strip __typename from variables
const middlewareLink = new ApolloLink((operation, forward) => {
  if (operation.variables) {
    const omitTypename = (key, value) => (key === '__typename' ? undefined : value)
    operation.variables = JSON.parse(JSON.stringify(operation.variables), omitTypename)
  }
  return forward(operation)
})

const stateLink = withClientState({
  cache,
  defaults
})

const httpLink = new createHttpLink({
  uri: process.env.REACT_APP_API
})

const authLink = setContext((_, { headers }) => {
  const token = load(TOKEN_KEY)

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const client = new ApolloClient({
  link: ApolloLink.from([middlewareLink, stateLink, authLink, httpLink]),
  cache,
  resolvers
})

client.onResetStore(() => {
  cache.writeData({
    data: {
      ...defaults,
      app: {
        ...defaults.app,
        logged: false,
        grocery: null
      }
    }
  })
})

export { client as default }
