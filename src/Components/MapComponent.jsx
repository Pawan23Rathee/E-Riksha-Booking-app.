import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import { FaLocationArrow } from 'react-icons/fa';

const MapComponent = () => {
  const [position, setPosition] = useState(null); // Store current position
  const [userLocation, setUserLocation] = useState(null); // Store live location
  const [searchQuery, setSearchQuery] = useState(''); // Store search query
  const [searchedLocation, setSearchedLocation] = useState(null); // Store coordinates of searched location

  useEffect(() => {
    // Get user's current position on initial load
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPosition([latitude, longitude]); // Set initial position
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
    const map = useMap(); // Get the map instance

    // Update the map view to the new location
    useEffect(() => {
      if (position) {
        map.setView(position, 13); // Set the map center to the new position
      }
    }, [position, map]);

    return null;
  };

  // Handle live location button click
  const handleLiveLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
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

  // Handle search input change and geocoding API request
  const handleSearch = async () => {
    if (searchQuery.trim() !== '') {
      try {
        const response = await axios.get('https://nominatim.openstreetmap.org/search', {
          params: {
            q: searchQuery,
            format: 'json',
            addressdetails: 1,
            limit: 1,
            countrycodes: 'IN', // Limit to India
          },
        });
        const location = response.data[0];
        if (location) {
          const newPosition = [parseFloat(location.lat), parseFloat(location.lon)];
          setSearchedLocation(newPosition); // Set new location from search
          setPosition(newPosition); // Update map center to searched location
        } else {
          alert('Location not found');
        }
      } catch (error) {
        console.error('Error fetching location:', error);
        alert('Error fetching location');
      }
    }
  };

  if (!position) {
    return <div>Loading map...</div>; // Loading state until position is fetched
  }

  return (
    <div className="relative">
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: '500px', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Update the map view if live location or searched location is set */}
        <MapUpdater position={userLocation || searchedLocation || position} />

        {/* Marker for user's live location */}
        {userLocation && (
          <Marker position={userLocation}>
            <Popup>Your live location</Popup>
          </Marker>
        )}

        {/* Marker for searched location */}
        {searchedLocation && (
          <Marker position={searchedLocation}>
            <Popup>Search result location</Popup>
          </Marker>
        )}

        {/* Marker for initial position */}
        <Marker position={position}>
          <Popup>Your initial location</Popup>
        </Marker>

        {/* Live Location Button inside Map */}
        <button
          onClick={handleLiveLocationClick}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            padding: '10px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '50%',
            cursor: 'pointer',
            fontSize: '16px',
            zIndex: 1000,
          }}
        >
          <FaLocationArrow />
        </button>

        {/* Search Bar inside Map */}
        <div className="absolute top-0 left-0 m-4 flex justify-between w-full">
          <input
            type="text"
            placeholder="Search for a location in India..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-3 w-1/2 rounded-md shadow-md border-2 border-gray-300 focus:outline-none"
          />
          <button
            onClick={handleSearch}
            className="p-3 ml-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-all duration-300"
          >
            Search
          </button>
        </div>

      </MapContainer>
    </div>
  );
};

export default MapComponent;
