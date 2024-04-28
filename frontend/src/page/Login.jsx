import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../component/auth/Auth"; // Use AuthProvider context
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const { login, authError } = useAuth(); // Extract login and error state from context
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateInputs = () => {
    const errors = {};

    // Email validation
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }

    // Password validation
    if (!password.trim()) {
      errors.password = "Password is required";
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      return;
    }

    try {
      await login(email, password);

      toast.success("Login successful!");
      // Navigate based on user role
      const userRole = localStorage.getItem("userRole");
      navigate(userRole === "admin" ? "/admin/dashboard" : "/home");

      // Clear fields after successful login
      setEmail("");
      setPassword("");
    } catch (error) {
      // Handle error with authError from AuthProvider
      const errorMessage = authError || "Login failed. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-cover bg-center">
      <div className="max-w-md w-full px-4 border-2 border-gray-800 rounded bg-white">
        <h1 className="text-3xl font-bold text-center py-4 text-black">
          Login
        </h1>
        <form className="mt-8 px-4 py-6" onSubmit={handleSubmit}>
          <input
            className="p-3 my-2 w-full bg-white rounded border border-gray-300"
            type="email"
            placeholder="Email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}

          <div className="relative">
            <input
              className="p-3 my-2 w-full bg-white rounded border border-gray-300 pr-10"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {showPassword ? (
              <FaEyeSlash
                className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer"
                onClick={togglePasswordVisibility}
              />
            ) : (
              <FaEye
                className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer"
                onClick={togglePasswordVisibility}
              />
            )}
          </div>

          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}

          <button
            type="submit"
            className="bg-red-600 py-3 my-6 rounded w-full text-white font-bold"
          >
            Login
          </button>

          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center text-black">
              <input type="checkbox" className="mr-2" />
              <span>Remember me</span>
            </label>
            <span>
              <Link to="/signup" className="text-gray-500">
                Forgot password?
              </Link>
            </span>
          </div>
        </form>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Login;
