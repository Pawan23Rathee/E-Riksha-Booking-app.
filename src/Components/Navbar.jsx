import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import { FaCoins } from 'react-icons/fa';


const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const [profilePic, setProfilePic] = useState(null);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleProfilePicUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <nav className="nav">
        <div className="Navbar">
          <div className="Logo">
            <img src="/green (2).png" alt="Logo" />
          </div>

          <ul className="List">
            <li>
              <NavLink to="/" className={({ isActive }) => (isActive ? 'active-link' : '')}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/history" className={({ isActive }) => (isActive ? 'active-link' : '')}>
                History
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active-link' : '')}>
                Contact
              </NavLink>
            </li>
            {/* Add Map Page Link */}
            <li>
              <NavLink to="/map" className={({ isActive }) => (isActive ? 'active-link' : '')}>
                Map
              </NavLink>
            </li>

            <li className="coin-box" title="You have coins">
              <FaCoins className="coin-icon" />
              <span>10</span>
            </li>

            {isLoggedIn ? (
              <div className="profile">
                <img 
                  className="profile-img" 
                  src={profilePic || "/default-profile.png"} 
                  alt="Profile" 
                  onClick={() => document.getElementById('profilePicInput').click()}
                />
                <div className="dropdown-menu">
                  <NavLink to="/profile" className="dropdown-item">Profile</NavLink>
                  <NavLink to="/settings" className="dropdown-item">Settings</NavLink>
                  <button onClick={handleLogout} className="dropdown-item">Logout</button>
                </div>
              </div>
            ) : (
              <div className="auth-buttons">
                <NavLink to="/login" className="login-link">Login</NavLink>
                <NavLink to="/signup" className="signup-link">Sign Up</NavLink>
              </div>
            )}
          </ul>
        </div>
      </nav>

      {isLoggedIn && (
        <input 
          type="file" 
          accept="image/*"
          onChange={handleProfilePicUpload}
          style={{ display: 'none' }}
          id="profilePicInput"
        />
      )}
    </>
  );
};

export default Navbar;
