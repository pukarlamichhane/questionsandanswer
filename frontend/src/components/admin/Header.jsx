import { BsCart3 } from "react-icons/bs";

function AHeader() {
  return (
    <header className=" bg-white-800 text-black px-6 py-4 flex justify-between items-center border-b border-gray-300">
      <div className=" flex items-center">
        <BsCart3 className=" text-xl" />
        <span className="ml-2 font-semibold">SHOP</span>
      </div>
      <div className="right flex justify-end items-center">
        <span className="text-black-400">pukarlamichhane567@gmail.com</span>
      </div>
    </header>
  );
}

export default AHeader;
