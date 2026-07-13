import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, isAuthenticated }: any) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
