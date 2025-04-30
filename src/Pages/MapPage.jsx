import React, { useEffect } from 'react';
import MapComponent from '../Components/MapComponent'; // Adjust the path if needed

const MapPage = () => {
  useEffect(() => {
    console.log("MapPage loaded");
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-center">Select Your Delivery Location</h2>
      <MapComponent />
    </div>
  );
};

export default MapPage;
