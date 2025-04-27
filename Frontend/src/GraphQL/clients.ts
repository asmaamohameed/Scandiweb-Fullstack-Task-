import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";

const httpLink = new HttpLink({
  uri: "/api/graphql",

});

const client = new ApolloClient({
  link: from([httpLink]),
  cache: new InMemoryCache(),
});

export default client;
