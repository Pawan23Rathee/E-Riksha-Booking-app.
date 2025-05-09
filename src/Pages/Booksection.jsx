import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import FreeMap from '../Components/FreeMap';

const BookSection = () => {
  const { state } = useLocation();
  const { origin, destination } = state || {};
  const [distanceKm, setDistanceKm] = useState(null);

  const calculateFare = (rate) => {
    return typeof distanceKm === 'number' ? Math.round(distanceKm * rate) : '...';
  };

  const cabOptions = [
    { type: 'Bike', rate: 5, arrival: '1 min', drop: '2:35 pm', tag: 'FASTEST' },
    { type: 'Cab Economy', rate: 10, arrival: '1 min', drop: '2:41 pm', passengers: 4 },
    { type: 'Cab XL', rate: 13, arrival: '5 mins', drop: '2:45 pm' },
    { type: 'Cab Premium', rate: 12, arrival: '4 mins', drop: '2:44 pm' },
  ];

  return (
    <div className="p-4 mt-20">
      {origin && destination && (
        <>
          <FreeMap origin={origin} destination={destination} onDistance={setDistanceKm} />

          <div className="mt-6 bg-white p-4 rounded-xl shadow-lg">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Choose Your Ride</h2>

            {cabOptions.map((cab, index) => (
              <div
                key={index}
                className="flex justify-between items-center mb-4 p-3 border rounded-lg hover:bg-gray-100"
              >
                <div>
                  <div className="font-semibold text-gray-800">{cab.type}</div>
                  <div className="text-sm text-gray-500">
                    {cab.passengers && `${cab.passengers} passengers`} {cab.tag && `• `}
                    <span className="text-green-600 font-medium">{cab.tag || ''}</span>
                  </div>
                  <div className="text-xs text-gray-400">
                    {cab.arrival} away • Drop {cab.drop}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">₹{calculateFare(cab.rate)}</div>
                </div>
              </div>
            ))}

            <div className="mt-4 flex justify-between items-center">
              <span className="text-gray-600">Total Distance:</span>
              <span className="font-medium">
                {typeof distanceKm === 'number' ? `${distanceKm.toFixed(2)} km` : 'Calculating...'}
              </span>
            </div>

            <button className="mt-6 w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 rounded-lg">
              Book Cab Economy
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default BookSection;
