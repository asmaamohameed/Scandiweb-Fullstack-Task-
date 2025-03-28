import { ApolloProvider } from "@apollo/client";
import client from "./GraphQL/clients";
import { RouterProvider } from "react-router-dom";
import router from "./routes/index";

const App = () => {
  return (
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  );
};

export default App;
