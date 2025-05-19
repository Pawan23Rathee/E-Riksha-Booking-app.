// ConfirmationPage.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';

const ConfirmationPage = () => {
  const location = useLocation();
  const { origin, destination, vehicle, fare } = location.state || {};

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Booking Confirmed!</h1>
      <p><strong>From:</strong> {origin?.toString()}</p>
      <p><strong>To:</strong> {destination?.toString()}</p>
      <p><strong>Vehicle:</strong> {vehicle}</p>
      <p><strong>Total Fare:</strong> ₹{fare}</p>
    </div>
  );
};

export default ConfirmationPage;
