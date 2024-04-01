import  { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


// Lazy-loaded components
const Login = lazy(() => import('./page/Login'));
const Signup = lazy(() => import('./page/Signup'));
const Email = lazy(() => import('./page/Email'));
const Dashboard = lazy(() => import('./page/admin/Dashboard'));
const Productpage = lazy(() => import('./page/Productpage'));
const Forget = lazy(() => import('./page/cus/Foget'));
const EmailForm = lazy(() => import('./page/cus/EmailForm'));
const Password = lazy(() => import('./page/cus/Change'));

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
        <Route path="/admin/dashboard" element={<Dashboard />} />
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
