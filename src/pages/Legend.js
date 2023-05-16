import React from 'react';

const Legend = ({ populationData, colors }) => {
  return (
    <div className="legend">
      {colors.map((color, index) => (
        <div key={index}>
          <span className="legend-color" style={{ backgroundColor: color }}></span>
          <span className="legend-label">
            {populationData[index]} - {populationData[index + 1]}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Legend;
