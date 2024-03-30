import  { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/admin/Layout';

// Lazy-loaded components
const Login = lazy(() => import('./page/Login'));
const Signup = lazy(() => import('./page/Signup'));
const Email = lazy(() => import('./page/Email'));
const Dashboard = lazy(() => import('./page/admin/Dashboard'));
const Productpage = lazy(() => import('./page/Productpage'));
const Forget = lazy(() => import('./page/cus/Forget'));
const EmailForm = lazy(() => import('./page/cus/EmailForm'));
const Password = lazy(() => import('./page/cus/Change'));
const Products = lazy(() => import('./page/admin/Products'));

// Define routes
const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify" element={<Email />} />
        <Route path="/productpage" element={<Productpage />} />
        <Route path="/verifycode" element={<Forget />} />
        <Route path="/forget" element={<EmailForm />} />
        <Route path="/password" element={<Password />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </Suspense>
  );
};

const AdminRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="products" element={<Products />} />
      </Route>
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
