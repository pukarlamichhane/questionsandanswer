import { useState, useEffect } from 'react';
import axios from 'axios';
import Asidebar from './Asidebar';

function Vuser() {
    // State for users data and pagination
    const [userData, setUserData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedUser, setSelectedUser] = useState(null); // To store the selected user for update/delete
    const [showMenu, setShowMenu] = useState(null); // To toggle the menu visibility
    const [showUpdateForm, setShowUpdateForm] = useState(false); // To toggle update form visibility
    const usersPerPage = 10;

    // Fetch data from the API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/users');
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    // Logic to calculate pagination
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = userData.slice(indexOfFirstUser, indexOfLastUser);

    const isUserActive = (updatedAt) => {
        const lastUpdatedTime = new Date(updatedAt).getTime();
        const currentTime = new Date().getTime();
        const differenceInMs = currentTime - lastUpdatedTime;
        const differenceInHours = differenceInMs / (1000 * 60 * 60);
        return differenceInHours <= 48;
    };
    // Logic to change page
    const nextPage = () => setCurrentPage(prevPage => prevPage + 1);
    const prevPage = () => setCurrentPage(prevPage => prevPage - 1);

    // Function to handle delete user
    const deleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:8000/api/users/${userId}`);
            // Remove the deleted user from the list
            setUserData(userData.filter(user => user._id !== userId));
            
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    // Function to handle update user
    const updateUser = (user) => {
        setSelectedUser(user);
        setShowUpdateForm(true);
        setShowMenu(null); // Close the menu when updating
    };

    // Update form submit handler
    const handleUpdateFormSubmit = async (updatedUserData) => {
        // Send updated data to the API
        try {
            await axios.put(`http://localhost:8000/api/users/${selectedUser._id}`, updatedUserData);
            // Update user data in the list
            setUserData(userData.map(user => (user._id === selectedUser._id ? { ...user, ...updatedUserData } : user)));
            // Close update form
            setShowUpdateForm(false);
            setSelectedUser(null);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <main className='w-full h-screen bg-gray-100 flex'>
            <Asidebar />
            <div className='ml-60 p-6 flex-grow justify-center'>
                <div className=''>
                    <h3 className='text-2xl font-semibold'>View Users</h3>
                    <table className="table-auto mt-8">
                        <thead>
                            <tr>
                                <th className="border border-black px-4 py-2">Username</th>
                                <th className="border border-black px-4 py-2">Role</th>
                                <th className="border border-black px-4 py-2">Verified account</th>
                                <th className="border border-black px-4 py-2">Created At</th>
                                <th className="border border-black px-4 py-2">Update At</th>
                                <th className="border border-black px-4 py-2">Status</th>
                                <th className="border border-black px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsers.map((user, id) => (
                                <tr key={id}>
                                    <td className="border border-black px-4 py-2">{user.email}</td>
                                    <td className="border border-black px-4 py-2">{user.role}</td>
                                    <td className="border border-black px-4 py-2">{user.isVerified ? 'Yes' : 'No'}</td>
                                    <td className="border border-black px-4 py-2">{user.createdAt}</td>
                                    <td className="border border-black px-4 py-2">{user.updatedAt}</td>
                                    <td className="border border-black px-4 py-2">{isUserActive(user.updatedAt) ? 'Active' : 'Inactive'}</td>
                                    <td className="border border-black px-4 py-2">
                                        <div className="relative">
                                            <button onClick={() => setShowMenu(user._id)} className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100" id="options-menu" aria-haspopup="true" aria-expanded="true">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 3a2 2 0 100-4 2 2 0 000 4zM10 8a2 2 0 100-4 2 2 0 000 4zM10 13a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                                </svg>
                                            </button>

                                            {showMenu === user._id && (
                                                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                                    <div className="py-1" role="none">
                                                        <button onClick={() => updateUser(user)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left" role="menuitem">Update</button>
                                                        <button onClick={() => deleteUser(user._id)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left" role="menuitem">Delete</button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* Pagination */}
                    <div className="mt-4">
                        <button onClick={prevPage} disabled={currentPage === 1} className="px-3 py-1 bg-blue-500 text-white rounded mr-2">Previous</button>
                        <button onClick={nextPage} disabled={currentUsers.length < usersPerPage} className="px-3 py-1 bg-blue-500 text-white rounded">Next</button>
                    </div>
                </div>
            </div>
            {/* Update User Form */}
            {showUpdateForm && selectedUser && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                            <div>
                                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">Update User</h3>
                                    <div className="mt-5">
                                        <form onSubmit={handleUpdateFormSubmit}>
                                            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                                                <div className="sm:col-span-2">
                                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                                        Email address
                                                    </label>
                                                    <div className="mt-1">
                                                        <input type="email" id="email" name="email" value={selectedUser.email} disabled className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                                                    </div>
                                                </div>
                                                <div className="sm:col-span-2">
                                                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                                                        Role
                                                    </label>
                                                    <div className="mt-1">
                                                        <input type="text" id="role" name="role" value={selectedUser.role} className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-5 sm:mt-6">
                                                <button type="submit" className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm">
                                                    Update
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}

export default Vuser;
