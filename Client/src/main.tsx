import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import Providers from "./providers/Providers";
import { ToastProvider } from "./context/toastContext";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Providers>
      <ToastProvider>
        <App />
      </ToastProvider>
    </Providers>
  </React.StrictMode>
);
