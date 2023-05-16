import React, { useEffect, useState } from 'react';
import jsonData from '../data/countries.json';
import sampleDatabase from '../data/SampleDatabase';

const MyComponent = () => {
  const [mergedData, setMergedData] = useState([]);
  
   // Fetch or using axios
   const fetchPopulationData = async () => {
    try {
      // Use axios or fetch the database here...
      // Code here...


      
      // Merging the data in database with the json
      const mergedData = jsonData.features.map((feature) => {
        const population = sampleDatabase.find(
          (data) => data.ADMIN === feature.properties.ADMIN
        );

        return {
          ...feature,
          properties: {
            ...feature.properties,
            population: population ? population.population : 0,
          },
        };
      });

      setMergedData(mergedData);
    } catch (error) {
      console.error('Error fetching population data:', error);
    }
  };

  useEffect(() => {
    fetchPopulationData();
  }, []);

  return (
    <div>
      {mergedData.map((feature, index) => (
        <div key={index}>
          <p>Country: {feature.properties.ADMIN}</p>
          <p>Population: {feature.properties.population}</p>
        </div>
      ))}
    </div>
  );
};

export default MyComponent;
