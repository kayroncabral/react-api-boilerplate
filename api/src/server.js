import express from 'express'
import fs from 'fs'
import { ApolloServer, gql, PubSub } from 'apollo-server-express'

import { resolvers } from './graphql'

const pubsub = new PubSub()

const typeDefs = gql(fs.readFileSync(__dirname.concat('/graphql/typeDefs/schema.graphql'), 'utf8'))

const PORT = process.env.PORT || 4000

export const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    request: req,
    pubsub
  })
})

const app = express()
server.applyMiddleware({ app })

app.listen({ port: PORT }, () => {
  console.log(`NODE_ENV: ${process.env.NODE_ENV}`)
  console.log(`MONGODB_HOST: ${process.env.MONGODB_HOST}`)
  console.log(`MONGODB_DATABASE: ${process.env.MONGODB_DATABASE}`)
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`)
})
