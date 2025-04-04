import { Routes, Route } from "react-router-dom";
import HeaderAdmin from "../Admin/Principal/HeaderAdmin";
import AdminDashboard from "../Admin/Principal/AdminDashboard";
import AdminProducts from "../Admin/Productos/AdminProducts";

export default function AdminRoutes() {
  return (
    <>
      <HeaderAdmin />
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/productos" element={<AdminProducts />} />
      </Routes>
    </>
  );
}
