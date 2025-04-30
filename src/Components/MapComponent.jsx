import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { FaLocationArrow } from 'react-icons/fa';

const MapComponent = () => {
  const [position, setPosition] = useState(null); // Store current position
  const [userLocation, setUserLocation] = useState(null); // Store the user’s live location
  const [isLocationEnabled, setIsLocationEnabled] = useState(false); // To track if live location is enabled

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

  // Update the live location on button click
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

  if (!position) {
    return <div>Loading map...</div>; // Loading state until position is fetched
  }

  return (
    <div>
      

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

        {/* Update the map view if live location is set */}
        <MapUpdater position={userLocation || position} />

        {/* Marker for user's live location */}
        {userLocation && (
          <Marker position={userLocation}>
            <Popup>Your live location</Popup>
          </Marker>
        )}
        <button
  onClick={handleLiveLocationClick}
  style={{
    position: 'absolute',     // Makes the button absolutely positioned within the parent container (the map)
    top: '10px',              // Places the button 10px from the top of the map
    right: '10px',            // Places the button 10px from the right of the map
    padding: '10px',
    backgroundColor: '#007bff', // Button color
    color: '#fff',            // Text color
    border: 'none',           // Removes the border around the button
    borderRadius: '50%',      // Makes the button round (circular)
    cursor: 'pointer',       // Changes the cursor to a pointer on hover
    fontSize: '16px',
    zIndex: 1000,             // Ensures the button stays on top of the map layers
  }}
>
<FaLocationArrow />
</button>

       
      
        {/* Marker for initial position */}
        <Marker position={position}>
          <Popup>Your initial location</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
