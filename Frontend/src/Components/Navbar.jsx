import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { FaCoins, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setProfilePic(parsedUser?.profilePic || null);
    }
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setMenuOpen(false);
    setDropdownOpen(false);
    localStorage.removeItem('profilePic');
    localStorage.removeItem('user'); // clear user data too
    setProfilePic(null);
    navigate('/login'); // redirect after logout
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
              <NavLink to="/map" className={({ isActive }) => (isActive ? 'active-link' : '')}>
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
      <NavLink to="/profile" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
        Profile
      </NavLink>
      <NavLink to="/settings" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
        Settings
      </NavLink>
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
    </>        
  );
};

export default Navbar;
