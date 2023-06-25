import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const LoginRequired = () => {
  const { user } = useContext(AuthContext);
  console.log("user in login", user);
  return user?.token_type ? <Outlet /> : <Navigate to="/login" />;
};

export default LoginRequired;
