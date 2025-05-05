// src/components/InfoCard.js
import React from 'react';
import PropTypes from 'prop-types';

const InfoCard = ({ imgSrc, title, description }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md text-center max-w-xs w-full">
      <img
        src={imgSrc}
        alt={title}
        className="w-16 h-16 mx-auto mb-3"
        loading="lazy"
      />
      <h3 className="text-lg font-bold text-green-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

InfoCard.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default InfoCard;
