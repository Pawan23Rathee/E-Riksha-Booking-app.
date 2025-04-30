import { useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";

const LiveLocationButton = ({ userCoords }) => {
  const map = useMap();

  useEffect(() => {
    const button = L.control({ position: 'topright' });

    button.onAdd = function () {
      const div = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
      div.style.backgroundColor = 'white';
      div.style.padding = '5px 10px';
      div.style.cursor = 'pointer';
      div.style.fontSize = '20px';
      div.title = "Go to your location";
      div.innerHTML = '📍';

      div.onclick = function () {
        if (userCoords) {
          map.setView(userCoords, 15); // Just re-center
        } else {
          alert("Live location not available.");
        }
      };

      return div;
    };

    button.addTo(map);
  }, [map, userCoords]);

  return null;
};

export default LiveLocationButton;
