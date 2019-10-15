import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link'
import VueApollo from 'vue-apollo'
import { typeDefs } from '../services/graphql/resolvers'

const AUTH_TOKEN = 'scd-at'

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  //  uri: 'https://countries.trevorblades.com/'
  uri: 'http://148.220.209.221:4000/graphql'
})

// Middleware
const token = localStorage.getItem(AUTH_TOKEN) || null
const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      authorization: `${token}`
    }
  })
  return forward(operation)
})

const link = authMiddleware.concat(httpLink)

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
  link,
  cache,
  typeDefs
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

export default ({ app, Vue }) => {
  Vue.use(VueApollo)
  app.apolloProvider = apolloProvider
}
