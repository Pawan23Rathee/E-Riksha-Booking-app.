import React, { useState } from 'react';

const ProfilePage = ({ user, setUser }) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    age: user?.age || '',
    dob: user?.dob || '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/auth/profile/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Update failed');
        setMessage('');
      } else {
        setUser(data.user);
        setMessage('Profile updated successfully!');
        setError('');
      }
    } catch (err) {
      console.error('Update error:', err);
      setError('Server error');
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-20">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md border border-gray-300">
        <h2 className="text-2xl font-bold mb-4 text-center text-green-700">Your Profile</h2>

        {message && <p className="text-green-600 text-center mb-2">{message}</p>}
        {error && <p className="text-red-600 text-center mb-2">{error}</p>}

        <form onSubmit={handleUpdate}>
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              type="text"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">Phone</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              type="text"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">Age</label>
            <input
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              type="number"
            />
          </div>

          <div className="mb-6">
            <label className="block font-medium text-gray-700 mb-1">Date of Birth</label>
            <input
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              type="date"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
