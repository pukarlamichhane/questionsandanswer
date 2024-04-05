import { useState } from 'react';
import Asidebar from './Asidebar';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Auser() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [showPassword, setShowPassword] = useState(false);

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log({ username, password, role });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <main className='w-full h-screen bg-gray-200 flex justify-center items-center'>
            <Asidebar/>
            <div className='p-6'>
                <div className='max-w-xl w-full px-8 py-6 bg-white shadow rounded-lg'>
                    <h3 className='text-2xl font-semibold text-center mb-4'>Add Users</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6 relative">
                            <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">Username:</label>
                            <input
                                type="email"
                                id="username"
                                value={username}
                                onChange={handleUsernameChange}
                                className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-blue-500"
                                placeholder="Enter username"
                            />
                        </div>
                        <div className="mb-6 relative">
                            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password:</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-blue-500 pr-10"
                                    placeholder="Enter password"
                                />
                                {showPassword ? (
                                    <FaEyeSlash
                                        className='absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500'
                                        onClick={togglePasswordVisibility}
                                    />
                                ) : (
                                    <FaEye
                                        className='absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500'
                                        onClick={togglePasswordVisibility}
                                    />
                                )}
                            </div>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="role" className="block text-gray-700 font-semibold mb-2">Role:</label>
                            <select
                                id="role"
                                value={role}
                                onChange={handleRoleChange}
                                className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-blue-500"
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                        >
                            Add User
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}

export default Auser;
