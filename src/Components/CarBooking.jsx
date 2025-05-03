import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import { FaLocationArrow } from 'react-icons/fa';
import './Car.css'; // Make sure the CSS is correctly linked

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

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const { latitude, longitude } = coords;
          setPosition([latitude, longitude]);
        },
        (error) => {
          console.error(error);
          alert("Unable to fetch your location.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
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
        (error) => {
          console.error(error);
          alert("Unable to fetch your location.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
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
      } catch (error) {
        console.error('Error fetching location:', error);
        alert('Error fetching location');
      }
    }
  };

  if (!position) return <div>Loading map...</div>;

  return (
    <div className="car-booking-container">
      {/* Map wrapper */}
      <div className="map-wrapper">
        <button className="live-location-btn" onClick={handleLiveLocationClick}>
          <FaLocationArrow />
        </button>

        {/* Map itself */}
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

      {/* Car booking form */}
      <div className="form-container">
        

        <div className="input-group">
          <label htmlFor="lcation">Drop Location</label>
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

        <button className="book-button">Book Ride</button>
      </div>
    </div>
    
  );
};

export default CarBooking;
