import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink from React Router
import CarBooking from './CarBooking';
import Card from './Card';
import ReviewPage from './ReviewPage';
import InfoCard from './InfoCard';
import InfoSection from './InfoSection';
import './MapComponent.css'; // Import CSS file for styling

const MapComponent = () => {
  const cards = [
    {
      image: "/Premium.jpeg",
      title: "Premium Service Cab",
      description: "Travel in style and comfort with our Premium Service Cab. Spacious interiors, top-tier amenities, and a smooth ride.",
      tags: ['travel', 'luxury'],
    },
    {
      image: "/Standard.jpeg",
      title: "Standard Cab Service",
      description: "Affordable and reliable. A smooth journey with experienced drivers at a great price.",
      tags: ['travel', 'affordable'],
    },
    {
      image: "/Cab.jpeg",
      title: "Fast & Budget Travel",
      description: "The fastest and most affordable way to reach your destination safely and quickly.",
      tags: ['fast', 'budget'],
    },
  ];

  return (
    <>
      {/* Cards Section */}
       {/* CarBooking Section */}
      {/* You can add this or remove it based on your routing setup */}
      <div className="car-booking-container mt-10">
        <CarBooking />
      </div>
      <div className="p-4 flex flex-wrap gap-20 justify-center">
        {cards.map((card, index) => (
          <Card
            key={index}
            image={card.image}
            title={card.title}
            description={card.description}
            tags={card.tags}
          />
        ))}
      </div>

      {/* Review Section */}
      <ReviewPage />
      
      {/* Info Section */}
      <InfoSection />
      
      {/* Slogan */}
      <h1 className="heading text-center">Ride Safe, Ride Right</h1>

      {/* Book Now Button as NavLink */}
      <div className="text-center mt-4">
      <NavLink
  to="/car-booking" // Navigates to the CarBooking page
  className="w-full bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition"
>
  Book Now
</NavLink>

      </div>

     
    </>
  );
};

export default MapComponent;
