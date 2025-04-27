import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_API_URL,

});

const client = new ApolloClient({
  link: from([httpLink]),
  cache: new InMemoryCache(),
});

export default client;
