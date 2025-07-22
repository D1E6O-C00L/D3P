import React from "react";
import { createRoot } from "react-dom/client";
import AppRouter from "./AppRouter";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { CurrencyProvider } from "./context/CurrencyContext";  

createRoot(document.getElementById("root")!).render(
  <CurrencyProvider>                                            
    <GoogleOAuthProvider clientId="19247130242-m3jv7do0nds9b2boikqjlr2ag22f0c9p.apps.googleusercontent.com">
      <React.StrictMode>
        <AppRouter />
      </React.StrictMode>
    </GoogleOAuthProvider>
  </CurrencyProvider>
);
