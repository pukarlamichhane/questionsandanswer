/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [authError, setAuthError] = useState(null); // For error handling

  const login = async (email, password) => {
    setAuthError(null); // Reset error before making request
    try {
      const response = await axios.post("/api/login", { email, password });
      const { token, role, email: returnedEmail } = response.data;

      localStorage.setItem("authToken", token);
      localStorage.setItem("userRole", role);
      localStorage.setItem("userEmail", returnedEmail);

      setIsAuthenticated(true);
      setUserRole(role);
      setUserEmail(returnedEmail);
    } catch (error) {
      const message = error.response?.data?.message || "Login failed";
      setAuthError(message);
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");

    setIsAuthenticated(false);
    setUserRole(null);
    setUserEmail("");
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const role = localStorage.getItem("userRole");
    const email = localStorage.getItem("userEmail");

    if (token) {
      setIsAuthenticated(true);
      setUserRole(role);
      setUserEmail(email);
    }

    // Optional cleanup if needed
    return () => {
      // Perform cleanup actions if required
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userRole, login, logout, userEmail, authError }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
