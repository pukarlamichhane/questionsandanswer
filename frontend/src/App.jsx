import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './page/Login';
import Signup from './page/Signup';
import Email from './page/Email';
import Dashboard from './page/admin/Dashboard';
import Productpage from './page/Productpage';
import Foget from './page/cus/Foget';
import EmailForm from './page/cus/EmailForm';
import Password from './page/cus/password';

// Define routes
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/verify" element={<Email />} />
      <Route path="/productpage" element={<Productpage></Productpage>} />
      <Route path="/verifycode" element={<Foget></Foget>} />
      <Route path="/forget" element={<EmailForm></EmailForm>}/>
      <Route path="/productpage" element={<Password></Password>} />

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
