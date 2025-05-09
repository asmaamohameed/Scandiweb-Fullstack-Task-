import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({ uri: "https://sh1r3f.com/graphql" }),
  cache: new InMemoryCache(),
});

export default client;
