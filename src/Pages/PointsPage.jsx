import React from 'react';

const PointsPage = ({ points }) => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Your Points</h1>
      <p>Current Points: {points}</p>
      <p>Earn more points by booking!</p>
    </div>
  );
};

export default PointsPage;
