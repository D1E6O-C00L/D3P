import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { UserProvider } from "./User/context/UserContext";

import App from "./User/ts/App";
import Header from "./User/ts/Header";
import Card from "./User/ts/Card";
import Footer from "./User/ts/footer";
import Login from "./User/Login/Login";
import Registration from "./User/Registration/registro";
import Selection from "./User/ts/Selection";
import Customization from "./User/PersonalizedTShirt/index";
import PersonalizedCup from "./User/PersonalizedCup/index";
import Cart from "./User/shoppingCart/Cart";
import ResetPassword from "./User/Login/ResetPassword";
import CategoryList from "./User/Categories/CategoryList";
import ProductsByCategory from "./User/Categories/ProductsByCategory";
import TopSeller from "./User/TopSellers/TopCart";
import LocationBanner from "./components/LocationBanner";

import HeaderAdmin from "./Admin/Principal/HeaderAdmin";
import AdminProducts from "./Admin/Productos/AdminProducts";
import AdminPedidos from "./Admin/Pedidos/AdminPedidos";
import AdminCatalogos from "./Admin/Catalogos/AdminCatalogos";

import CheckoutForm from "./User/CheckoutForm/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// ---------------  Stripe  ---------------
const stripePromise = loadStripe(
  "pk_test_51RBnSm0778qJCLUsPPjcPg9nsItXVR3TwXoeFoT6RvkqXFIscCDcUxFpcvl22XvkdOYNUNuPw6JBOkTHjCGn4QWC00WxOfYVaL"
);

// ---------------  Wrapper para el layout público ---------------
function PublicLayout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();

  // Rutas donde NO queremos mostrar header/banner/footer
  const authRoutes = ["/login", "/registration", "/reset-password"];

  const hideLayout = authRoutes.includes(pathname);

  return (
    <>
      {!hideLayout && <Header />}
      {!hideLayout && <LocationBanner />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
}

// ---------------  AppRouter ---------------
export default function AppRouter() {
  return (
    <UserProvider>
      <Router>
        <PublicLayout>
          <Routes>
            {/* ---------- Sitio público ---------- */}
            <Route path="/" element={<><Card /><App /></>} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/selection" element={<Selection />} />
            <Route path="/categories" element={<CategoryList />} />
            <Route path="/categorias/:id_categoria" element={<ProductsByCategory />} />
            <Route path="/customization" element={<Customization />} />
            <Route path="/personalizedCup" element={<PersonalizedCup />} />
            <Route path="/carrito" element={<Cart />} />
            <Route path="/TopSellers" element={<TopSeller />} />

            {/* Checkout con Stripe */}
            <Route
              path="/checkout"
              element={
                <Elements stripe={stripePromise}>
                  <div className="min-h-screen flex items-center justify-center">
                    <CheckoutForm />
                  </div>
                </Elements>
              }
            />

            {/* ---------- Área Admin ---------- */}
            <Route path="/admin" element={<Login />} />
            <Route
              path="/admin/productos"
              element={
                <>
                  <HeaderAdmin />
                  <AdminProducts />
                </>
              }
            />
            <Route
              path="/admin/pedidos"
              element={
                <>
                  <HeaderAdmin />
                  <AdminPedidos />
                </>
              }
            />
            <Route
              path="/admin/catalogos"
              element={
                <>
                  <HeaderAdmin />
                  <AdminCatalogos />
                </>
              }
            />
          </Routes>
        </PublicLayout>
      </Router>
    </UserProvider>
  );
}
