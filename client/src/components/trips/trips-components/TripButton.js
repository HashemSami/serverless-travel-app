import React from 'react';

const TripButton = ({ title, color, onClick }) => {
  return (
    <button
      id="update-button"
      onClick={onClick}
      style={{ color: color }}
      type="button"
    >
      {title}
    </button>
  );
};

export default TripButton;
