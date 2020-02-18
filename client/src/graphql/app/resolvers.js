import { GET_APP } from './queries'

export const updateApp = async (_, { input }, { cache }) => {
  const previous = cache.readQuery({ query: GET_APP })
  const data = { app: { ...previous.app, ...input } }
  cache.writeData({ query: GET_APP, data })
  return data.app
}

export const openSignout = async (_, variables, { cache }) => {
  const previous = cache.readQuery({ query: GET_APP })
  const data = { app: { ...previous.app, openSignout: true } }
  cache.writeData({ query: GET_APP, data })
}

export const closeSignout = async (_, variables, { cache }) => {
  const previous = cache.readQuery({ query: GET_APP })
  const data = { app: { ...previous.app, openSignout: false } }
  cache.writeData({ query: GET_APP, data })
}
