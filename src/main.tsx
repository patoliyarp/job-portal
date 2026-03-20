// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import AuthProvider from "./context/AuthProvider.tsx";
import ThemeContextProvider from "./context/ThemeProvider.tsx";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <AuthProvider>
    <ThemeContextProvider>
      <App />
    </ThemeContextProvider>
  </AuthProvider>,
  // </StrictMode>,
);
