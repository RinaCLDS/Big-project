import React from "react";
import mapData from "./../data/countries.json";
import "./../App.css";
import GurjarInfo from "../components/GurjarInfo";
import TableData from "../components/TableData";
import Map from "../components/Map";
import TopNavigationBar from "../components/TopNavigationBar";

function Dashboard() {
  return (
    <div className="main">
      <TopNavigationBar />

      {/* Content */}
      <div className="container mx-auto max-w-5xl">
        {/* MAP */}
        <Map mapData={mapData} />

        {/* User */}
        <GurjarInfo />

        {/* Map Details */}
        <TableData />
      </div>
    </div>
  );
}

export default Dashboard;
