import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface RouteProps {
  children: ReactNode;
}
const AdminRoute = ({ children }: RouteProps) => {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/products" replace />;
  }

  return children;
};

export default AdminRoute;
