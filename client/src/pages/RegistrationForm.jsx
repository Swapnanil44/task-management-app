import React, { useState } from 'react';
import axios from 'axios';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/register', formData);
      console.log('User registered:', res.data);
    } catch (error) {
      console.error('Error registering user', error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-dark-lighter p-6 rounded-md">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 text-dark-text">Name</label>
          <input
            type="text"
            className="w-full p-2 rounded-md bg-dark text-dark-text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
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
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
