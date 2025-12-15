import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import Loading from "../components/shared/Loading";

const RoleRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  if (!user) return <Loading />;

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default RoleRoute;
