import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
//import backgroundImage from './background.jpg'; // Import your background image

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signup Email:', email);
    console.log('Signup Password:', password);
    setEmail('');
    setPassword('');
  };

  return (
    <div
      className='w-full min-h-screen flex justify-center items-center bg-cover bg-center'
      style={{ backgroundImage: `url(https://media.cntraveler.com/photos/56420d2496771ce632e3df6a/master/pass/sneakers-tout.jpg)` }}
    >
      <div className='max-w-md w-full px-4 border-2 border-gray-800 rounded bg-white'>
        <h1 className='text-3xl font-bold text-center py-4 text-black'>Sign up</h1>
        <form className='mt-8 px-4 py-6' onSubmit={handleSubmit}>
          <input
            className='p-3 my-2 w-full bg-white rounded border border-gray-300 text-black'
            type='email'
            placeholder='Email'
            autoComplete='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className='relative'>
            <input
              className='p-3 my-2 w-full bg-white rounded border border-gray-300 pr-10 text-black'
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
              autoComplete='current-password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {showPassword ? (
              <FaEyeSlash
                className='absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer'
                onClick={togglePasswordVisibility}
              />
            ) : (
              <FaEye
                className='absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer'
                onClick={togglePasswordVisibility}
              />
            )}
          </div>
          <button type='submit' className='bg-red-600 py-3 my-6 rounded w-full text-white font-bold'>
            Login
          </button>
          <div className='flex justify-between items-center text-sm'>
            <label className='flex items-center text-black'>
              <input type='checkbox' className='mr-2' />
              <span>Remember me</span>
            </label>
            <span>
              <Link to="/signup" className='text-gray-500'>Forget password</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
