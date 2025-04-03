import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../Login/Login";
import Header from "./Principal/HeaderAdmin";

createRoot(document.getElementById("Admin")!).render(
  <div className="bg-white">
    <StrictMode>
      <Router>
        <Routes>
          <Header />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </StrictMode>
  </div>
);
