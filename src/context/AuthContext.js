import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  let local_at = () =>
    localStorage.getItem("authTokens") &&
    JSON.parse(localStorage.getItem("authTokens"));
  let local_user = () =>
    localStorage.getItem("authTokens") &&
    jwt_decode(localStorage.getItem("authTokens"));
  let [authTokens, setAuthTokens] = useState(local_at);
  let [user, setUser] = useState(local_user);
  let [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  let loginUser = async (data) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/token/", {
        email: data.email,
        password: data.password,
      });

      console.log("response", response);

      if (response.status === 200) {
        const response_data = response.data;
        setAuthTokens(response_data);
        setUser(jwt_decode(response_data.access));
        localStorage.setItem("authTokens", JSON.stringify(response_data));
        navigate("/dashboard");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  let logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");

    if (!loading) navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser, authTokens }}>
      {children}
    </AuthContext.Provider>
  );
};
