import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { UserProvider } from "./User/context/UserContext";
import { AdminProvider } from "./context/AdminContext";
import PrivateRouteAdmin from "./Routes/PrivateRouteAdmin";
import PrivateAdminLayout from "./Routes/PrivateAdminLayout";

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

import AdminProducts from "./Admin/Productos/AdminProducts";
import AdminUsuarios from "./Admin/Usuario/AdminUsuarios";
import AdminCatalogos from "./Admin/Catalogos/AdminCatalogos";

import CheckoutForm from "./User/CheckoutForm/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import AdminLogin from "./Admin/LoginAdmin/AdminLogin";
import AdminPrincipal from "./Admin/Principal/AdminDashboard";

import LocationBanner from "./components/LocationBanner";

const stripePromise = loadStripe(
  "pk_test_51RBnSm0778qJCLUsPPjcPg9nsItXVR3TwXoeFoT6RvkqXFIscCDcUxFpcvl22XvkdOYNUNuPw6JBOkTHjCGn4QWC00WxOfYVaL"
);

function PublicLayout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
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

export default function AppRouter() {
  return (
    <UserProvider>
      <AdminProvider>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <PublicLayout>
                  <Card />
                  <App />
                </PublicLayout>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route
              path="/selection"
              element={
                <PublicLayout>
                  <Selection />
                </PublicLayout>
              }
            />
            <Route
              path="/categories"
              element={
                <PublicLayout>
                  <CategoryList />
                </PublicLayout>
              }
            />
            <Route
              path="/categorias/:id_categoria"
              element={
                <PublicLayout>
                  <ProductsByCategory />
                </PublicLayout>
              }
            />
            <Route
              path="/customization"
              element={
                <PublicLayout>
                  <Customization />
                </PublicLayout>
              }
            />
            <Route
              path="/personalizedCup"
              element={
                <PublicLayout>
                  <PersonalizedCup />
                </PublicLayout>
              }
            />
            <Route
              path="/carrito"
              element={
                <PublicLayout>
                  <Cart />
                </PublicLayout>
              }
            />
            <Route
              path="/TopSellers"
              element={
                <PublicLayout>
                  <TopSeller />
                </PublicLayout>
              }
            />
            <Route
              path="/checkout"
              element={
                <PublicLayout>
                  <Elements stripe={stripePromise}>
                    <div className="min-h-screen flex items-center justify-center">
                      <CheckoutForm />
                    </div>
                  </Elements>
                </PublicLayout>
              }
            />

            {/* Admin */}
            <Route path="/admin" element={<AdminLogin />} />

            <Route
              path="/admin/administrador-dashboard"
              element={
                <PrivateRouteAdmin>
                  <PrivateAdminLayout>
                    <AdminPrincipal />
                  </PrivateAdminLayout>
                </PrivateRouteAdmin>
              }
            />
            <Route
              path="/admin/productos"
              element={
                <PrivateRouteAdmin>
                  <PrivateAdminLayout>
                    <AdminProducts />
                  </PrivateAdminLayout>
                </PrivateRouteAdmin>
              }
            />
            <Route
              path="/admin/usuarios"
              element={
                <PrivateRouteAdmin>
                  <PrivateAdminLayout>
                    <AdminUsuarios />
                  </PrivateAdminLayout>
                </PrivateRouteAdmin>
              }
            />
            <Route
              path="/admin/catalogos"
              element={
                <PrivateRouteAdmin>
                  <PrivateAdminLayout>
                    <AdminCatalogos />
                  </PrivateAdminLayout>
                </PrivateRouteAdmin>
              }
            />
          </Routes>
        </Router>
      </AdminProvider>
    </UserProvider>
  );
}
