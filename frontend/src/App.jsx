import { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomeCus from "./page/Home/Home";
import Productpage from "./page/Product/Productpage";
import Productdetails from "./page/Productdetails/Productdetails";
import Cartpage from "./page/Cart/Cartpage";
import ALogin from "./page/Alogin";

// Lazy-loaded components
const Login = lazy(() => import("./page/Login"));
const Signup = lazy(() => import("./page/Signup"));
const Email = lazy(() => import("./page/Email"));
const Dashboard = lazy(() => import("./page/admin/Dashboard"));
const EmailForm = lazy(() => import("./page/cus/EmailForm"));
const Password = lazy(() => import("./page/cus/Change"));
const AdminProduct = lazy(() => import("./page/admin/Product"));
const Setting = lazy(() => import("./page/admin/Setting"));
const Addproduct = lazy(() => import("./page/admin/Add"));
const Adduser = lazy(() => import("./page/admin/Adduser"));
const User = lazy(() => import("./page/admin/User"));
const Order = lazy(() => import("./page/admin/Order"));
const Payment = lazy(() => import("./page/cus/Payment"));

// Define routes
const AppRoutes = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<HomeCus />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/verify" element={<Email />} />
      <Route path="/product" element={<Productpage />} />
      <Route path="/product/:id" element={<Productdetails></Productdetails>} />
      <Route path="/cart" element={<Cartpage></Cartpage>} />
      {/* Fixing the missing closing tag */}
      <Route path="/forget" element={<EmailForm />} />
      <Route path="/password" element={<Password />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/products" element={<AdminProduct />} />
      <Route path="/admin/setting" element={<Setting />} />
      <Route path="/admin/addproduct" element={<Addproduct />} />
      <Route path="/admin/adduser" element={<Adduser />} />
      <Route path="/admin/users" element={<User />} />
      <Route path="/admin/order" element={<Order />} />
      <Route path="/admin/viewuser" element={<User />} />
      <Route path="/adminlogin" element={<ALogin></ALogin>} />
      {/* Redundant route */}
    </Routes>
  </Suspense>
);

// Main App Component
const App = () => (
  <Router>
    <AppRoutes />
  </Router>
);

export default App;
