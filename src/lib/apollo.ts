import { ApolloClient, InMemoryCache } from '@apollo/client'

export const client = new ApolloClient({
  uri: 'https://api-sa-east-1.hygraph.com/v2/cll2muajj0twj01un7y2p16j6/master',
  cache: new InMemoryCache(),
})
