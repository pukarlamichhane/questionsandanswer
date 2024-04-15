import { useState } from "react";
import Asidebar from "./Asidebar";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Aproduct = () => {
  const [itemName, setItemName] = useState("");
  const [itemImage, setItemImage] = useState("");
  const [itemColor, setItemColor] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [variants, setVariants] = useState([{ size: "", price: "", quantity: "" }]);

  const handleVariantChange = (index, key, value) => {
    const newVariants = [...variants];
    newVariants[index][key] = value;
    setVariants(newVariants);
  };

  const addVariant = () => {
    setVariants([...variants, { size: "", price: "", quantity: "" }]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/products', {itemName,itemImage,itemColor,itemCategory,variants});
      console.log(response.data); // Log the response from the server
      toast.success('Product added successfully!');
      // Reset form fields if needed
      setItemName("");
      setItemImage("");
      setItemColor("");
      setItemCategory("");
      setVariants([{ size: "", price: "", quantity: "" }]);
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Failed to add product.');
      // Handle error if needed
    }
  };

  return (
    <main className="bg-gray-200 min-h-screen flex">
      <Asidebar />
      <div className="flex-1 p-6">
        <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h3 className="text-2xl font-semibold text-center mb-4">Add Products</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="itemName" className="block font-semibold mb-2">Item Name:</label>
              <input
                type="text"
                id="itemName"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="itemImage" className="block font-semibold mb-2">Item Image</label>
              <input
                type="file"
                id="itemImage"
                onChange={(e) => setItemImage(e.target.files[0])}
                required
                className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="itemColor" className="block font-semibold mb-2">Item Color:</label>
              <input
                type="text"
                id="itemColor"
                value={itemColor}
                onChange={(e) => setItemColor(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="itemCategory" className="block font-semibold mb-2">Item Category:</label>
              <input
                type="text"
                id="itemCategory"
                value={itemCategory}
                onChange={(e) => setItemCategory(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Variants:</h3>
              {variants.map((variant, index) => (
                <div key={index} className="flex mb-4">
                  <div className="w-1/3 mr-2">
                    <label htmlFor={`size${index}`} className="block font-semibold mb-1">Size:</label>
                    <input
                      type="number"
                      id={`size${index}`}
                      value={variant.size}
                      onChange={(e) => handleVariantChange(index, "size", e.target.value)}
                      required
                      className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="w-1/3 mr-2">
                    <label htmlFor={`price${index}`} className="block font-semibold mb-1">Price:</label>
                    <input
                      type="number"
                      step="0.01"
                      id={`price${index}`}
                      value={variant.price}
                      onChange={(e) => handleVariantChange(index, "price", e.target.value)}
                      required
                      className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="w-1/3">
                    <label htmlFor={`quantity${index}`} className="block font-semibold mb-1">Quantity:</label>
                    <input
                      type="number"
                      id={`quantity${index}`}
                      value={variant.quantity}
                      onChange={(e) => handleVariantChange(index, "quantity", e.target.value)}
                      required
                      className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addVariant}
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Add Variant
              </button>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </main>
  );
};

export default Aproduct;
