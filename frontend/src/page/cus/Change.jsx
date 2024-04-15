import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Change = () => {
  const [password1, setPassword1] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [errors, setErrors] = useState({});

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const togglePasswordVisibility1 = () => {
    setShowPassword1(!showPassword1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = {};

    // Password validation
    if (!password.trim()) {
      errors.password = 'Password is required';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }

    // Confirm password validation
    if (!password1.trim()) {
      errors.password1 = 'Please confirm your password';
    } else if (password !== password1) {
      errors.password1 = 'Passwords do not match';
    }

    // If there are errors, set them and prevent form submission
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    try {
      // If no errors, proceed with form submission
      const response = await axios.post('your_backend_endpoint_here', {
        newPassword: password
      });

      console.log('Password changed successfully:', response.data);

      // Show success message
      toast.success('Password changed successfully', {
        position: toast.POSITION.TOP_CENTER
      });

      // Clear form fields and errors after successful password change
      setPassword1('');
      setPassword('');
      setErrors({});
    } catch (error) {
      console.error('Password change error:', error.response.data);

      // Show error message
      toast.error('Failed to change password. Please try again.', {
        position: toast.POSITION.TOP_CENTER
      });

      // Handle password change errors here, if needed
    }
  };

  return (
    <div className='w-full min-h-screen flex justify-center items-center bg-gray-100'>
      <div className='max-w-md w-full px-4 border-2 border-gray-800 rounded bg-white'>
        <h1 className='text-3xl font-bold text-center py-4 text-black'>Change Password</h1>
        <form className='mt-8 px-4 py-6' onSubmit={handleSubmit}>
          <div className='relative'>
            <input
              className='p-3 my-2 w-full bg-white rounded border border-gray-300 pr-10 text-black'
              type={showPassword ? 'text' : 'password'}
              placeholder='New Password'
              autoComplete='new-password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className='absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer' onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          <div className='relative'>
            <input
              className='p-3 my-2 w-full bg-white rounded border border-gray-300 pr-10 text-black'
              type={showPassword1 ? 'text' : 'password'}
              placeholder='Confirm Password'
              autoComplete='confirm-password'
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
            />
            <span className='absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer' onClick={togglePasswordVisibility1}>
              {showPassword1 ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.password1 && <p className="text-red-500 text-sm">{errors.password1}</p>}
          <button type='submit' className='bg-red-600 py-3 my-6 rounded w-full text-white font-bold'>
            Change Password
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Change;
