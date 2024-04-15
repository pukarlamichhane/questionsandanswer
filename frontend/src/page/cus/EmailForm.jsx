import { useState } from 'react';
import axios from 'axios';

const EmailForm = () => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = {};

    // Email validation
    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }

    // If there are errors, set them and prevent form submission
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    try {
      // If no errors, proceed with form submission
      const response = await axios.post('your_backend_endpoint_here', {
        email
      });

      console.log('Email sent successfully:', response.data);

      // Clear form fields and errors after successful email sending
      setEmail('');
      setErrors({});
    } catch (error) {
      console.error('Email sending error:', error.response.data);
      // Handle email sending errors here, if needed
    }
  };

  return (
    <div className='w-full min-h-screen flex justify-center items-center bg-gray-100'>
      <div className='max-w-md w-full px-4 border-2 border-gray-800 rounded bg-white'>
        <h1 className='text-3xl font-bold text-center py-4 text-black'>Send the email</h1>
        <form className='mt-8 px-4 py-6' onSubmit={handleSubmit}>
          <input
            className='p-3 my-2 w-full bg-white rounded border border-gray-300 text-black'
            type='email'
            placeholder='Email'
            autoComplete='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          <button type='submit' className='bg-red-600 py-3 my-6 rounded w-full text-white font-bold'>
            Send code
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailForm;
