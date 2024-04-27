import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";

const DetailProduct = () => {
  const [item, setItem] = useState(null);
  const [amount, setAmount] = useState(1);
  const [selectedSize, setSelectedSize] = useState(32);
  const [error, setError] = useState(null);
  const { id } = useParams(); // Get product ID from route
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/products/${id}` // Use dynamic ID
        );
        setItem(response.data);
      } catch (err) {
        setError("Error fetching data. Please try again later."); // Error handling
      }
    };

    fetchData();
  }, [id]); // Re-fetch when the ID changes

  if (error) {
    return <div>{error}</div>; // Display error message
  }

  if (!item) {
    return <div>Loading...</div>; // Display loading state
  }

  // Find the variant with the selected size
  const selectedVariant = item.variants.find(
    (variant) => variant.size === selectedSize
  );

  const handleSizeChange = (e) => {
    setSelectedSize(parseInt(e.target.value));
  };

  const handleAddToCart = () => {
    // Logic to add the item to the cart (e.g., API call, global state update, etc.)
    console.log(
      `Adding ${amount} of ${item.name} size ${selectedSize} to cart.`
    );
    dispatch(addToCart(item));
  };

  return (
    <div className="flex flex-col justify-between lg:flex-row gap-16 lg:items-center">
      <div className="flex flex-col gap-6 lg:w-2/4">
        <img
          src={item.image}
          alt={item.name}
          className="mt-6 ml-[60px] w-[30rem] h-[30rem] aspect-square object-cover rounded-xl"
        />
      </div>
      <div className="flex flex-col gap-4 lg:w-2/4">
        <h1 className="text-3xl font-bold">{item.name}</h1>
        <p className="text-gray-700">{item.description}</p>
        <h6 className="text-2xl font-semibold">
          ${selectedVariant.price * amount}
        </h6>
        <p className="text-lg">
          Available quantity: {selectedVariant.quantity}
        </p>

        <div className="mb-4">
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

        <div className="flex flex-row items-center gap-12">
          <div className="flex flex-row items-center">
            <button
              className="bg-gray-200 py-2 px-5 rounded-lg text-violet-800 text-3xl"
              onClick={() => setAmount((prev) => Math.max(prev - 1, 1))}
            >
              -
            </button>
            <span className="py-4 px-6 rounded-lg">{amount}</span>
            <button
              className="bg-gray-200 py-2 px-5 rounded-lg text-violet-800 text-3xl"
              onClick={() => {
                if (amount < selectedVariant.quantity) {
                  setAmount((prev) => prev + 1);
                }
              }}
            >
              +
            </button>
          </div>
          <button
            className="bg-violet-800 text-white font-semibold py-3 px-16 rounded-xl h-full"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
