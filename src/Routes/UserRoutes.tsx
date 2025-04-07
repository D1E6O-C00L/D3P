import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

// Lazy load components for better performance
const Header = lazy(() => import("../User/ts/Header"));
const Footer = lazy(() => import("../User/ts/footer"));
const App = lazy(() => import("../User/ts/App"));
const Card = lazy(() => import("../User/ts/Card"));
const Selection = lazy(() => import("../User/ts/Selection"));
const Login = lazy(() => import("../User/Login/Login"));
//const Categories = lazy(() => import("../User/Categories/Categories"));
const Customization = lazy(() => import("../User/PersonalizedTShirt/index"));
const PersonalizedCup = lazy(() => import("../User/PersonalizedCup/index"));
const Registration = lazy(() => import("../User/Registration/registro"));
const Cart = lazy(() => import("../User/shoppingCart/Cart"));
const ResetPassword = lazy(() => import("../User/Login/ResetPassword"));
const CategoryList = lazy(() => import("../User/Categories/CategoryList"));

export default function UserRoutes() {
  return (
    <Suspense fallback={<div className="text-center p-4">Cargando...</div>}>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <main aria-label="Página principal">
              <Card />
              <App />
              <Footer />
            </main>
          }
        />
        <Route
          path="/selection"
          element={<main aria-label="Selección de productos"><Selection /></main>}
        />
        <Route
          path="/login"
          element={<main aria-label="Inicio de sesión"><Login /></main>}
        />
        <Route
          path="/categories"
          element={<main aria-label="Categorías de productos"><CategoryList /></main>}
        />
        <Route
          path="/customization"
          element={<main aria-label="Personalización de camisetas"><Customization /></main>}
        />
        <Route
          path="/personalizedCup"
          element={<main aria-label="Personalización de tazas"><PersonalizedCup /></main>}
        />
        <Route
          path="/registration"
          element={<main aria-label="Registro de usuario"><Registration /></main>}
        />
        <Route
          path="/carrito"
          element={<main aria-label="Carrito de compras"><Cart /></main>}
        />
        <Route
          path="/reset-password"
          element={<main aria-label="Restablecimiento de contraseña"><ResetPassword /></main>}
        />
      </Routes>
    </Suspense>
  );
}