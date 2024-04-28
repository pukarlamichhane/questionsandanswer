/* eslint-disable react/prop-types */
import { Select, MenuItem, FormControl } from "@mui/material"; // Importing Material-UI components
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Button, IconButton } from "@mui/material"; // Import Material-UI components
import { useDispatch } from "react-redux"; // Redux hook for dispatching actions
import { addToCart, deleteFromCart } from "../../../store/cartSlice"; // Redux actions
import { useState } from "react"; // React hook for local state management

const Cartitem = ({ item }) => {
  const dispatch = useDispatch(); // For dispatching Redux actions
  const [selectedSize, setSelectedSize] = useState(
    item.variants[0]?.size || ""
  ); // Default size

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value); // Update selected size
  };

  const handleDecreaseQuantity = () => {
    const selectedVariant = item.variants.find(
      (variant) => variant.size === selectedSize
    );
    // Ensure quantity doesn't go below one
    if (selectedVariant && selectedVariant.quantity > 1) {
      dispatch(deleteFromCart({ id: item.id, size: selectedSize })); // Dispatch Redux action to decrease quantity
    }
  };

  const handleIncreaseQuantity = () => {
    const selectedVariant = item.variants.find(
      (variant) => variant.size === selectedSize
    );
    // Increase quantity if a valid variant is found
    if (selectedVariant) {
      dispatch(
        addToCart({
          id: item.id,
          selectedVariant,
        })
      );
    }
  };

  const handleRemoveItem = () => {
    const selectedVariant = item.variants.find(
      (variant) => variant.size === selectedSize
    );
    if (selectedVariant) {
      dispatch(deleteFromCart({ id: item.id, size: selectedSize })); // Dispatch Redux action to remove variant
    }
  };

  return (
    <div className="mt-10 p-5 shadow-lg border rounded-md">
      {" "}
      {/* Cart item container */}
      <div className="flex items-center">
        {" "}
        {/* Flex layout for item information */}
        <div className="w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem]">
          {" "}
          {/* Image size */}
          <img
            className="w-full h-full object-cover object-top"
            src={item.image} // Display item image
            alt={item.name} // Alt text for accessibility
          />
        </div>
        <div className="ml-5 space-y-1">
          {" "}
          {/* Space between elements */}
          <p className="font-semibold">{item.name}</p> {/* Display item name */}
          <FormControl>
            {" "}
            {/* Size selection form */}
            {/* Label for size selection */}
            <Select value={selectedSize} onChange={handleSizeChange}>
              {item.variants.map((variant) => (
                <MenuItem key={variant.size} value={variant.size}>
                  {variant.size} {/* Available sizes */}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="lg:flex items-center lg:space-x-10 pt-4">
        {" "}
        {/* Flex layout for controls */}
        <div className="flex items-center space-x-2">
          {" "}
          {/* Space between controls */}
          <IconButton onClick={handleDecreaseQuantity}>
            {" "}
            {/* Decrease quantity */}
            <RemoveCircleOutlineIcon />
          </IconButton>
          <span className="py-1 px-7 border rounded-sm">
            {" "}
            {/* Display size and quantity */}
            {item.variants.find((variant) => variant.size === selectedSize)
              ?.quantity || 1}
          </span>
          <IconButton onClick={handleIncreaseQuantity}>
            {" "}
            {/* Increase quantity */}
            <AddCircleOutlineIcon />
          </IconButton>
        </div>
        <div>
          {" "}
          {/* Button for removing item */}
          <Button onClick={handleRemoveItem}>Remove</Button>
        </div>
      </div>
    </div>
  );
};

export default Cartitem; // Export the Cartitem component
