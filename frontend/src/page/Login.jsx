import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
    setEmail('');
    setPassword('');
  };

  return (
    <div className='w-full min-h-screen flex flex-col md:flex-row items-center justify-center'>
      <img
        className='hidden md:block md:w-1/2 object-cover'
        src='https://media.cntraveler.com/photos/56420d2496771ce632e3df6a/master/pass/sneakers-tout.jpg'
        alt='/'
      />
      <div className='bg-grey/60 fixed top-0 left-0 w-full h-full md:hidden'></div>
      <div className='w-full md:w-1/2 px-4 py-16 z-50'>
        <div className='max-w-[450px] mx-auto bg-black/75 text-white rounded-lg shadow-lg'>
          <div className='max-w-[320px] mx-auto py-16'>
            <h1 className='text-3xl font-bold mb-8'>Sign In</h1>
            <form className='w-full flex flex-col' onSubmit={handleSubmit}>
              <input
                className='p-3 mb-4 bg-gray-700 rounded'
                type='email'
                placeholder='Email'
                autoComplete='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className='relative'>
                <input
                  className='p-3 mb-4 w-full bg-gray-700 rounded pr-10'
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
              <button type='submit' className='bg-red-600 py-3 my-6 rounded font-bold'>
                Sign In
              </button>
              <div className='flex justify-between items-center text-sm text-white-600'>
                <p>Forget password?</p>
                <p>
                  <Link to='/signup'>New to Sneakerhouse?</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;