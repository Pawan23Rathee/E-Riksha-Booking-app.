// src/components/InfoSection.js
import React from 'react';
import InfoCard from './InfoCard';

const infoItems = [
  {
    imgSrc: 'https://cdn-icons-png.flaticon.com/512/854/854878.png',
    title: 'Fast Booking',
    description: 'Book your ride instantly with real-time tracking and no delays.',
  },
  {
    imgSrc: 'https://cdn-icons-png.flaticon.com/512/1077/1077012.png',
    title: 'Secure Payments',
    description: 'Pay safely and conveniently using a variety of payment methods.',
  },
  {
    imgSrc: 'https://cdn-icons-png.flaticon.com/512/2645/2645897.png',
    title: '24/7 Support',
    description: 'We’re here for you any time of the day, whenever you need us.',
  },
];

const InfoSection = () => {
  return (
    <div className="flex flex-wrap justify-center gap-6 my-10">
      {infoItems.map((item, index) => (
        <InfoCard
          key={index}
          imgSrc={item.imgSrc}
          title={item.title}
          description={item.description}
        />
      ))}
    </div>
  );
};

export default InfoSection;
