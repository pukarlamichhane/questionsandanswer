import { Button } from "@mui/material";
import Cartitem from "./Cartitem";

const Cart = () => {
  return (
    <div>
      <div className="lg:grid grid-cols-3 lg:px-16 relative">
        <div className="col-span-2">
          <Cartitem></Cartitem>
        </div>
      </div>
      <div className=" mt-10 px-5 sticky top-0 h-[100vh]  lg:mt-0">
        <div className="border">
          <p className="uppercase font-bold opacity-60 pb-4">Price details</p>
          <hr></hr>
          <div className="-space-y-3 font-semibold mb-10">
            <div className="flex justify-between pt-3 text-black">
              <span>Price</span>
              <span>5500</span>
            </div>
            <div className="flex justify-between pt-3 text-black">
              <span>Delivery Price</span>
              <span>free</span>
            </div>
            <div className="flex justify-between pt-3 text-black">
              <span>Total price</span>
              <span>5500</span>
            </div>
          </div>
          <Button
            varient="contained"
            className="w-full mt-5"
            sx={{ px: "2rem", py: "1rem", bgcolor: "#9155fd" }}
          >
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
