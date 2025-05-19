// SignUpPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpPage = ({ setIsLoggedIn, setUser }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    dob: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone, age, dob, password } = formData;

    if (!name || !email || !phone || !age || !dob || !password) {
      setError('All fields are required');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Registration failed');
      } else {
        setUser(data.user);
        setIsLoggedIn(true);
        alert('Signup successful');
        navigate('/profile');
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError('Server error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4 mt-20">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-green-700">Sign Up</h2>

        {error && <p className="mb-4 text-red-600 font-semibold text-center">{error}</p>}

        <form onSubmit={handleSubmit}>
          {['name', 'email', 'phone', 'age', 'dob', 'password'].map((field) => (
            <div className="mb-4" key={field}>
              <label htmlFor={field} className="block text-gray-800 font-semibold mb-2">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'}
                name={field}
                id={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder={`Enter your ${field}`}
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 text-lg font-semibold"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
