/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [authError, setAuthError] = useState(null);

  const login = async (email, password) => {
    const response = await axios.post("http://localhost:8000/api/login", {
      email,
      password,
    });
    try {
      // Check if the response indicates an error
      // If no error, proceed to extract token and user info
      const { token, role, email: returnedEmail } = response.data;

      localStorage.setItem("authToken", token);
      localStorage.setItem("userRole", role);
      localStorage.setItem("userEmail", returnedEmail);

      setIsAuthenticated(true);
      setUserRole(role);
      setUserEmail(returnedEmail);
      setAuthError(null);
    } catch (error) {
      let errorMessage;

      // Determine the source of the error
      if (error.message === "Network Error") {
        errorMessage = "Network error. Please check your connection.";
      } else if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.message || error.message;

        if (status === 401) {
          errorMessage = "Unauthorized. Please check your credentials.";
        } else if (status === 500) {
          errorMessage = "Server error. Please try again later.";
        } else {
          errorMessage = message;
        }
      } else {
        errorMessage = error.message || "An unknown error occurred.";
      }

      setAuthError(errorMessage); // Set the error message in the state
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
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userRole,
        userEmail,
        login,
        logout,
        authError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
