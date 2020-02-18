import fs from 'fs'
import express from 'express'
import { createServer } from 'http'
import { ApolloServer, gql, PubSub } from 'apollo-server-express'

// Routes
import pagseguro from './routes/pagseguro'

import { resolvers } from './graphql'

const pubsub = new PubSub()

const typeDefs = gql(fs.readFileSync(__dirname.concat('/graphql/typeDefs/schema.graphql'), 'utf8'))

const PORT = process.env.PORT || 4000

const app = express()
const router = express.Router()

app.use(express.urlencoded())

app.get('/', (req, res) => {
  res.send('Vem pra Mee pae! 🚀')
})

// Routes
pagseguro(router)

export const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    request: req,
    pubsub
  })
})

app.use('/api', router)

apolloServer.applyMiddleware({ app })

const httpServer = createServer(app)
apolloServer.installSubscriptionHandlers(httpServer)

httpServer.listen({ port: PORT }, () => {
  console.log(`NODE_ENV: ${process.env.NODE_ENV}`)
  console.log(`MONGODB_HOST: ${process.env.MONGODB_HOST}`)
  console.log(`MONGODB_DATABASE: ${process.env.MONGODB_DATABASE}`)
  console.log(`🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`)
  console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${apolloServer.subscriptionsPath}`)
})
