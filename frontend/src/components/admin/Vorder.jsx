import { useState } from 'react';
import { AiOutlineDelete, AiOutlineSave } from 'react-icons/ai';
import Asidebar from './Asidebar';

function Vorder() {
    const [orders, setOrders] = useState([
        // Sample order data
        { id: 1, name: 'Product 1', quantity: 2, status: 'Processing' },
        { id: 2, name: 'Product 2', quantity: 1, status: 'Shipped' },
        // Add more sample orders as needed
    ]);

    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(5); // Change this value as per your requirement

    const handleStatusChange = (orderId, newStatus) => {
        const updatedOrders = orders.map(order =>
            order.id === orderId ? { ...order, status: newStatus } : order
        );
        setOrders(updatedOrders);
    };

    const handleSaveChanges = () => {
        // Here you can implement the logic to save changes made to orders
        console.log('Changes saved!');
    };

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <main className='w-full h-screen bg-gray-100 flex'>
            <Asidebar />
            <div className='ml-60 p-6 flex-grow'>
                <div className='m-2'>
                    <h3 className='text-2xl font-semibold'>View order</h3>
                </div>
                <div className="border border-black rounded-lg overflow-hidden">
                    <table className='table-auto w-full'>
                        <thead>
                            <tr>
                                <th className="border border-black px-4 py-2">ID</th>
                                <th className="border border-black px-4 py-2">Product Name</th>
                                <th className="border border-black px-4 py-2">Quantity</th>
                                <th className="border border-black px-4 py-2">Status</th>
                                <th className="border border-black px-4 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentOrders.map(order => (
                                <tr key={order.id}>
                                    <td className="border border-black px-4 py-2">{order.id}</td>
                                    <td className="border border-black px-4 py-2">{order.name}</td>
                                    <td className="border border-black px-4 py-2">{order.quantity}</td>
                                    <td className="border border-black px-4 py-2">
                                        <select
                                            value={order.status}
                                            onChange={e => handleStatusChange(order.id, e.target.value)}
                                        >
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                        </select>
                                    </td>
                                    <td className="border border-black px-4 py-2">
                                        <button className='mr-2'>
                                            <AiOutlineDelete />
                                        </button>
                                        <button onClick={handleSaveChanges}>
                                            <AiOutlineSave />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Pagination */}
                <ul className='flex justify-center'>
                    {Array.from({ length: Math.ceil(orders.length / ordersPerPage) }).map((_, index) => (
                        <li key={index}>
                            <button onClick={() => paginate(index + 1)} className='mx-1'>
                                {index + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
}

export default Vorder;
