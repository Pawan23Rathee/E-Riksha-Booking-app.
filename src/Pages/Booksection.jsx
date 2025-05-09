import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import FreeMap from '../Components/FreeMap';

const BookSection = () => {
  const { state } = useLocation();
  const { origin, destination } = state || {};
  const [distanceKm, setDistanceKm] = useState(null);

  const baseFare = typeof distanceKm === 'number' ? distanceKm * 10 : null;

  return (
    <div className="p-4 mt-20">
      {origin && destination && (
        <>
          <FreeMap origin={origin} destination={destination} onDistance={setDistanceKm} />

          <div className="mt-6 p-6 bg-white rounded-2xl shadow-md">
            <h2 className="font-semibold text-xl text-gray-800 mb-4">Fare Summary</h2>

            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-600">Total Distance:</span>
              <span className="text-black font-medium">
                {typeof distanceKm === 'number' ? `${distanceKm.toFixed(2)} km` : 'Calculating...'}
              </span>
            </div>

            <div className="flex justify-between items-center mb-1">
              <span className="text-gray-600">Fare @ ₹10/km:</span>
              <span className="text-black font-bold text-lg">
                ₹{typeof baseFare === 'number' ? baseFare.toFixed(0) : '...'}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BookSection;
