import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../Provider/AuthProvider";
import Loading from "../components/shared/Loading";

const PrivateRoute = ({ children }) => {
  const { user, loading, roleLoading } = useAuth();
  const location = useLocation();

  if (loading || roleLoading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
