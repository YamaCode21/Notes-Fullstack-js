import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import type { JSX } from "react";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { token } = useAuthStore();

  return token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
