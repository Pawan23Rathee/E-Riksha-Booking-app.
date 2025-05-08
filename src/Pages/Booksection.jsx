import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import FreeMap from '../Components/FreeMap';

const BookSection = () => {
  const { state } = useLocation();
  const { origin, destination } = state || {};
  const [distanceKm, setDistanceKm] = useState(0);

  const fare = distanceKm * 5;

  return (
    <div className="p-4 mt-20">
      {origin && destination && (
        <>
          <FreeMap origin={origin} destination={destination} onDistance={setDistanceKm} />

          <div className="mt-4 p-4 bg-white rounded shadow">
            <h2 className="font-bold text-xl mb-2">Fare Summary</h2>
            <p>Distance: {distanceKm} km</p>
            <p>Fare: ₹{fare.toFixed(0)}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default BookSection;
