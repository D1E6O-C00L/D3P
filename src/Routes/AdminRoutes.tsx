import { Routes, Route } from "react-router-dom";
import HeaderAdmin from "../Admin/Principal/HeaderAdmin";
import AdminDashboard from "../Admin/Principal/AdminDashboard";
import AdminProducts from "../Admin/Productos/AdminProducts";
import AdminPedidos from "../Admin/Pedidos/AdminPedidos";


export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/admin" element={<><HeaderAdmin /><AdminDashboard /></>} />
      <Route path="/admin/productos" element={<><HeaderAdmin /><AdminProducts /></>} />
      <Route path="/admin/pedidos" element={<><HeaderAdmin /><AdminPedidos /></>} />
    </Routes>
  );
}
