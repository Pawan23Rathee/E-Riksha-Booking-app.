import React from 'react';
import CarBooking from './CarBooking';
import Card from './Card';
import ReviewPage from './ReviewPage';

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
      <CarBooking />
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
      <ReviewPage/>
    </>
  );
};

export default MapComponent;
