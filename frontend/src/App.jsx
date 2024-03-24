import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './page/Login';
import Signup from './page/Signup';
import Email from './page/Email';
import Dashboard from './page/admin/Dashboard';
import Navbar from './components/Navbar';

// Define routes
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/verify" element={<Email />} />
      <Route path="/productpage" element={<Navbar />} />
      <Route path="/admin/*" element={<AdminRoutes />} />
    </Routes>
  );
};

const AdminRoutes = () => {
  return (
    <Route path="/dashboard" element={<Dashboard />} />
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
