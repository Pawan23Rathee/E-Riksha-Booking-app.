import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import { FaLocationArrow } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Car.css';

// Fix missing marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const CarBooking = () => {
  const [pickupLocation, setPickupLocation] = useState(null);
  const [dropLocation, setDropLocation] = useState(null);
  const [pickupQuery, setPickupQuery] = useState('Current Location');
  const [dropQuery, setDropQuery] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!pickupLocation) setError(true);
    }, 10000);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const { latitude, longitude } = coords;
          const current = [latitude, longitude];
          setPickupLocation(current);
          clearTimeout(timer);
        },
        () => {
          setError(true);
          clearTimeout(timer);
        }
      );
    } else {
      setError(true);
    }
  }, []);

  const MapUpdater = ({ position }) => {
    const map = useMap();
    useEffect(() => {
      if (position) map.setView(position, 13);
    }, [position, map]);
    return null;
  };

  const handleLocationSearch = async (query, setLocation) => {
    if (query.trim().toLowerCase() === 'current location') return pickupLocation;
    if (query.trim() !== '') {
      try {
        const response = await axios.get('https://nominatim.openstreetmap.org/search', {
          params: {
            q: query,
            format: 'json',
            addressdetails: 1,
            limit: 1,
            countrycodes: 'IN',
          },
        });
        const location = response.data[0];
        if (location) {
          const coords = [parseFloat(location.lat), parseFloat(location.lon)];
          setLocation(coords);
          return coords;
        } else {
          alert('Location not found');
          return null;
        }
      } catch {
        alert('Error fetching location');
        return null;
      }
    }
    return null;
  };

  const handleProceed = async () => {
    const pickupCoords = await handleLocationSearch(pickupQuery, setPickupLocation);
    const dropCoords = await handleLocationSearch(dropQuery, setDropLocation);
    if (!selectedTime) {
      alert('Please select a time');
      return;
    }
    if (pickupCoords && dropCoords) {
      navigate('/booksection', {
        state: {
          origin: pickupCoords,
          destination: dropCoords,
          time: selectedTime,
        },
      });
    }
  };

  const handleKeyPress = async (e) => {
    if (e.key === 'Enter') {
      handleProceed();
    }
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <p className="text-red-600 font-semibold text-lg mb-3">Failed to load map</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Retry Again
        </button>
      </div>
    );
  }

  if (!pickupLocation) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-green-700 font-medium">Loading map...</p>
      </div>
    );
  }

  return (
    <div className="car-booking-container">
      <div className="map-wrapper mb-4">
        <MapContainer
          key={pickupLocation.join(',')}
          center={pickupLocation}
          zoom={13}
          style={{ height: '400px', width: '100%' }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapUpdater position={dropLocation || pickupLocation} />

          {pickupLocation && (
            <Marker position={pickupLocation}>
              <Popup>Pickup Location</Popup>
            </Marker>
          )}

          {dropLocation && (
            <Marker position={dropLocation}>
              <Popup>Drop Location</Popup>
            </Marker>
          )}
        </MapContainer>
      </div>

      <div className="form-container p-4 bg-white rounded shadow-md space-y-4">
        <div className="input-group">
          <label htmlFor="pickup" className="font-semibold mb-1 block">Pickup Location</label>
          <input
            type="text"
            id="pickup"
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Enter pickup location..."
            value={pickupQuery}
            onChange={(e) => setPickupQuery(e.target.value)}
            onKeyDown={handleKeyPress}
            autoComplete="off"
          />
        </div>

        <div className="input-group">
          <label htmlFor="drop" className="font-semibold mb-1 block">Drop Location</label>
          <input
            type="text"
            id="drop"
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Enter drop location..."
            value={dropQuery}
            onChange={(e) => setDropQuery(e.target.value)}
            onKeyDown={handleKeyPress}
            autoComplete="off"
          />
        </div>

        <div className="input-group">
          <label htmlFor="timeSelect" className="font-semibold mb-1 block">Select Time</label>
          <select
            id="timeSelect"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
          >
            <option value="">-- Select Time --</option>
            <option value="now">🚗 Now</option>
            <option value="12:00">12:00 PM</option>
            <option value="13:00">1:00 PM</option>
            <option value="14:00">2:00 PM</option>
            <option value="15:00">3:00 PM</option>
            <option value="16:00">4:00 PM</option>
            <option value="17:00">5:00 PM</option>
            <option value="18:00">6:00 PM</option>
          </select>
        </div>

        <button
          onClick={handleProceed}
          className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Book
        </button>
      </div>
    </div>
  );
};

export default CarBooking;
