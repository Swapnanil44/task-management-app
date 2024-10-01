import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', formData);
      console.log('User logged in:', res.data);
      // Save the token in localStorage or cookies
      localStorage.setItem('token', res.data.token);
    } catch (error) {
      console.error('Error logging in user', error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-dark-lighter p-6 rounded-md">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 text-dark-text">Email</label>
          <input
            type="email"
            className="w-full p-2 rounded-md bg-dark text-dark-text"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-dark-text">Password</label>
          <input
            type="password"
            className="w-full p-2 rounded-md bg-dark text-dark-text"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-dark-accent p-2 text-white rounded-md"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
