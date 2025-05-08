import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet/dist/leaflet.css';

const FreeMap = ({ origin, destination, onDistance }) => {
  useEffect(() => {
    const map = L.map('map').setView(origin, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data © OpenStreetMap contributors',
    }).addTo(map);

    const routingControl = L.Routing.control({
      waypoints: [L.latLng(...origin), L.latLng(...destination)],
      routeWhileDragging: false,
    })
      .on('routesfound', function (e) {
        const route = e.routes[0];
        const distanceKm = route.summary.totalDistance / 1000;
        onDistance(distanceKm.toFixed(2));
      })
      .addTo(map);

    return () => map.remove();
  }, [origin, destination, onDistance]);

  return <div id="map" style={{ height: '400px', width: '100%' }} />;
};

export default FreeMap;
