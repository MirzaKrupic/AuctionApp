import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const isUserLoggedIn = () => !!token;

  useEffect(() => {
    if (localStorage.getItem("myKey")) {
      setToken(localStorage.getItem("myKey"));
    }
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem("myKey", token);
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken, isUserLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
