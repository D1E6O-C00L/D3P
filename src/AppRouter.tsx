import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import { UserProvider } from "./User/context/UserContext";
import CategoryList from "./User/Categories/CategoryList";
import ProductsByCategory from "./User/Categories/ProductsByCategory";
import TopSeller from "./User/TopSellers/TopCart";
import HeaderAdmin from "./Admin/Principal/HeaderAdmin";
import AdminProducts from "./Admin/Productos/AdminProducts";
import AdminPedidos from "./Admin/Pedidos/AdminPedidos";
import AdminCatalogos from "./Admin/Catalogos/AdminCatalogos";
import CheckoutForm from "./User/CheckoutForm/CheckoutForm";

// Importa Stripe
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Carga tu clave pública de Stripe
const stripePromise = loadStripe("pk_test_51RBnSm0778qJCLUsPPjcPg9nsItXVR3TwXoeFoT6RvkqXFIscCDcUxFpcvl22XvkdOYNUNuPw6JBOkTHjCGn4QWC00WxOfYVaL");

export default function AppRouter() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Card />
                <App />
                <Footer />
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/selection" element={<Selection />} />
          <Route path="/categories" element={<CategoryList />} />
          <Route path="/categorias/:id_categoria" element={<ProductsByCategory />} />
          <Route path="/customization" element={<Customization />} />
          <Route path="/personalizedCup" element={<PersonalizedCup />} />
          <Route path="/carrito" element={<Cart />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/TopSellers" element={<TopSeller />} />

          {/* Ruta para el formulario de pago */}
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

          <Route
            path="/admin"
            element={
              <>
                <Login />
              </>
            }
          />
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
      </Router>
    </UserProvider>
  );
}