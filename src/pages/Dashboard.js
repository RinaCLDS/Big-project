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
import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { domain } from "../data/constant";
function Dashboard() {
  const [gurjarDatas, setGurjarDatas] = useState([]);
  
  const [sortedCounts, setSortedCounts] = useState([['philippines', 0]]);
  const getSortedCounts = () => {
    axios
    .get(domain+"/gurjar/population_search/")
    .then((response) => {
      setSortedCounts(Object.entries(response.data.nationalities_count).sort(
        ([_, countA], [__, countB]) => countB - countA
      ))
    })
    .catch((error) => console.log(error));
  }

  const [data, setData] = useState({"valid":true,"user":{"name":"Gabryel Ardy Echavez","profile_pic":"/media_cdn/profile_images/11/profile_image_Plht2xV.png","nationality":"philippines","state":"rizal","city":"antipolo","village":"dela paz","gotra":"A","blood_group":"A","date_of_birth":"2000","email":"myfluffycy@gmail.com","password":"sample","mobile_number":"09666972501","religion":"catholic"}});
  const navigate = useNavigate();
  const check = async () => {
    const new_cookies = new Cookies();
    const token = new_cookies.get("token");

    await axios
       .post(domain+"/gurjar/get_user/", {
         token: token,
       })
       .then((response) => {
         if (!response.data.valid) {
           new_cookies.remove("token", { path: "/" });
         } else {
            localStorage.setItem("data", JSON.stringify(response.data));
            setData(response.data);
           navigate("/dashboard");
         }
       })
       .catch((error) => console.log(error));
  }
  const [mergedData, setMergedData] = useState([
    { type: "FeatureCollection", features: [] },
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchPopulationData = async () => {
    try {
      // Fetch or use axios to get the database here...
      // Code here...

      // Merging the data in the database with the JSON







      // Dito Yung gurjarDatas
      // pag nag ctrl+s ka tsaka lang mag rerender yung mga pic
      const mergedData = mapData.features.map((feature) => {
        const population = gurjarDatas.find(
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
    // End Dito
  };
  
  useEffect(() => {
    
    axios
    .get(domain+"/gurjar/get_all_user/")
    .then((response) => {
      console.log(response.data.data)
      setGurjarDatas(response.data.data)
      
    })
    .catch((error) => console.log(error));
    check()
    getSortedCounts()
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
        <Welcome data={data} />
        
        {/* MAP */}
        <Map
          // mapData={mapData}
          mergedData={mergedData}
        />

        {/* User */}
        <GurjarInfo  data={data} />

        {/* Map Details */}
        <TableData />

        <div className="h-[100px]"></div>
      </div>
    </div>
  );
}

export default Dashboard;
