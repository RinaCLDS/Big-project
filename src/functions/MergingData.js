import React, { useEffect, useState } from 'react';
import jsonData from '../data/countries.json';
import sampleDatabase from '../data/SampleDatabase';

const MyComponent = () => {
  const [mergedData, setMergedData] = useState([]);

  const getColorOpacity = (value) => {
    let opacity = 1;
  
    if (value === 0) {
      opacity = 0;
    } else if (value >= 1 && value <= 100) {
      opacity = 0.2;
    } else if (value >= 101 && value <= 1000) {
      opacity = 0.4;
    } else if (value >= 1001 && value <= 2000) {
      opacity = 0.6;
    } else {
      opacity = 1;
    }    
  
    return opacity;
  };

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
      console.log(mergedData);
    } catch (error) {
      console.error('Error fetching population data:', error);
    }
  };

  useEffect(() => {
    fetchPopulationData();
  }, []);

  return mergedData;
    
};

export default MyComponent;
