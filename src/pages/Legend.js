import React from 'react';

const Legend = ({ populationData, opacity }) => {
  return (
    <div className="legend">
      {opacity.map((opacity, index) => (
        <div key={index}>
          <span className="legend-color" style={{ backgroundColor: 'orange', opacity: opacity }}></span>
          <span className="legend-label">
            {populationData[index]}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Legend;
