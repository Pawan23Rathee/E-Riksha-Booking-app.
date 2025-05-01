import React, { useEffect } from 'react';
import MapComponent from '../Components/MapComponent'; // Adjust path if needed
import LocationSearch from '../Components/LocationSearch'; // Add this import too

const MapPage = () => {
  useEffect(() => {
    console.log("MapPage loaded");
  }, []);

  return (
    <div className="px-4 py-6">
      <h2 className="text-xl font-bold mb-4 text-center">Select Your Delivery Location</h2>
      
      {/* Search Bar Component */}
      <LocationSearch />

      {/* Map Component */}
      <div className="mt-6">
        <MapComponent />
      </div>
    </div>
  );
};

export default MapPage;
