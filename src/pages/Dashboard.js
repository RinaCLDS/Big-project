import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"; //import react-leaflet packages

function Dashboard() {
  return (
    <div>
      <header>Header</header>
      <div
        className="mapMargin"
        style={{ margin: "0px", border: "1px solid #111" }}
      >

        {/* Map Container, where all map the customizing goes... */}
        <MapContainer
          center={[51.505, -0.09]}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: "80vh" }}
        >

            {/* Here as you can see, I put a different tile layer (Carto maps) to continue customizing panes*/}
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">Carto</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
          />

          {/* The Marker and the popup tells the place you started. (A follow up feature where you will start at your current location should be added ) */}
          <Marker position={[51.505, -0.09]}>
            <Popup>You are here!</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}

export default Dashboard;
