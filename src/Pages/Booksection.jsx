import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import FreeMap from '../Components/FreeMap';
import { FaCarSide, FaMotorcycle, FaBolt, FaShuttleVan } from 'react-icons/fa';

const rideOptions = [
  {
    key: 'car',
    name: 'Cab Economy',
    icon: <FaCarSide className="text-blue-500 text-3xl drop-shadow-md" />,
    baseFare: 24,
    tag: 'Standard',
    tollTax: 50,  // Example toll tax for car
  },
  {
    key: 'bike',
    name: 'Bike',
    icon: <FaMotorcycle className="text-green-500 text-3xl drop-shadow-md" />,
    baseFare: 15,
    tag: 'Fastest',
  },
  {
    key: 'auto',
    name: 'Auto Rickshaw',
    icon: <FaShuttleVan className="text-orange-500 text-3xl drop-shadow-md" />,
    tag: 'Affordable',
  },
  {
    key: 'rikshaw',
    name: 'Electric Rickshaw',
    icon: <FaBolt className="text-yellow-400 text-3xl drop-shadow-md" />,
    baseFare: 18,
    tag: 'Eco',
    condition: (distance) => distance <= 10,
  },
];

const BookSection = () => {
  const { state } = useLocation();
  const { origin, destination } = state || {};
  const [distanceKm, setDistanceKm] = useState(0);

  // Function to calculate if the ride crosses state borders (simplified)
  const isCrossingStateBorders = () => {
    if (origin && destination) {
      // Placeholder for actual state crossing logic
      return origin.state !== destination.state;
    }
    return false;
  };

  const renderOptions = () =>
    rideOptions
      .filter((option) => !option.condition || option.condition(distanceKm))
      .map((option) => {
        // Dynamically set base fare
        let baseFare = option.baseFare || 0;

        // Apply specific fare logic for Auto Rickshaw
        if (option.key === 'auto') {
          baseFare = distanceKm < 14 ? 20 : 14;
        }

        // Apply toll tax for car if crossing state borders
        if (option.key === 'car' && isCrossingStateBorders()) {
          baseFare += option.tollTax || 50; // Example toll tax value
        }

        const fare = parseFloat(distanceKm) * baseFare;

        return (
          <div
            key={option.key}
            className="w-full max-w-xs p-4 bg-white rounded-2xl shadow-lg border border-gray-200 m-2"
          >
            <div className="flex justify-between mb-2">
              <div className="flex items-center gap-2">
                {option.icon}
                <h2 className="font-semibold text-lg text-gray-800">{option.name}</h2>
              </div>
              <span className="text-xs text-green-600">1 min away</span>
            </div>

            <div className="text-sm text-gray-400 mb-2">
              Drop: {new Date(Date.now() + distanceKm * 2 * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>

            <div className="flex justify-between text-gray-600 text-sm">
              <span>Distance:</span>
              <span className="font-medium text-black">{Number(distanceKm).toFixed(2)} km</span>
            </div>

            <div className="flex justify-between text-gray-600 text-sm mb-2">
              <span>Estimated Fare:</span>
              <span className="font-bold text-lg text-black">₹{fare.toFixed(0)}</span>
            </div>

            <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-xl transition-all font-semibold mt-3">
              Book {option.name}
            </button>
          </div>
        );
      });

  return (
    <div className="p-4 mt-20 flex flex-col items-center">
      {origin && destination && (
        <>
          <FreeMap origin={origin} destination={destination} onDistance={setDistanceKm} />

          <div className="mt-8 w-full flex flex-wrap justify-center items-stretch">
            {renderOptions()}
          </div>
        </>
      )}
    </div>
  );
};

export default BookSection;
