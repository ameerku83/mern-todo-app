import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { axiosInstance } from './axiosInstance';
import { Link } from 'react-router-dom';

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post('/signup', data); // Adjust the URL to your backend
      console.log(response.data);
      alert('Signup successful');
    } catch (error) {
      alert(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
            <input
              type="text"
              {...register('username', { required: 'Username is required' })}
              className="input input-bordered w-full"
            />
            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              {...register('password', { required: 'Password is required', minLength: 4 })}
              className="input input-bordered w-full"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <button type="submit" className="btn btn-primary w-full">Sign Up</button>
        </form>
        <Link to={'/login'} > <span className='text-center text-blue-600 hover:underline' >Already have an account?  Login </span></Link>

      </div>
    </div>
  );
}

export default Signup;
