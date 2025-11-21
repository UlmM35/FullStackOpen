import ReactDOM from 'react-dom/client'
import App from './App'

import { ApolloClient, HttpLink, InMemoryCache, ApolloLink } from '@apollo/client'
import { ApolloProvider } from '@apollo/client/react'

import { getMainDefinition } from '@apollo/client/utilities'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('phonenumbers-user-token')
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : null,
    },
  })
  return forward(operation)
})

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/',
});

const wsLink = new GraphQLWsLink(
  createClient({ url: 'ws://localhost:4000/', })
)

const splitLink = ApolloLink.split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,                
  authLink.concat(httpLink)
)

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)