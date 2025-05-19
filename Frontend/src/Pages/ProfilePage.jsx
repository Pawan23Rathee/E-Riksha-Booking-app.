import React, { useState } from 'react';
import axios from 'axios';

const ProfilePage = ({ user, setUser }) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    age: user?.age || '',
    dob: user?.dob || ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:3000/api/auth/profile/${user.id}`, formData);
      setUser(response.data.user);
      alert('Profile updated successfully!');
    } catch (err) {
      console.error('Update error:', err);
      alert('Failed to update profile');
    }
  };

  if (!user) {
    return <div className="text-center mt-10 text-lg">Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg mt-40">
      <h2 className="text-2xl font-bold mb-4">Profile Page</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="dob"
          placeholder="Date of Birth"
          value={formData.dob}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
