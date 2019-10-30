import { ApolloClient, ApolloLink } from 'apollo-boost'
import { createUploadLink } from 'apollo-upload-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
// import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { host } from '../../enviroment.dev'
// import VueApollo from 'vue-apollo'

const AUTH_TOKEN = 'scd-at'
const token = localStorage.getItem(AUTH_TOKEN) || null
// const httpLink = new HttpLink({
//   // You should use an absolute URL here
//   uri: 'http://192.168.43.43:4000/graphql'
// })

const uploadLink = createUploadLink({ uri: host })

const authLink = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      authorization: `${token}`
    }
  })
  return forward(operation)
})

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message))
})

const cache = new InMemoryCache()

export const apolloClient = new ApolloClient({
  cache,
  link: ApolloLink.from([errorLink, authLink, uploadLink])
})

// const apolloProvider = new VueApollo({
//   // clients: {
//   //   a: client
//   // }
//   defaultClient: client
// })

// export default ({ app, Vue }) => {
//   Vue.use(VueApollo)
//   app.apolloProvider = apolloProvider
// }
