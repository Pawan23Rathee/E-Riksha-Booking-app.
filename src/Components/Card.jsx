import React from 'react';

const Card = ({ image, title, description, tags }) => {
  return (
    <div className="w-80 h-[460px] flex flex-col rounded overflow-hidden shadow-lg">
      <img
        className="w-full h-[180px] object-cover"
        src={image}
        alt={title}
      />
      <div className="px-6 py-4 flex-1">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base line-clamp-3">
          {description}
        </p>
      </div>
      <div className="px-6 pt-2 pb-4">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Card;
