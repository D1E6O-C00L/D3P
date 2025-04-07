import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

// Lazy load components for better performance
const HeaderAdmin = lazy(() => import("../Admin/Principal/HeaderAdmin"));
const AdminDashboard = lazy(() => import("../Admin/Principal/AdminDashboard"));
const AdminProducts = lazy(() => import("../Admin/Productos/AdminProducts"));
const AdminPedidos = lazy(() => import("../Admin/Pedidos/AdminPedidos"));

export default function AdminRoutes() {
  return (
    <Suspense fallback={<div className="text-center p-4">Cargando...</div>}>
      <Routes>
        <Route
          path="/admin"
          element={
            <div aria-label="Panel de administración">
              <HeaderAdmin />
              <AdminDashboard />
            </div>
          }
        />
        <Route
          path="/admin/productos"
          element={
            <div aria-label="Gestión de productos">
              <HeaderAdmin />
              <AdminProducts />
            </div>
          }
        />
        <Route
          path="/admin/pedidos"
          element={
            <div aria-label="Gestión de pedidos">
              <HeaderAdmin />
              <AdminPedidos />
            </div>
          }
        />
      </Routes>
    </Suspense>
  );
}