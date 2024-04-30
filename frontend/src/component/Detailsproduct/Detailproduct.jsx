import { useState, useEffect } from "react"; // React hooks
import axios from "axios"; // Axios for HTTP requests
import { useParams } from "react-router-dom"; // To get parameters from the route
import { useDispatch } from "react-redux"; // To dispatch Redux actions
import { addToCart } from "../../store/cartSlice"; // Redux action
import { ToastContainer, toast } from "react-toastify"; // Toaster notifications
import "react-toastify/dist/ReactToastify.css"; // Toaster CSS

const DetailProduct = () => {
  const [item, setItem] = useState(null); // Product data
  const [amount, setAmount] = useState(1); // Default quantity
  const [selectedSize, setSelectedSize] = useState(null); // Default size
  const [error, setError] = useState(null); // Error handling
  const { id } = useParams(); // Get product ID from route
  const dispatch = useDispatch(); // Redux dispatch

  // Fetch data when the component mounts or when the ID changes
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/products/${id}` // Dynamic ID
        );

        if (isMounted) {
          const product = response.data;
          setItem(product);

          // Set the default size to the first variant's size if it exists
          if (product.variants && product.variants.length > 0) {
            setSelectedSize(product.variants[0].size); // Set default size
          }
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

  const selectedVariant = item.variants?.find(
    (variant) => variant.size === selectedSize
  );

  const handleSizeChange = (e) => {
    setSelectedSize(parseInt(e.target.value)); // Change selected size
  };

  const handleAddToCart = () => {
    if (selectedVariant) {
      dispatch(
        addToCart({
          id: item.id,
          name: item.name,
          image: item.image,
          selectedVariant,
          amount,
        })
      );

      toast.success("Item added to cart!", {
        position: "top-right",
        autoClose: 2000, // Time to auto-close
        hideProgressBar: true,
        closeOnClick: true,
        pause: true,
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
          className="mt-6 ml-[60px] w-[35rem] h-[30rem] object-cover rounded-xl"
        />
      </div>
      <div className="flex flex-col gap-4 lg:w-2/4">
        <h1 className="text-3xl font-bold">{item.name}</h1> {/* Product name */}
        <p className="text-gray-700">{item.description}</p>{" "}
        {/* Product description */}
        {selectedVariant && (
          <>
            <h6 className="text-2xl font-semibold">
              Rs{selectedVariant.price * amount} {/* Total price */}
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
              onClick={() => setAmount((prev) => Math.max(prev - 1, 1))} // Decrease quantity
            >
              -
            </button>
            <span className="py-4 px-6 rounded-lg">{amount}</span>
            <button
              className="bg-gray-200 py-2 px-5 rounded-lg text-violet-800 text-3xl"
              onClick={() => setAmount((prev) => prev + 1)}
            >
              +
            </button>
          </div>
        </div>
        <div className="flex gap-10">
          <button
            className="bg-violet-800 text-white font-semibold py-3 px-16 rounded-xl h-full"
            onClick={handleAddToCart} // Add to cart
          >
            Add to Cart
          </button>
          <button
            className="bg-violet-800 text-white font-semibold py-3 px-16 rounded-xl h-full"
            onClick={handleAddToCart} // Add to cart
          >
            Buy now
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
