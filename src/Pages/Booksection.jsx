<<<<<<< HEAD
import React from 'react';
import { FaCar, FaMotorcycle, FaTaxi, FaShuttleVan } from 'react-icons/fa';

const Booksection = () => {
  const items = [
    { title: 'Car', icon: <FaCar size={40} color="green" />, button: 'Book' },
    { title: 'Bike', icon: <FaMotorcycle size={40} color="green" />, button: 'Book' },
    { title: 'Auto', icon: <FaTaxi size={40} color="green" />, button: 'Book' },
    { title: 'Riksha', icon: <FaShuttleVan size={40} color="green" />, button: 'Book' },
  ];

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', fontSize: '32px', marginTop: '80px', fontWeight: 'bold', color: 'green' }}>
        Book Your Ride Now
      </h1>
      <p style={{ textAlign: 'center', fontSize: '25px', color: 'green' }}>Safar ka naya andaaz</p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginTop: '40px', flexWrap: 'wrap' }}>
        {items.map((item, index) => (
          <div
            key={index}
            style={{
              border: '1px solid green',
              padding: '20px',
              borderRadius: '12px',
              width: '220px',
              textAlign: 'center',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
            }}
          >
            <div style={{ marginBottom: '15px' }}>{item.icon}</div>
            <h2 style={{ fontSize: '20px', color: '#333' }}>{item.title}</h2>
            <button
              style={{
                backgroundColor: 'green',
                color: '#fff',
                border: 'none',
                padding: '10px 15px',
                borderRadius: '5px',
                cursor: 'pointer',
                width: '70px',
                height: '40px',
                marginTop: '15px',
              }}
            >
              {item.button}
=======
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
>>>>>>> 82bfad07b8c75639eabe6b16b52ed9ac18810673
            </button>
          </div>
        );
      });

<<<<<<< HEAD
      <footer style={{ textAlign: 'center', marginTop: '120px', color: '#777' }}></footer>
=======
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
>>>>>>> 82bfad07b8c75639eabe6b16b52ed9ac18810673
    </div>
  );
};

export default BookSection;
