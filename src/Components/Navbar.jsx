import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import { FaCoins, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setMenuOpen(false);
    setDropdownOpen(false);
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

          <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes color="white" size={22} /> : <FaBars color="white" size={22} />}
          </div>

          <ul className={`List ${menuOpen ? 'active' : ''}`}>
            <li onClick={() => setMenuOpen(false)}>
              <NavLink to="/" className={({ isActive }) => (isActive ? 'active-link' : '')}>
                Home
              </NavLink>
            </li>
            <li onClick={() => setMenuOpen(false)}>
              <NavLink to="/history" className={({ isActive }) => (isActive ? 'active-link' : '')}>
                History
              </NavLink>
            </li>
            <li onClick={() => setMenuOpen(false)}>
              <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active-link' : '')}>
                Contact
              </NavLink>
            </li>
            <li onClick={() => setMenuOpen(false)}>
              <NavLink to="/map" className={({ isActive }) => (isActive ? 'active-link' : '')}>
                Map
              </NavLink>
            </li>

            <div className="coin-box" title="You have coins">
              <FaCoins className="coin-icon" />
              <span>10</span>
            </div>

            {isLoggedIn ? (
              <div className="profile" onClick={() => setDropdownOpen(!dropdownOpen)}>
                <img
                  className="profile-img"
                  src={profilePic || "/default-profile.png"}
                  alt="Profile"
                />
                {dropdownOpen && (
                  <div className="dropdown-menu">
                    <NavLink to="/profile" className="dropdown-item" onClick={() => setDropdownOpen(false)}>Profile</NavLink>
                    <NavLink to="/settings" className="dropdown-item" onClick={() => setDropdownOpen(false)}>Settings</NavLink>
                    <button onClick={handleLogout} className="dropdown-item">Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <div className="auth-buttons">
                <NavLink to="/login" className="login-link" onClick={() => setMenuOpen(false)}>Login</NavLink>
                <NavLink to="/signup" className="signup-link" onClick={() => setMenuOpen(false)}>Sign Up</NavLink>
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
