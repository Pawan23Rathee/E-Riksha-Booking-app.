import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import FreeMap from '../Components/FreeMap';
import { FaCarSide, FaMotorcycle, FaBolt, FaShuttleVan, FaInfoCircle } from 'react-icons/fa';

const rideOptions = [
  {
    key: 'car',
    name: 'Cab',
    icon: <FaCarSide className="text-blue-500 text-3xl drop-shadow-md" />,
    baseFare: 15,
    tag: 'Standard',
    tollTax: 100,
  },
  {
    key: 'bike',
    name: 'Bike',
    icon: <FaMotorcycle className="text-green-500 text-3xl drop-shadow-md" />,
    baseFare: 13,
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
  const [selectedInfo, setSelectedInfo] = useState(null);
  const infoRef = useRef(null);

  const isCrossingStateBorders = () => {
    if (origin && destination) {
      return origin.state !== destination.state;
    }
    return false;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (infoRef.current && !infoRef.current.contains(event.target)) {
        setSelectedInfo(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const renderOptions = () =>
    rideOptions
      .filter((option) => !option.condition || option.condition(distanceKm))
      .map((option) => {
        let baseFare = option.baseFare || 0;
        let surchargeNote = '';

        if (option.key === 'auto') {
          baseFare = distanceKm < 14 ? 20 : 14;
          surchargeNote = distanceKm < 14 ? 'Short distance surcharge applied' : '';
        }

        if (option.key === 'car') {
          baseFare = distanceKm < 10 ? 22 : 15;
          if (isCrossingStateBorders()) {
            baseFare += option.tollTax || 50;
          }
        }

        const fare = parseFloat(distanceKm) * baseFare;

        return (
          <div
            key={option.key}
            className="w-full max-w-xs p-4 bg-white rounded-2xl shadow-lg border border-gray-200 m-2 relative"
          >
            <div className="flex justify-between mb-2">
              <div className="flex items-center gap-2">
                {option.icon}
                <h2 className="font-semibold text-lg text-gray-800">{option.name}</h2>
              </div>
              <span className="text-xs text-green-600">8 min away</span>
            </div>

            <div className="text-sm text-gray-400 mb-2">
              Drop: {new Date(Date.now() + distanceKm * 2 * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>

            <div className="flex justify-between text-gray-600 text-sm">
              <span>Distance:</span>
              <span className="font-medium text-black">{Number(distanceKm).toFixed(2)} km</span>
            </div>

            <div className="flex justify-between items-center text-gray-600 text-sm mb-2 relative">
              <span>Estimated Fare:</span>
              <div className="flex items-center gap-1">
                <span className="font-bold text-lg text-black">₹{fare.toFixed(0)}</span>
                <button onClick={() => setSelectedInfo(selectedInfo === option.key ? null : option.key)}>
                  <FaInfoCircle className="text-gray-500 hover:text-gray-700 cursor-pointer" />
                </button>
              </div>

              {selectedInfo === option.key && (
                <div
                  ref={infoRef}
                  className="absolute z-10 left-6 bottom-full mb-2 bg-white text-gray-700 border border-gray-300 p-3 rounded-md text-xs shadow-lg w-[220px]"
                >
                  <div className="font-semibold text-sm text-black mb-1">Fare Breakdown</div>
                  <div>Total Fare: ₹{fare.toFixed(0)}</div>
                  {surchargeNote && <div>{surchargeNote}</div>}
                  {option.key === 'car' && isCrossingStateBorders() && (
                    <div>Toll Tax Applied: ₹{option.tollTax}</div>
                  )}
                </div>
              )}
            </div>

            <button className="w-full bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded-xl transition-all font-semibold mt-3">
              Book {option.name}
            </button>
          </div>
        );
      });

  return (
    <div className="p-4 mt-20 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-green-700 mb-2">Book Your Ride Now</h1>
      <p className="text-xl text-green-600 mb-6">Safar ka naya andaaz</p>

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
