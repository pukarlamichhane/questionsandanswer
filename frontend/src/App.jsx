import  { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Order from './page/admin/Order';
import Payment from './page/cus/Payment';

// Lazy-loaded components
const Home = lazy(() => import('./page/Home/Home'));
const Login = lazy(() => import('./page/Login'));
const Signup = lazy(() => import('./page/Signup'));
const Email = lazy(() => import('./page/Email'));
const Dashboard = lazy(() => import('./page/admin/Dashboard'));
const Productpage = lazy(() => import('./page/Productpage'));
const Forget = lazy(() => import('./page/cus/Foget'));
const EmailForm = lazy(() => import('./page/cus/EmailForm'));
const Password = lazy(() => import('./page/cus/Change'));
const AdminProduct = lazy(() => import('./page/admin/Product'));
const Setting = lazy(() => import('./page/admin/Setting'));
const Addproduct = lazy(() => import('./page/admin/Add'));
const Adduser = lazy(() => import('./page/admin/Adduser'));
const User = lazy(() => import('./page/admin/User'));

// Define routes
const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify" element={<Email />} />
        <Route path="/productpage" element={<Productpage />} />
        <Route path="/verifycode" element={<Forget />} />
        <Route path="/forget" element={<EmailForm />} />
        <Route path="/password" element={<Password />} />
        <Route path="/password" element={<Payment />} />
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
};

// Main App Component
const App = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;
