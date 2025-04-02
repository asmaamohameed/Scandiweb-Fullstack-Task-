import { ApolloProvider } from "@apollo/client";
import client from "./GraphQL/clients";
import { RouterProvider } from "react-router-dom";
import router from "./routes/index";
import { CartProvider  } from "../src/Context/CartContext";

const App = () => {
  return (
    <ApolloProvider client={client}>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </ApolloProvider>
  );
};

export default App;
