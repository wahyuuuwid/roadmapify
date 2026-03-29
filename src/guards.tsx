import { Navigate, useLocation } from "react-router-dom";

export const GuestOnly = ({ children }:any) => {
  const location = useLocation();
    
  const isAuth = !!localStorage.getItem("token");

  if (isAuth) {
    const from = location.state?.from || "/";
    return <Navigate to={from} replace />;
  }

  return children;
};

export const AuthOnly = ({ children }:any) => {
  const location = useLocation();
    
  const isAuth = !!localStorage.getItem("token");

  if (!isAuth) {
    const from = location.state?.from || "/";
    return <Navigate to={from} replace />;
  }

  return children;
};