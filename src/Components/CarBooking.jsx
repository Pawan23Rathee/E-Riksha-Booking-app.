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
  const [position, setPosition] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedLocation, setSearchedLocation] = useState(null);
  const [error, setError] = useState(false);
  const navigate = useNavigate(); // ✅ added for navigation

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!position) setError(true);
    }, 10000);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const { latitude, longitude } = coords;
          setPosition([latitude, longitude]);
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

  const handleLiveLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const { latitude, longitude } = coords;
          setUserLocation([latitude, longitude]);
        },
        () => alert("Unable to fetch your location.")
      );
    }
  };

  const handleSearch = async () => {
    if (searchQuery.trim() !== '') {
      try {
        const response = await axios.get('https://nominatim.openstreetmap.org/search', {
          params: {
            q: searchQuery,
            format: 'json',
            addressdetails: 1,
            limit: 1,
            countrycodes: 'IN',
          },
        });
        const location = response.data[0];
        if (location) {
          const newPosition = [parseFloat(location.lat), parseFloat(location.lon)];
          setSearchedLocation(newPosition);
          setPosition(newPosition);
        } else {
          alert('Location not found');
        }
      } catch {
        alert('Error fetching location');
      }
    }
  };

  const handleBookRide = () => {
    navigate('/confirmation'); // ✅ navigate to the confirmation page
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

  if (!position) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-green-700 font-medium">Loading map...</p>
      </div>
    );
  }

  return (
    <div className="car-booking-container">
      <div className="map-wrapper">
        <button className="live-location-btn" onClick={handleLiveLocationClick}>
          <FaLocationArrow />
        </button>

        <MapContainer
          key={position.join(',')}
          center={position}
          zoom={13}
          style={{ height: '400px', width: '100%' }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapUpdater position={userLocation || searchedLocation || position} />

          {userLocation && (
            <Marker position={userLocation}>
              <Popup>Your live location</Popup>
            </Marker>
          )}
          {searchedLocation && (
            <Marker position={searchedLocation}>
              <Popup>Search result location</Popup>
            </Marker>
          )}
          <Marker position={position}>
            <Popup>Your initial location</Popup>
          </Marker>
        </MapContainer>
      </div>

      <div className="form-container">
        <div className="input-group">
          <label htmlFor="location">Drop Location</label>
          <div className="search-bar-container">
            <input
              type="text"
              id="location"
              className="location-input"
              placeholder="Enter drop location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoComplete="off"
            />
            <button className="search-button" onClick={handleSearch}>Search</button>
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="timeSelect">Select Time</label>
          <select id="timeSelect">
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

        <button className="book-button" onClick={handleBookRide}>Book Ride</button>
      </div>
    </div>
  );
};

export default CarBooking;
