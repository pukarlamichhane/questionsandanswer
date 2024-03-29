/* eslint-disable no-unused-vars */
import  { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useDispatch } from 'react-redux';


const Productpage = () => {
  const [amount, setAmount] = useState(1);
  const [selectedSize, setSelectedSize] = useState(32);
  const [price, setPrice] = useState(null);
  const [quantity, setQuantity] = useState(null);
  //const dispatch =useDispatch()

  // Mocked items data
  const items = [
    {
      id: 1,
      name: 'Item1',
      variants: [
        { size: 32, price: 10.99, quantity: 50 },
        { size: 33, price: 12.99, quantity: 40 },
        { size: 34, price: 15.99, quantity: 30 }
      ]
    }
  ];

  // Fetch the initial price and quantity based on the default selected size
  useEffect(() => {
    const selectedVariant = items[0].variants.find((variant) => variant.size === selectedSize);
    if (selectedVariant) {
      setPrice(selectedVariant.price);
      setQuantity(selectedVariant.quantity);
    }
  }, [selectedSize]);

  // Handle size change
  const handleSizeChange = (e) => {
    const newSize = parseInt(e.target.value);
    setSelectedSize(newSize);

    // Update price and quantity based on the selected size
    const selectedVariant = items[0].variants.find((variant) => variant.size === newSize);
    if (selectedVariant) {
      setPrice(selectedVariant.price);
      setQuantity(selectedVariant.quantity);
    }

    
  };

  return (
    <>
    <Navbar></Navbar>
    <div className="flex flex-col justify-between lg:flex-row gap-16 lg:items-center">
      <div className="flex flex-col gap-6 lg:w-2/4">
        <img
          src="https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,b_rgb:f5f5f5/3396ee3c-08cc-4ada-baa9-655af12e3120/scarpa-da-running-su-strada-invincible-3-xk5gLh.png"
          alt=""
          className="w-full h-full aspect-square object-cover rounded-xl"
        />
      </div>
      {/* ABOUT */}
      <div className="flex flex-col gap-4 lg:w-2/4">
        <div>
          <span className="text-violet-600 font-semibold">Special Sneaker</span>
          <h1 className="text-3xl font-bold">Nike Invincible 3</h1>
        </div>
        <p className="text-gray-700">
          Con ammortizzazione incredibile per sostenerti in tutti i tuoi chilometri, Invincible 3 offre un livello di comfort elevatissimo sotto il piede per aiutarti a dare il massimo oggi, domani e oltre. Questo modello incredibilmente elastico e sostenitivo, è pensato per dare il massimo lungo il tuo percorso preferito e fare ritorno a casa carico di energia, in attesa della prossima corsa.
        </p>
        <h6 className="text-2xl font-semibold">$ {price*amount}</h6>
        <p className="text-lg">Quantity: {quantity}</p>
        {/* Size selection dropdown */}
        <div className="mb-4">
          <label htmlFor="size" className="mr-2">
            Select Size:
          </label>
          <select
            id="size"
            className="p-2 border border-gray-300"
            value={selectedSize}
            onChange={handleSizeChange}
          >
            {/* Replace with your actual variants data */}
            {items[0].variants.map((variant) => (
              <option key={variant.size} value={variant.size}>
                {variant.size}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-row items-center gap-12">
          <div className="flex flex-row items-center">
            <button className="bg-gray-200 py-2 px-5 rounded-lg text-violet-800 text-3xl" onClick={() => setAmount((prev) => prev - 1)}>
              -
            </button>
            <span className="py-4 px-6 rounded-lg">{amount}</span>
            <button className="bg-gray-200 py-2 px-4 rounded-lg text-violet-800 text-3xl" onClick={() => setAmount((prev) => prev + 1)}>
              +
            </button>
          </div>
          <button className="bg-violet-800 text-white font-semibold py-3 px-16 rounded-xl h-full" >Add to Cart</button>
        </div>
      </div>
    </div>
    </>
  );
};

export default Productpage;
