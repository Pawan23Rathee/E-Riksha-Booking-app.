import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { origin, destination, vehicle, fare } = location.state || {};

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '80px' }}>
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          backgroundColor: '#fff',
          padding: '30px',
          borderRadius: '20px',
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
          maxWidth: '500px',
          width: '90%',
          textAlign: 'center',
        }}
      >
        <h2 style={{ color: 'green', fontSize: '28px', marginBottom: '10px' }}>
          🎉 Booking Confirmed!
        </h2>
        <p style={{ fontSize: '16px', marginBottom: '20px' }}>
          Your {vehicle} is on the way.
        </p>

        <div style={{ textAlign: 'left', fontSize: '16px', marginBottom: '20px' }}>
          <p><strong>Pickup:</strong> {origin?.join(', ')}</p>
          <p><strong>Drop:</strong> {destination?.join(', ')}</p>
          <p><strong>Fare:</strong> ₹{fare}</p>
          <p><strong>Arrival in:</strong> ~6 mins</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          style={{
            backgroundColor: '#28a745',
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
          onClick={handleBack}
        >
          Back to Home
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ConfirmationPage;
