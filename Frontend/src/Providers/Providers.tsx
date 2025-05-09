import GraphQLProvider from "../GraphQL/GraphQLProvider";
import { CartProvider } from "../Context/CartContext";

const Providers = ({ children }: { children: React.ReactNode }) => (
  <GraphQLProvider>
    <CartProvider>{children}</CartProvider>
  </GraphQLProvider>
);

export default Providers;
