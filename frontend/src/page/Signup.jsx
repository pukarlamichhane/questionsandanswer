import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Signup = () => {
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
    <div className='w-full h-screen'>
      <img
        className='hidden sm:block absolute w-full h-full object-cover'
        src="https://media.cntraveler.com/photos/56420d2496771ce632e3df6a/master/pass/sneakers-tout.jpg"
        alt='/'
      />
      <div className='bg-white-600 border-black fixed top-0 left-0 w-full h-screen'></div>
      <div className='fixed w-full px-4 py-24 z-50'>
        <div className='max-w-[450px] h-[400px] mx-auto bg-black/75 text-white'>
          <div className='max-w-[320px] mx-auto py-10'>
            <h1 className='text-3xl font-bold'>Sign up</h1>
            <form className='w-full flex flex-col py-4' onSubmit={handleSubmit}>
              <input
                className='p-3 my-2 bg-gray-700 rounded'
                type='email'
                placeholder='Email'
                autoComplete='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className='relative'>
                <input
                  className='p-3 my-2 w-full bg-gray-700 rounded pr-10'
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
                Sign up
              </button>
              <div className='flex justify-between items-center text-sm text-white'>
                <label className='flex items-center'>
                  <input type='checkbox' className='mr-2' />
                  <span>Remember me</span>
                </label>
                <span className='text-white-600'>
                   <Link to="/login">Already have an account?</Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;