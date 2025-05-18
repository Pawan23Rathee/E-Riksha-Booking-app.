import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import ProfilePage from './Pages/ProfilePage';
import PointsPage from './Pages/PointsPage';
import LoginPage from "./Pages/LoginPage";
import SignUpPage from './Pages/SignUpPage';
import ProtectedRoute from './Components/ProtectedRoute';
// import HomePage from './Pages/HomePage';
import MapPage from './Pages/MapPage';
import ContactSection from './Pages/ContactSection';
import CarBooking from './Components/CarBooking';
import Booksection from './Pages/Booksection';
<<<<<<< HEAD
import ConfirmationPage from './Pages/ConfirmationPage'; // ✅ Import here
import Bookinghistory from './Pages/bookinghistory';


=======
import ConfirmationPage from './Pages/ConfirmationPage';
import SplashScreen from './Components/SplashScreen';
import Footer from './Components/Footer';
>>>>>>> 8c3c9277cc33c06f66805873dbd066edc9df5ef9

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
<<<<<<< HEAD
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProtectedRoute isLoggedIn={isLoggedIn}><ProfilePage /></ProtectedRoute>} />
        <Route path="/points" element={<ProtectedRoute isLoggedIn={isLoggedIn}><PointsPage /></ProtectedRoute>} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/contact" element={<ContactSection />} />
        <Route path="/car-booking" element={<CarBooking />} />
        <Route path="/booksection" element={<Booksection />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/booking" element={<Bookinghistory/>}/>
        
      
      </Routes>
=======
      {showSplash ? (
        <SplashScreen />
      ) : (
        <>
          <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          <Routes>
            <Route path="/" element={<MapPage />} />
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
            <Route path="/signup" element={<SignUpPage setIsLoggedIn={setIsLoggedIn} />} />

            <Route path="/contact" element={<ContactSection />} />
            <Route path="/car-booking" element={<CarBooking />} />
            <Route path="/booksection" element={<Booksection />} />
            <Route path="/confirmation" element={<ConfirmationPage />} />
          </Routes>
          <Footer/>
        </>
      )}
>>>>>>> 8c3c9277cc33c06f66805873dbd066edc9df5ef9
    </Router>
  );
}

export default App;
