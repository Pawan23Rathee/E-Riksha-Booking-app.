import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import FreeMap from '../Components/FreeMap';
import { FaCarSide } from 'react-icons/fa';

const BookSection = () => {
  const { state } = useLocation();
  const { origin, destination } = state || {};
  const [distanceKm, setDistanceKm] = useState(0);

  const fare = parseFloat(distanceKm) * 10;

  return (
    <div className="p-4 mt-20 flex flex-col items-center">
      {origin && destination && (
        <>
          <FreeMap origin={origin} destination={destination} onDistance={setDistanceKm} />

          <div className="mt-6 w-full max-w-md p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FaCarSide className="text-yellow-500 text-3xl" />
                <h2 className="font-semibold text-xl text-gray-800">Cab Economy</h2>
              </div>
              <span className="text-sm text-green-600">1 min away</span>
            </div>

            <div className="mb-4">
              <p className="text-gray-500">Affordable car rides</p>
              <p className="text-sm text-gray-400">Drop: {new Date(Date.now() + distanceKm * 2 * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            </div>

            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Distance:</span>
              <span className="text-black font-medium">{Number(distanceKm).toFixed(2)} km</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">Estimated Fare:</span>
              <span className="text-black font-bold text-lg">₹{fare.toFixed(0)}</span>
            </div>

            <button className="mt-6 w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-xl transition-all font-semibold">
              Book Cab Economy
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default BookSection;
