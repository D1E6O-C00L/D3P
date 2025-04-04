import React from "react";
import { createRoot } from "react-dom/client";
import AppRouter from "./AppRouter";
import "./css/index.css"; // Asegúrate de que la ruta sea correcta

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);
