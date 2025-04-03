import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./css/index.css";
import App from "./ts/App.tsx";
import Header from "./ts/Header.tsx";
import Card from "./ts/Card.tsx";
import Customization from "./PersonalizedTShirt/index.tsx";
import Footer from "./ts/footer.tsx";
import Login from "./Login/Login.tsx";
import Categories from "./Categories/Categories.tsx";
import Selection from "./ts/Selection.tsx";
import PersonalizedCup from "./PersonalizedCup/index";
import Registration from "./Registration/registro";
import Cart from "./shoppingCart/Cart";
import ResetPassword from "./Login/ResetPassword"; // Importa el componente de ResetPassword
import { UserProvider } from "./context/UserContext"; // Importar el UserProvider

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider> {/* Envolver toda la aplicación con el UserProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<><Header /><Card /><App /><Footer /></>} />
          <Route path="/selection" element={<Selection />} />
          <Route path="/login" element={<Login />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/customization" element={<Customization />} />
          <Route path="/personalizedCup" element={<PersonalizedCup />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/carrito" element={<Cart />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </Router>
    </UserProvider>
  </StrictMode>
);
