import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { isTokenValid } from "../utils/isTokenValid";
import type { ReactNode } from "react";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const token = useAuthStore((state) => state.token);

  if (!isTokenValid(token)) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
