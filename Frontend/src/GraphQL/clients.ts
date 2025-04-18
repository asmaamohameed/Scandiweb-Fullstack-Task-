import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:8080/graphql", // or your actual backend endpoint
  cache: new InMemoryCache(),
});

export default client;
