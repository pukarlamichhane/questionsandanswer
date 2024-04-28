/* eslint-disable react/prop-types */

import { Navigate } from "react-router-dom";
import { useAuth } from "./Auth";

/**
 * PrivateRoute restricts access to authenticated users only.
 * Redirects unauthenticated users to the login page.
 *
 * @param {object} props - Component props.
 * @param {React.ComponentType} props.element - The component to render if the user is authenticated.
 * @returns {React.Element} - Returns the component or a redirect to the login page.
 */
const PrivateRoute = ({ element: Component }) => {
  const { isAuthenticated } = useAuth(); // Access the auth context

  return isAuthenticated ? (
    <Component /> // Render the component if authenticated
  ) : (
    <Navigate to="/login" replace /> // Redirect to login if not authenticated
  );
};

export default PrivateRoute;
