import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";


const Anavbar = () => {
  return (
    <div className="lg:h-16 border-b border-gray-300 flex items-center text-sm text-gray-500">
      <div className="w-full px-4 lg:px-8 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center border border-gray-300 p-1">
            <input
              type="text"
              placeholder="Search..."
              className="outline-none bg-transparent"
            />
            <SearchOutlinedIcon className="ml-2" />
          </div>
        <div className="flex items-center">
          <span className="w-8 h-8">pukarlamichhane@gmail.com</span>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Anavbar;