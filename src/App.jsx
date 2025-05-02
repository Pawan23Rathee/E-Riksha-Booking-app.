import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import ProfilePage from './Pages/ProfilePage';
import PointsPage from './Pages/PointsPage';
import LoginPage from './Pages/LoginPage';
import SignUpPage from './Pages/SignUpPage';
import ProtectedRoute from './Components/ProtectedRoute';
import HomePage from './Pages/HomePage';
import MapPage from './Pages/MapPage'; // ✅ Import MapPage
import ContactSection from './Pages/Contactsection'; // ✅ Import ContactSection

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>

        
        <Route path="/" element={<HomePage />} />
        <Route 
          path="/profile" 
          element={<ProtectedRoute isLoggedIn={isLoggedIn}><ProfilePage /></ProtectedRoute>} 
        />
        <Route 
          path="/points" 
          element={<ProtectedRoute isLoggedIn={isLoggedIn}><PointsPage /></ProtectedRoute>} 
        />
        <Route path="/map" element={<MapPage />} /> {/* ✅ Add map route here */}
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/contact" element={<ContactSection />} /> {/* Add contact route here */}
       
      </Routes>
    </Router>
  );
}

export default App;
