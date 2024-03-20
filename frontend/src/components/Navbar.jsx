import { FaShoppingCart } from "react-icons/fa";


const Navbar = () => {
  return (
    <nav className="bg-blue-800 p-4 border-solid border-1 border-black">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white font-bold text-xl">E-Commerce Store</div>

        {/* Responsive Navigation */}
        <div className="md:hidden">
          {/* Mobile Menu Icon */}
          <button className="text-white">
            <FaShoppingCart className="text-xl" />
            <span className="w-4 h-4 bg-red-500 text-white rounded-full absolute top-0 right-0 flex items-center justify-center text-xs"></span>
          </button>
        </div>

        <div className="hidden md:flex space-x-4 items-center">
          <div className="relative p-3">
            <FaShoppingCart className="text-white text-xl" />
            <span className="w-4 h-4 bg-red-500 text-white rounded-full absolute top-0 right-0 flex items-center justify-center text-xs"></span>
          </div>
          <a href="#" className="text-white hidden md:flex">Account</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
