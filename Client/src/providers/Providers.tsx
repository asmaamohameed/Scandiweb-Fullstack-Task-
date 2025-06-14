import GraphQLProvider from "../graphql/GraphQLProvider";
import { CartProvider } from "../context/cartContext";

const Providers = ({ children }: { children: React.ReactNode }) => (
  <GraphQLProvider>
    <CartProvider>{children}</CartProvider>
  </GraphQLProvider>
);

export default Providers;
