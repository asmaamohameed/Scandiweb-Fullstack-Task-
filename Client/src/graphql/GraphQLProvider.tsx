import { ApolloProvider } from "@apollo/client";
import client from "./clients";

const GraphQLProvider = ({ children }: { children: React.ReactNode }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);

export default GraphQLProvider;
