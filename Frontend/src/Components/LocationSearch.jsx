import React, { useState } from "react";
import axios from "axios";
import { MapPin } from "lucide-react"; // Optional: Add icon for location

const LocationSearch = () => {
  const [query, setQuery] = useState("");  // Store user's search input
  const [results, setResults] = useState([]);  // Store search results (locations)

  // Handle the search input change
  const handleInputChange = async (e) => {
    const value = e.target.value;
    setQuery(value);  // Update the search query

    // Trigger search only if query length is greater than 2 characters
    if (value.length > 2) {
      try {
        // Call the Nominatim API to search for locations
        const res = await axios.get("https://nominatim.openstreetmap.org/search", {
          params: {
            q: value,  // The query entered by the user
            format: "json",  // Response format
            addressdetails: 1,  // Include detailed address info
            limit: 5,  // Limit results to 5 suggestions
            countrycodes: "IN",  // Restrict results to India
          },
          headers: {
            "Accept-Language": "en",
            "User-Agent": "LocationSearchApp (your@email.com)",  // Add your email here
          },
        });

        setResults(res.data);  // Set the search results
      } catch (err) {
        console.error("Error fetching location:", err);
        setResults([]);  // Clear results if there is an error
      }
    } else {
      setResults([]);  // Clear results if query is too short
    }
  };

  // Handle the selection of a location from the suggestions
  const handleSelect = (place) => {
    setQuery(place.display_name);  // Set the input field with selected location
    setResults([]);  // Clear the results dropdown
    alert(`Selected location: ${place.display_name}`);  // Show a success message
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-4">
      <div className="relative">
        {/* Search Input Field */}
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for a location in India..."
          className="w-full px-4 py-3 pl-12 pr-4 bg-white border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ease-in-out"
        />
        
        {/* Location Icon */}
        <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-500 w-6 h-6" />
      </div>

      {/* Display Search Results */}
      {results.length > 0 && (
        <ul className="mt-4 max-h-60 overflow-y-auto bg-white shadow-xl rounded-lg border border-gray-300">
          {results.map((place) => (
            <li
              key={place.place_id}  // Unique identifier for each suggestion
              onClick={() => handleSelect(place)}  // Select the location
              className="p-3 cursor-pointer hover:bg-gray-100 transition-all ease-in-out"
            >
              <div className="text-sm font-semibold">{place.display_name}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationSearch;
