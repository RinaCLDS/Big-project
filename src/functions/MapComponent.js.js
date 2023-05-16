import React from 'react';

const getColorOpacity = (value) => {
  let opacity = 1;

  switch (true) {
    case value < 100:
      opacity = 0.2;
      break;
    case value < 1000:
      opacity = 0.4;
      break;
    case value < 10000:
      opacity = 0.6;
      break;
    case value < 100000:
      opacity = 0.8;
      break;
    default:
      opacity = 1;
      break;
  }

  return opacity;
};

const MapComponent = () => {
  const casesData = [
    { country: 'China', cases: 100000 },
    { country: 'America', cases: 20 },
    { country: 'Philippines', cases: 1000 },
    { country: 'Brazil', cases: 300 },
    { country: 'Korea', cases: 5000 },
    // Add more cases data for other countries
  ];

  return (
    <div>
      {casesData.map((data) => (
        <div
          key={data.country}
          style={{
            backgroundColor: 'red',
            opacity: getColorOpacity(data.cases),
            width: '100px',
            height: '100px',
            margin: '10px',
          }}
        >
          {data.country}
        </div>
      ))}
    </div>
  );
};

export default MapComponent;
