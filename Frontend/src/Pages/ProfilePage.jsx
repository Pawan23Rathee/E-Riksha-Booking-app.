import React, { useState } from 'react';

const ProfilePage = ({ user, setUser }) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    age: user?.age || '',
    dob: user?.dob ? user.dob.slice(0, 10) : '',
  });

  const [profilePic, setProfilePic] = useState(user?.profilePic || '');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const uploadData = new FormData();
      uploadData.append('profilePic', file);

      try {
        const res = await fetch('http://localhost:3000/api/auth/upload-profile-pic', {
          method: 'POST',
          body: uploadData,
        });

        const data = await res.json();

        if (res.ok) {
          setProfilePic(data.url); // ✅ Correct Cloudinary image URL
          setError('');
        } else {
          setError(data.message || 'Failed to upload image');
        }
      } catch {
        setError('Error uploading image');
      }
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updateData = { ...formData, profilePic };

    try {
      const res = await fetch(`http://localhost:3000/api/auth/profile/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Update failed');
        setMessage('');
      } else {
        setUser(data.user); // update user in parent/global state
        setMessage('Profile updated successfully!');
        setError('');
      }
    } catch {
      setError('Server error');
      setMessage('');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Edit Profile</h2>

      <div style={styles.profilePicContainer}>
        <img 
          src={profilePic || '/default-profile.png'} 
          alt="Profile Pic" 
          style={styles.profilePic}
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleProfilePicChange}
          style={{ display: 'none' }}
          id="profilePicInput"
        />
        <label htmlFor="profilePicInput" style={styles.uploadBtn}>
          Change Profile Picture
        </label>
      </div>

      <form onSubmit={handleUpdate} style={styles.form}>
        <label style={styles.label}>
          Name:
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </label>

        <label style={styles.label}>
          Phone:
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            style={styles.input}
            type="tel"
            pattern="[0-9]{10}"
            placeholder="10 digit phone"
          />
        </label>

        <label style={styles.label}>
          Age:
          <input
            name="age"
            value={formData.age}
            onChange={handleChange}
            style={styles.input}
            type="number"
            min="1"
            max="120"
          />
        </label>

        <label style={styles.label}>
          Date of Birth:
          <input
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            style={styles.input}
            type="date"
          />
        </label>

        <button type="submit" style={styles.button}>Update Profile</button>
      </form>

      {message && <p style={{ color: 'green', marginTop: 10 }}>{message}</p>}
      {error && <p style={{ color: 'red', marginTop: 10 }}>{error}</p>}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 400,
    margin: '100px auto',
    padding: 20,
    borderRadius: 8,
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  profilePicContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid #4CAF50',
  },
  uploadBtn: {
    marginTop: 10,
    padding: '8px 16px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    borderRadius: 4,
    cursor: 'pointer',
    fontSize: 14,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  label: {
    fontSize: 14,
    color: '#555',
    display: 'flex',
    flexDirection: 'column',
    fontWeight: 'bold',
  },
  input: {
    marginTop: 6,
    padding: 8,
    fontSize: 14,
    borderRadius: 4,
    border: '1px solid #ccc',
  },
  button: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#4CAF50',
    border: 'none',
    borderRadius: 4,
    color: '#fff',
    fontSize: 16,
    cursor: 'pointer',
  },
};

export default ProfilePage;
