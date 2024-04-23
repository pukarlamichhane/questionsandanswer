import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Button, IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
const Cartitem = () => {
  return (
    <div className=" mt-10 p-5 shadow-lg border rounded-md">
      <div className="flex items-center">
        <div className="w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem]">
          <img
            className="w-full h-full object-cover object-top"
            src=""
            alt=""
          ></img>
        </div>
        <div className="ml-5 space-y-1">
          <p className="font-semibold">Jorden 4</p>
        </div>
      </div>
      <div className="lg:flex items-center lg:space-x-10 pt-4">
        <div className="flex items-center space-x-2">
          <IconButton className="">
            <RemoveCircleOutlineIcon></RemoveCircleOutlineIcon>
          </IconButton>
          <span className="py-1 px-7 border rounded-sm">1</span>
          <IconButton>
            <AddCircleOutlineIcon></AddCircleOutlineIcon>
          </IconButton>
        </div>
        <div>
          <Button>Remove</Button>
        </div>
      </div>
    </div>
  );
};

export default Cartitem;
