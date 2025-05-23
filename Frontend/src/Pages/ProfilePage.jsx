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
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
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
      setError('Server error');
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        name="phone"
        value={formData.phone}
        onChange={handleChange}
      />
      <input
        name="age"
        value={formData.age}
        onChange={handleChange}
      />
      <input
        name="dob"
        value={formData.dob}
        onChange={handleChange}
        type="date"
      />
      <button type="submit">Update Profile</button>

      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default ProfilePage;
