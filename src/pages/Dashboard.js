import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function Dashboard() {
  const mapContainerRef = useRef(null); // Create a ref for the map container
  const mapRef = useRef(null); // Create a ref for the map instance

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    };

    const showPosition = (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log(`${latitude}, ${longitude}`);

      if (mapRef.current) {
        // Map already exists, move the view
        mapRef.current.setView([latitude, longitude], 13);
      } else {
        // Create the map
        const map = L.map(mapContainerRef.current).setView(
          [latitude, longitude],
          13
        );

        // Add the tile layer to the map
        L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
          maxZoom: 19,
          attribution:
            '&copy; <a href="https://carto.com/">OpenStreetMap</a>',
        }).addTo(map);

        // Update the refs
        mapRef.current = map;
      }
    };

    getLocation();

    return () => {
      if (mapRef.current) {
        // Clean up resources if necessary
        mapRef.current.remove();
      }
    };
  }, []);

  return (
    <div>
      <header>Header</header>
      <div style={{ margin: "10px" }}>
        <div
          ref={mapContainerRef} // Set the ref to the map container
          id="map"
          style={{ width: "100%", height: "80vh" }}
        ></div>
      </div>
    </div>
  );
}

export default Dashboard;
