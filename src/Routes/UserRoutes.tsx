import { Routes, Route } from "react-router-dom";
import Header from "../User/ts/Header";
import Footer from "../User/ts/footer";
import App from "../User/ts/App";
import Card from "../User/ts/Card";
import Selection from "../User/ts/Selection";
import Login from "../User/Login/Login";
import Categories from "../User/Categories/Categories";
import Customization from "../User/PersonalizedTShirt/index";
import PersonalizedCup from "../User/PersonalizedCup/index";
import Registration from "../User/Registration/registro";
import Cart from "../User/shoppingCart/Cart";
import ResetPassword from "../User/Login/ResetPassword";

export default function UserRoutes() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<><Card /><App /><Footer /></>} />
        <Route path="/selection" element={<Selection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/customization" element={<Customization />} />
        <Route path="/personalizedCup" element={<PersonalizedCup />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/carrito" element={<Cart />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </>
  );
}
