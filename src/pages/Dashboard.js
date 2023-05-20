// import { useNavigate } from "react-router-dom";
// import Cookies from "universal-cookie";
// import React, { useEffect, useState } from "react";
// import mapData from "./../data/countries.json";
// import sampleDatabase from "../data/SampleDatabase";
// import "./../App.css";
// import GurjarInfo from "../components/GurjarInfo";
// import TableData from "../components/TableData";
// import Map from "../components/Map";
// import TopNavigationBar from "../components/TopNavigationBar";
// import Loading from "./Loading";

// const Dashboard = () => {
//     const navigate = useNavigate();
//     const new_cookies = new Cookies();
//     const token = new_cookies.get('token');
//     const logout = ()=>{
//     new_cookies.remove('token', {path: '/'});
//     navigate('/');}
//     const profile = ()=>navigate('/profile');
//   return (
//     <div>
//       {/* Logout button */}
//         <button style={{'color':'black'}} onClick={logout}>Logout</button>
//         <button style={{'color':'black'}} onClick={profile}>Profile</button>
//     </div>
//   )
// }

// export default Dashboard

import React, { useEffect, useState } from "react";
import mapData from "./../data/countries.json";
import sampleDatabase from "../data/SampleDatabase";
import "./../App.css";
import GurjarInfo from "../components/GurjarInfo";
import TableData from "../components/TableData";
import Map from "../components/Map";
import TopNavigationBar from "../components/TopNavigationBar";
import Loading from "./Loading";
import Welcome from "../components/Welcome";

function Dashboard() {
  const [mergedData, setMergedData] = useState([
    { type: "FeatureCollection", features: [] },
  ]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPopulationData = async () => {
    try {
      // Fetch or use axios to get the database here...
      // Code here...

      // Merging the data in the database with the JSON
      const mergedData = mapData.features.map((feature) => {
        const population = sampleDatabase.find(
          (data) => data.ADMIN === feature.properties.ADMIN
        );
        const users = population ? population.users : [];

        return {
          ...feature,
          properties: {
            ...feature.properties,
            population: population ? population.population : 0,
            users: users,
          },
        };
      });

      const updatedMergedData = {
        type: mapData.type,
        features: mergedData,
      };
      setMergedData(updatedMergedData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching population data:", error);
    }
  };
  useEffect(() => {
    fetchPopulationData();
  }, []);

  if (isLoading) {
    return <Loading />; // Display a loading state while data is being fetched
  }
  return (
    <div className="main">
      <TopNavigationBar />

      {/* Content */}
      <div className="container mx-auto max-w-5xl">
        <Welcome />
        
        {/* MAP */}
        <Map
          // mapData={mapData}
          mergedData={mergedData}
        />

        {/* User */}
        <GurjarInfo />

        {/* Map Details */}
        <TableData />

        <div className="h-[100px]"></div>
      </div>
    </div>
  );
}

export default Dashboard;
