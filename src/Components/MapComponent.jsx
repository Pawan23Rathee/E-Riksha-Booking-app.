import React from 'react';
import CarBooking from './CarBooking';
import Card from './Card';

const MapComponent = () => {
  const cards = [
    {
      image: "/Premium.jpeg",
      title: "Premium Service Cab",
      description: "Travel in style and comfort with our Premium Service Cab. Enjoy spacious interiors, top-tier amenities, and a smooth ride with a professional driver. Perfect for those who demand luxury and quality.",
      tags: [ 'travel', 'winter']
    },
    {
      image: "/Standard.jpeg",
      title: "Standard Cab Service",
      description: "Affordable and reliable, our Standard Cab service ensures a comfortable ride to your destination. Enjoy a smooth journey with experienced drivers at a great price.",
      tags: [ 'Travel', 'peaceful']
    },
    {
      image: "/Cab.jpeg",
      title: "Cab",
      description: "Experience quick and budget-friendly travel with our efficient service. Get to your destination in no time, without breaking the bank, and enjoy a comfortable ride along the way!.",
      tags: ['affordable', 'comfortable', 'Fast']
    }
  ];

  return (
    <>
      <CarBooking />
      <div className="p-4 flex gap-4 flex-wrap justify-center">
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
    </>
  );
};

export default MapComponent;
