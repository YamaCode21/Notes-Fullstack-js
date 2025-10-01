import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/DashboardPage";
import PrivateRoute from "./components/PrivateRoute";
import { useAuthStore } from "./store/authStore";
import { Toaster } from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import NotesTrash from "./pages/NotesTrash";
import DashboardLayout from "./layouts/DashboardLayout";

function App() {
  const token = useAuthStore((state) => state.token);

  const isAuthenticated = !!token;

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });

    AOS.refresh();
  }, []);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/login" element={<Login />} />
        {/* Rutas protegidas dentro del DashboardLayout */}
        <Route
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/papelera" element={<NotesTrash />} />
        </Route>
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
