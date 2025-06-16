import { JSX, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; 

interface ProtectedRouteProps {
  children: JSX.Element;
  roles?: string[];
}

const ProtectedRoute = ({ children, roles }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {

    if (loading) return; // Prevent redirect while loading user data
    if (!user) {
      navigate("/login", { replace: true });
    } else if (roles && !user.roles?.some((role) => roles.includes(role))) {
      // console.log("Redirecting to /unauthorized"); // 🔍 Debugging log
      navigate("/unauthorized", { replace: true });
    }
  }, [user, roles, loading, navigate]);

  // if (!user || (roles && !user.roles?.some((role) => roles.includes(role)))) {
  //   return null; // Prevent rendering protected content while redirecting
  // }

  // 🚀 Only render children when authentication is ready
  if (loading || !user || (roles && !user.roles?.some((role) => roles.includes(role)))) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
