import ReactDOM from 'react-dom/client'
import App from './App'

import { ApolloClient, HttpLink, InMemoryCache, ApolloLink } from '@apollo/client'
import { ApolloProvider } from '@apollo/client/react'

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
  uri: 'http://localhost:4000/graphql',
});

// Combine links
const link = ApolloLink.from([authLink, httpLink]);


const client = new ApolloClient({
  cache: new InMemoryCache(),
  link
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)