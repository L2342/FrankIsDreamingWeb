// src/App.tsx
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { useContext } from "react";

import Home from "./pages/Home";
import SubscribePage from "./pages/suscribePage";
import Devlogs from "./pages/Devlogs";
import DevlogDetail from "./pages/DevlogDetail";
import AdminDevlogs from "./pages/admin/AdminDevlogs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/layouts/Header";

function ProtectedRoute({ children, requireAdmin = false }) {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" replace />;
  if (requireAdmin && user.role !== "admin") return <Navigate to="/" replace />;
  return children;
}

function Layout() {
  const location = useLocation();
  const showHeader = ["/", "/devlogs", "/login", "/admin/devlogs", "/devlogs/:id"].includes(location.pathname);

  return (
    <>
      {showHeader && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/subscribe" element={<SubscribePage />} />
        <Route path="/devlogs" element={<Devlogs />} />
        <Route path="/devlogs/:id" element={<DevlogDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/admin/devlogs"
          element={
            <ProtectedRoute requireAdmin>
              <AdminDevlogs />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout />
      </Router>
    </AuthProvider>
  );
}
