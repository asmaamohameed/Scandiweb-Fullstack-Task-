import GraphQLProvider from "../graphql/GraphqlProvider";
import { CartProvider } from "../context/cartContext";

const Providers = ({ children }: { children: React.ReactNode }) => (
  <GraphQLProvider>
    <CartProvider>{children}</CartProvider>
  </GraphQLProvider>
);

export default Providers;
