import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import GraphQLProvider from "./GraphQL/GraphQLProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GraphQLProvider>
      <App />
    </GraphQLProvider>
  </StrictMode>
);
