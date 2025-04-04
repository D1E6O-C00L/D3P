import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./User/ts/App";
import Header from "./User/ts/Header";
import Card from "./User/ts/Card";
import Footer from "./User/ts/footer";
import Login from "./User/Login/Login";
import Registration from "./User/Registration/registro";
import Selection from "./User/ts/Selection";
import Categories from "./User/Categories/Categories";
import Customization from "./User/PersonalizedTShirt/index";
import PersonalizedCup from "./User/PersonalizedCup/index";
import Cart from "./User/shoppingCart/Cart";
import ResetPassword from "./User/Login/ResetPassword";
import { UserProvider } from "./User/context/UserContext";

import HeaderAdmin from "./Admin/Principal/HeaderAdmin";
import AdminDashboard from "./Admin/Principal/AdminDashboard";
import AdminProducts from "./Admin/Productos/AdminProducts";

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
          <Route path="/categories" element={<Categories />} />
          <Route path="/customization" element={<Customization />} />
          <Route path="/personalizedCup" element={<PersonalizedCup />} />
          <Route path="/carrito" element={<Cart />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/admin"
            element={
              <>
                <HeaderAdmin />
                <AdminDashboard />
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
        </Routes>
      </Router>
    </UserProvider>
  );
}
