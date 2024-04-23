import { useState, useEffect } from "react";
import Asidebar from "./Asidebar";

function Views() {
  const [items, setItems] = useState([]);
  const [selectedSize, setSelectedSize] = useState({});
  const [selectedPrice, setSelectedPrice] = useState({});
  const [selectedQuantity, setSelectedQuantity] = useState({});

  useEffect(() => {
    // Fetch data from an external source
    fetch("http://localhost:8000/api/products") // Replace with your API endpoint
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []); // Empty array ensures this effect runs once when the component mounts

  const handleSizeChange = (event, itemId) => {
    const selectedSize = event.target.value;

    const updatedSelectedSize = { ...selectedSize, [itemId]: selectedSize };
    setSelectedSize(updatedSelectedSize);

    const selectedItem = items.find((item) => item.id === itemId);
    if (selectedItem) {
      const variant = selectedItem.variants.find(
        (variant) => variant.size === parseInt(selectedSize)
      );
      if (variant) {
        const updatedSelectedPrice = {
          ...selectedPrice,
          [itemId]: variant.price,
        };
        const updatedSelectedQuantity = {
          ...selectedQuantity,
          [itemId]: variant.quantity,
        };

        setSelectedPrice(updatedSelectedPrice);
        setSelectedQuantity(updatedSelectedQuantity);
      } else {
        const updatedSelectedPrice = { ...selectedPrice, [itemId]: null };
        const updatedSelectedQuantity = { ...selectedQuantity, [itemId]: null };

        setSelectedPrice(updatedSelectedPrice);
        setSelectedQuantity(updatedSelectedQuantity);
      }
    }
  };

  return (
    <main className="w-full h-screen bg-white flex">
      <Asidebar />
      <div className="ml-60 p-6 flex-grow">
        <div className="m-2">
          <h3 className="text-2xl font-semibold mb-4">Add Product</h3>
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="border border-black px-4 py-2">Name</th>
                <th className="border border-black px-4 py-2">Image</th>
                <th className="border border-black px-4 py-2">Color</th>
                <th className="border border-black px-4 py-2">Category</th>
                <th className="border border-black px-4 py-2">Size</th>
                <th className="border border-black px-4 py-2">Price</th>
                <th className="border border-black px-4 py-2">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="border border-black px-4 py-2">{item.name}</td>
                  <td className="border border-black px-4 py-2">
                    <img className="w-20" src={item.image} alt="hi"></img>
                  </td>
                  <td className="border border-black px-4 py-2">
                    {item.color}
                  </td>
                  <td className="border border-black px-4 py-2">
                    {item.category}
                  </td>
                  <td className="border border-black px-4 py-2">
                    <select
                      id={`size-${item.id}`}
                      name={`size-${item.id}`}
                      onChange={(e) => handleSizeChange(e, item.id)}
                      value={selectedSize[item.id] || ""}
                      className="border border-gray-300 rounded px-3 py-2 mb-4 w-full"
                    >
                      <option value="">--Please choose a size--</option>
                      {item.variants.map((variant) => (
                        <option key={variant.size} value={variant.size}>
                          {variant.size}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="border border-black px-4 py-2">
                    {selectedPrice[item.id] !== undefined
                      ? selectedPrice[item.id]
                      : ""}
                  </td>
                  <td className="border border-black px-4 py-2">
                    {selectedQuantity[item.id] !== undefined
                      ? selectedQuantity[item.id]
                      : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

export default Views;
