import { ApolloClient, InMemoryCache } from "@apollo/client";

const graphqlEndpoint = import.meta.env.PROD
  ? '/graphql'
  : 'http://localhost:8080/graphql';
  


const client = new ApolloClient({
  uri: graphqlEndpoint,
  cache: new InMemoryCache(),
});

export default client;

