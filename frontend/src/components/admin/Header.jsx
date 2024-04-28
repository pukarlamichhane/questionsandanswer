import { BsCart3 } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useAuth } from "../../component/auth/Auth";

function AHeader() {
  const { userEmail, logout } = useAuth();

  return (
    <header className="bg-white text-black px-6 py-4 flex justify-between items-center border-b border-gray-300">
      <div className="flex items-center">
        <BsCart3 className="text-xl" />
        <Link to="/" className="ml-2 font-semibold">
          SHOP
        </Link>
      </div>

      <div className="right flex justify-end items-center">
        <span className="text-black-400">{userEmail}</span>
        <button className="ml-4 text-red-600" onClick={logout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default AHeader;
