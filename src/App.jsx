import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import ProfilePage from './Pages/ProfilePage';
import PointsPage from './Pages/PointsPage';
import LoginPage from "./Pages/LoginPage";

import SignUpPage from './Pages/SignUpPage';
import ProtectedRoute from './Components/ProtectedRoute';
import HomePage from './Pages/HomePage';
import MapPage from './Pages/MapPage';
import ContactSection from './Pages/ContactSection';
import CarBooking from './Components/CarBooking';
import Booksection from './Pages/Booksection';
//           setUserLocation([latitude, longitude]);


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
        <Route path="/map" element={<MapPage />} />
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/contact" element={<ContactSection />} />
        <Route path="/car-booking" element={<CarBooking />} />
        <Route path="/confirmation" element={<Booksection />} />
      </Routes>
    </Router>
  );
}

export default App;
