import { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./component/auth/Auth";

// Lazy-loaded components
const HomeCus = lazy(() => import("./page/Home/Home"));
const Productpage = lazy(() => import("./page/Product/Productpage"));
const Productdetails = lazy(() =>
  import("./page/Productdetails/Productdetails")
);
const Cartpage = lazy(() => import("./page/Cart/Cartpage"));

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
      <Route path="/product/:id" element={<Productdetails />} />
      <Route path="/cart" element={<Cartpage />} />
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
    </Routes>
  </Suspense>
);

// Main App Component
const App = () => (
  <AuthProvider>
    <Router>
      <AppRoutes />
    </Router>
  </AuthProvider>
);

export default App;
