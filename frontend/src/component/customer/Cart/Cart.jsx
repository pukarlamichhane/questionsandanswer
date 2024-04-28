import { useSelector } from "react-redux"; // Access Redux state
import Cartitem from "./Cartitem"; // Import Cartitem component
import { Button } from "@mui/material"; // Material-UI components
import { useNavigate } from "react-router-dom"; // React Router hook for navigation
import { useState } from "react"; // React hook for local state management

const Cart = () => {
  const cart = useSelector((state) => state.cart.carts); // Get cart data from Redux
  const [selectedSize, setSelectedSize] = useState(""); // Default state for selected size
  const navigate = useNavigate(); // Navigation hook for React Router

  const handleSizeChange = (newSize) => {
    setSelectedSize(newSize); // Update selected size
  };

  // Calculate total price considering all variants and their quantities
  const totalPrice = cart.reduce((acc, item) => {
    const itemTotal = item.variants.reduce((subAcc, variant) => {
      const itemPrice = variant.price || 0; // Get the price of the variant
      const quantity = variant.quantity || 0; // Get the quantity of the variant
      return subAcc + itemPrice * quantity; // Calculate the total for this variant
    }, 0);
    return acc + itemTotal; // Accumulate the total price for the cart
  }, 0);

  const handleCartitemClick = (itemId) => {
    navigate(`/product/${itemId}`); // Navigate to the product detail page
  };

  return (
    <div className="container mx-auto p-6">
      {" "}
      {/* Root container with padding */}
      <div className="lg:grid lg:grid-cols-3 lg:gap-6">
        {" "}
        {/* Grid layout for responsive design */}
        <div className="lg:col-span-2">
          {" "}
          {/* Area for cart items */}
          {cart.map((item) => (
            <Cartitem
              key={item.id}
              item={item}
              selectedSize={selectedSize}
              onSizeChange={handleSizeChange} // Pass size change handler
              onClick={() => handleCartitemClick(item.id)} // Pass click handler for navigation
            />
          ))}
        </div>
        <div className="lg:col-span-1 sticky top-0 h-[100vh]">
          {" "}
          {/* Summary section */}
          <div className="p-5 border border-gray-300 rounded-lg">
            {" "}
            {/* Border and padding */}
            <p className="uppercase font-bold text-gray-600 pb-4">
              Price details
            </p>{" "}
            {/* Section heading */}
            <hr className="border-gray-300" /> {/* Horizontal line */}
            <div className="space-y-3 font-semibold text-gray-800 mt-4">
              {" "}
              {/* Consistent spacing */}
              <div className="flex justify-between">
                {" "}
                {/* Flex layout for total price */}
                <span>Total price</span>
                <span>{totalPrice.toFixed(2)}</span> {/* Display total price */}
              </div>
            </div>
            <Button
              variant="contained"
              className="w-full mt-5 text-white" // Button styling
              sx={{ px: "2rem", py: "1rem", bgcolor: "#9155fd" }}
            >
              Checkout
            </Button>{" "}
            {/* Checkout button */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart; // Export the Cart component
