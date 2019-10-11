import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'
import { typeDefs } from '../services/graphql/resolvers'

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  //  uri: 'https://countries.trevorblades.com/'
  uri: 'http://148.220.210.76:4000/graphql'
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
  typeDefs,
  resolvers: {}
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

export default ({ app, Vue }) => {
  Vue.use(VueApollo)
  app.apolloProvider = apolloProvider
}
