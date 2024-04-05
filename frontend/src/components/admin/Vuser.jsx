import { useState } from 'react';
import Asidebar from './Asidebar';

function Vuser() {
    // Dummy data
    const userData = [
        { username: 'user1', password: 'user_password1', role: 'user' },
        { username: 'user2', password: 'user_password2', role: 'user' },
        // Add more data here
    ];

    // State for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;

    // Logic to calculate pagination
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = userData.slice(indexOfFirstUser, indexOfLastUser);

    // Logic to change page
    const nextPage = () => setCurrentPage(prevPage => prevPage + 1);
    const prevPage = () => setCurrentPage(prevPage => prevPage - 1);

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
                                <th className="border border-black px-4 py-2">Password</th>
                                <th className="border border-black px-4 py-2">Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsers.map((user, index) => (
                                <tr key={index}>
                                    <td className="border border-black px-4 py-2">{user.username}</td>
                                    <td className="border border-black px-4 py-2">{user.password}</td>
                                    <td className="border border-black px-4 py-2">{user.role}</td>
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
        </main>
    );
}

export default Vuser;
