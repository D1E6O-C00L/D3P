// src/Routes/PrivateRouteAdmin.tsx
import { Navigate } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";
import { ReactNode } from "react";

interface PrivateRouteAdminProps {
  children: ReactNode;
}

export default function PrivateRouteAdmin({
  children,
}: PrivateRouteAdminProps) {
  const { isAdminAuthenticated } = useAdmin();

  return isAdminAuthenticated ? <>{children}</> : <Navigate to="/admin" />;
}
