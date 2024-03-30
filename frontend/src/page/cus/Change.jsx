import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Change = () => {
  const [password1, setPassword1] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = {};

    // Email validation

    // Password validation
    if (!password.trim()) {
      errors.password = 'Password is required';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }

    // Confirm password validation
    if (password !== password1) {
      errors.password1 = 'Passwords do not match';
    }

    // If there are errors, set them and prevent form submission
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    // If no errors, proceed with form submission
    console.log('Login Email:', password1);
    console.log('Login Password:', password);
    setPassword1('');
    setPassword('');
    setErrors({});
  };

  return (
    <div className='w-full min-h-screen flex justify-center items-center bg-gray-100'>
      <div className='max-w-md w-full px-4 border-2 border-gray-800 rounded bg-white'>
        <h1 className='text-3xl font-bold text-center py-4 text-black'>Sign up</h1>
        <form className='mt-8 px-4 py-6' onSubmit={handleSubmit}>
          <div className='relative'>
            <input
              className='p-3 my-2 w-full bg-white rounded border border-gray-300 pr-10 text-black'
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
              autoComplete='current-password'
              value={password}
              onChange={(e) => setPassword1(e.target.value)}
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
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          <div className='relative'>
            <input
              className='p-3 my-2 w-full bg-white rounded border border-gray-300 pr-10 text-black'
              type={showPassword ? 'text' : 'password'}
              placeholder='Confirm Password'
              autoComplete='current-password'
              value={password1}
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
          {errors.password1 && <p className="text-red-500 text-sm">{errors.password1}</p>}
          <button type='submit' className='bg-red-600 py-3 my-6 rounded w-full text-white font-bold'>
            Change password
          </button>
        </form>
      </div>
    </div>
  );
};

export default Change;
