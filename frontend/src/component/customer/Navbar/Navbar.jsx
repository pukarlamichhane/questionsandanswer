import { useAuth } from "../../auth/Auth"; // Assuming you have an AuthContext
import { Link } from "react-router-dom";
import { Bars3Icon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";

export default function Navbar() {
  const { isAuthenticated, userEmail, logout } = useAuth(); // Access authentication state
  const cart = useSelector((state) => state.cart.carts);

  const totalCartItems = cart.reduce((total, item) => {
    return (
      total +
      item.variants.reduce(
        (itemTotal, variant) => itemTotal + variant.quantity,
        0
      )
    );
  }, 0);

  return (
    <div className="bg-white">
      <header className="relative bg-white">
        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              {/* Mobile menu toggle */}
              <button
                type="button"
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
              >
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link to="/">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Logo"
                  />
                </Link>
              </div>

              {/* Right-side navigation */}
              <div className="ml-auto flex items-center">
                {/* Conditionally render links based on authentication status */}
                {!isAuthenticated ? (
                  <div className="hidden lg:flex lg:items-center lg:justify-end lg:space-x-6">
                    <Link
                      to="/login"
                      className="text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      Sign in
                    </Link>
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                    <Link
                      to="/signup"
                      className="text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      Create account
                    </Link>
                  </div>
                ) : (
                  <div className="hidden lg:flex lg:items-center lg:justify-end lg:space-x-6">
                    <span>Welcome, {userEmail}</span> {/* Display user email */}
                    <button
                      className="text-sm font-medium text-gray-700 hover:text-gray-800"
                      onClick={() => logout()} // Ensure logout function is defined
                    >
                      Logout
                    </button>
                  </div>
                )}

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <Link to="/cart" className="group -m-2 flex items-center p-2">
                    <ShoppingBagIcon className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500" />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                      {totalCartItems}
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
