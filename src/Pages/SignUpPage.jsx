import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', age: '', dob: '', password: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignUp = async () => {
    const { name, email, phone, age, dob, password } = formData;
    if (!name || !email || !phone || !age || !dob || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || 'Signup failed');
      } else {
        alert("Account created successfully!");
        navigate('/login');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('Server error during signup');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-20 flex justify-center items-start p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-green-700">Sign Up</h2>

        {['name', 'email', 'phone', 'age', 'dob', 'password'].map((field) => (
          <div className="mb-5" key={field}>
            <label
              htmlFor={field}
              className="block text-gray-800 font-semibold mb-2 capitalize"
            >
              {field}
            </label>
            <input
              id={field}
              type={field === 'password' ? 'password' : field === 'dob' ? 'date' : 'text'}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              placeholder={`Enter your ${field}`}
            />
          </div>
        ))}

        <button
          onClick={handleSignUp}
          className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition text-lg font-semibold"
        >
          Sign Up
        </button>

        <p className="mt-6 text-center text-gray-700">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-green-600 font-semibold underline hover:text-green-800"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
