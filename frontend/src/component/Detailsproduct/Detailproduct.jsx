import { useState, useEffect } from "react"; // Importing React hooks
import axios from "axios"; // Axios for HTTP requests
import { useParams } from "react-router-dom"; // To get parameters from the route
import { useDispatch } from "react-redux"; // To dispatch Redux actions
import { addToCart } from "../../store/cartSlice"; // Redux action
import { ToastContainer, toast } from "react-toastify"; // Toaster notifications
import "react-toastify/dist/ReactToastify.css"; // Toaster CSS

const DetailProduct = () => {
  const [item, setItem] = useState(null);
  const [amount, setAmount] = useState(1); // Default amount
  const [selectedSize, setSelectedSize] = useState(32); // Default size
  const [error, setError] = useState(null); // Error handling
  const { id } = useParams(); // Get product ID from route
  const dispatch = useDispatch(); // Redux dispatch

  // Fetch data when the component mounts or when the ID changes
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/products/${id}` // Use dynamic ID
        );

        if (isMounted) {
          setItem(response.data); // Set the fetched data to item state
        }
      } catch (err) {
        if (isMounted) {
          setError("Error fetching data. Please try again later."); // Error handling
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false; // Clean up on unmount
    };
  }, [id]);

  if (error) {
    return <div>{error}</div>; // Display error message
  }

  if (!item) {
    return <div>Loading...</div>; // Display loading state
  }

  // Ensure item has variants and find the selected variant
  const selectedVariant = item.variants?.find(
    (variant) => variant.size === selectedSize
  );

  const handleSizeChange = (e) => {
    setSelectedSize(parseInt(e.target.value)); // Change selected size
  };

  const handleAddToCart = () => {
    if (selectedVariant) {
      // Ensure there's a selected variant
      dispatch(
        addToCart({
          id: item.id,
          name: item.name,
          image: item.image,
          selectedVariant: selectedVariant,
          amount: amount,
        })
      );

      toast.success("Item added to cart!", {
        position: "top-right",
        autoClose: 2000, // Time to auto-close
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      toast.error("Error adding to cart. Please try again.");
    }
  };

  return (
    <div className="flex flex-col justify-between lg:flex-row gap-16 lg:items-center">
      <ToastContainer /> {/* Toast Container for notifications */}
      <div className="flex flex-col gap-6 lg:w-2/4">
        <img
          src={item.image}
          alt={item.name}
          className="mt-6 ml-[60px] w-[30rem] h-[30rem] object-cover rounded-xl"
        />
      </div>
      <div className="flex flex-col gap-4 lg:w-2/4">
        <h1 className="text-3xl font-bold">{item.name}</h1> {/* Product name */}
        <p className="text-gray-700">{item.description}</p>{" "}
        {/* Product description */}
        {selectedVariant && (
          <>
            <h6 className="text-2xl font-semibold">
              ${selectedVariant.price * amount} {/* Total price */}
            </h6>
            <p className="text-lg">
              Available quantity: {selectedVariant.quantity}
            </p>{" "}
            {/* Available stock */}
            <div className="mb-4">
              {" "}
              {/* Size selection */}
              <label htmlFor="size">Select Size:</label>
              <select
                id="size"
                className="p-2 border border-gray-300"
                value={selectedSize}
                onChange={handleSizeChange}
              >
                {item.variants.map((variant) => (
                  <option key={variant.size} value={variant.size}>
                    {variant.size}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}
        <div className="flex flex-row items-center gap-12">
          {" "}
          {/* Quantity and Add-to-Cart */}
          <div className="flex flex-row items-center">
            <button
              className="bg-gray-200 py-2 px-5 rounded-lg text-violet-800 text-3xl"
              onClick={() => setAmount((prev) => Math.max(prev - 1, 1))} // Decrease quantity, no less than one
            >
              -
            </button>
            <span className="py-4 px-6 rounded-lg">{amount}</span>
            <button
              className="bg-gray-200 py-2 px-5 rounded-lg text-violet-800 text-3xl"
              onClick={() => {
                if (amount < selectedVariant.quantity) {
                  setAmount((prev) => prev + 1); // Increase quantity, but not beyond available stock
                }
              }}
            >
              +
            </button>
          </div>
          <button
            className="bg-violet-800 text-white font-semibold py-3 px-16 rounded-xl h-full"
            onClick={handleAddToCart} // Add to cart
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
