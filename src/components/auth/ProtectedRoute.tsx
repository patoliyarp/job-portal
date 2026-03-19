import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function ProtectedRoute() {
  const { isLogin } = useAuth();
  if (isLogin) {
    return <Outlet />;
  }
  return <Navigate to="/login" />;
}

export default ProtectedRoute;
