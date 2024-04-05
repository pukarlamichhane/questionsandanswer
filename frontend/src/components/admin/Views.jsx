import { useState } from 'react';
import Asidebar from './Asidebar';

function Views() {
    const items = [
        {
          id: 1,
          name: 'Item1',
          image: "image1.jpg",
          color: "Red",
          category: "Category1",
          variants: [
            { size: 32, price: 10.99, quantity: 50 },
            { size: 33, price: 12.99, quantity: 40 },
            { size: 34, price: 15.99, quantity: 30 }
          ]
        },
        {
          id: 2,
          name: 'Item2',
          image: "image2.jpg",
          color: "Blue",
          category: "Category2",
          variants: [
            { size: 35, price: 18.99, quantity: 20 },
            { size: 36, price: 20.99, quantity: 25 },
            { size: 37, price: 22.99, quantity: 15 }
          ]
        }
        // Add more items as needed
    ];

    const [selectedSize, setSelectedSize] = useState('');
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [selectedQuantity, setSelectedQuantity] = useState(null);

    const handleSizeChange = (event, itemId) => {
        const selectedSize = event.target.value;
        setSelectedSize(selectedSize);
        const selectedItem = items.find(item => item.id === itemId);
        if (selectedItem) {
            const variant = selectedItem.variants.find(variant => variant.size === parseInt(selectedSize));
            if (variant) {
                setSelectedPrice(variant.price);
                setSelectedQuantity(variant.quantity);
            } else {
                setSelectedPrice(null);
                setSelectedQuantity(null);
            }
        }
    };

    return (
        <main className='w-full h-screen bg-white flex'>
            <Asidebar />
            <div className='ml-60 p-6 flex-grow'>
                <div className='m-2'>
                    <h3 className='text-2xl font-semibold mb-4'>Add Product</h3>
                    <table className='table-auto w-full'>
                        <thead>
                            <tr>
                                <th className="border border-black px-4 py-2">ID</th>
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
                                    <td className="border border-black px-4 py-2">{item.id}</td>
                                    <td className="border border-black px-4 py-2">{item.name}</td>
                                    <td className="border border-black px-4 py-2">{item.image}</td>
                                    <td className="border border-black px-4 py-2">{item.color}</td>
                                    <td className="border border-black px-4 py-2">{item.category}</td>
                                    <td className="border border-black px-4 py-2">
                                        <select id={`size-${item.id}`} name={`size-${item.id}`} onChange={(e) => handleSizeChange(e, item.id)} value={selectedSize} className="border border-gray-300 rounded px-3 py-2 mb-4 w-full">
                                            <option value="">--Please choose a size--</option>
                                            {item.variants.map((variant, variantIndex) => (
                                                <option key={variantIndex} value={variant.size}>{variant.size}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="border border-black px-4 py-2">{selectedPrice}</td>
                                    <td className="border border-black px-4 py-2">{selectedQuantity}</td>
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
