import { ApolloClient, InMemoryCache } from '@apollo/client';
import config from 'config';

const apolloClient = new ApolloClient({
  uri: config.public.graphqlEndpoint,
  cache: new InMemoryCache(),
  credentials: 'include',
});

export default apolloClient;
