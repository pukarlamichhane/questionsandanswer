import { AiOutlineShoppingCart, AiOutlineUserAdd } from "react-icons/ai";

const Navbar = () => {
  return (
    <nav className="flex border-b-2 border-gray-300 justify-around items-center py-5 z-10 ml-8">
      <div className="nav-container">
        <input
          className="px-5 py-3 bg-gray-100 border-none outline-none rounded-full mr-5"
          type="text"
          placeholder="Enter your search shoes."
        />
      </div>
      <div className="profile-container">
        <a href="">
          <AiOutlineShoppingCart className="w-6 h-6 ml-8" />
        </a>
        <a href="">
          <AiOutlineUserAdd className="w-6 h-6 ml-8" />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
