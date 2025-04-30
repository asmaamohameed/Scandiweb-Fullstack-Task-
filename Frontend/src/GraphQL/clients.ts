import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

// Set the GraphQL endpoint based on the environment
const graphqlEndpoint = import.meta.env.PROD
  ? "https://sh1r3f.com/graphql"
  : "http://localhost:8080/graphql";

const client = new ApolloClient({
  link: new HttpLink({ uri: graphqlEndpoint }),
  cache: new InMemoryCache(),
});

export default client;
