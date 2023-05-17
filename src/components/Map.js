import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "./../App.css";
import Loading from "../pages/Loading";
import Legend from "../pages/Legend";

import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  GeoJSON,
  useMapEvents,
  useMap,
} from "react-leaflet"; //import react-leaflet packages
import { getColorOpacity } from "../functions/getColorOpacity";



function Map({ mergedData }) {
  // Legends
  const opacity = [0, 0.2, 0.4, 0.6, 1]; // Example colors
  const populationRanges = [0, 100, 1000, 2000, "2001+"]; // Example population ranges

  const maxBounds = L.latLngBounds(L.latLng(-90, -180), L.latLng(90, 180));

  const [countryData, setCountryData] = useState(["Philippines"]); //country data will go here
  const locationStyle = (feature) => {
    return {
      fillColor: "maroon",
      weight: 1,
      color: "#555",
      fillOpacity: getColorOpacity(feature.properties.population),
    };
  };

  const countryMouseOver = (event) => {
    event.target.setStyle({
      weight: 5,
      color: "#111",
    });
    event.target.openPopup();
  };

  const countryMouseOut = (event) => {
    event.target.setStyle({
      weight: 1,
      color: "#555",
    });
    event.target.closePopup();
  };

  const movePopup = (event) => {
    const popup = event.target.getPopup();
    if (popup && popup.isOpen()) {
      popup.setLatLng(event.latlng);
    } else {
      event.target.openPopup();
    }
  };

  const initialBounds = [0, -0]
  const mapRef = useRef();

  const featureClicked = (event) => {
    mapRef.current.fitBounds(event.target.getBounds());
  };


  const onEachCountry = (country, layer) => {
    const countryName = country.properties.ADMIN;
    const population = country.properties.population; //Population Data
    layer.bindPopup(`${countryName}: ${population}`, {
      closeButton: false,
      autoPan: false,
    });
    layer.on({
      mouseover: countryMouseOver,
      mouseout: countryMouseOut,
      mousemove: movePopup, // Call the movePopup function on mousemove event
      click: featureClicked,
    });
  };

  const handleFindLocation = () => {
    setIsEnabledLocation(true);
  };

  const handleLocationFound = () => {
    setIsEnabledLocation(false);
  };

  // const map = useMapEvents(
  //   console.log(map.locate())
  // )

  const [isLocationEnabled, setIsEnabledLocation] = useState(false);
  const FindCurrentLocation = ({ isEnabled, onLocationFound }) => {
    const [position, setPosition] = useState(null);
    const map = useMapEvents({
      click() {
        if (isEnabled) {
          map.locate();
        }
      },
      locationfound(e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom(), map.zoomIn(5));
        onLocationFound();
      },
    });
    useEffect(() => {
      if (isEnabled) {
        map.locate();
      }
    }, [isEnabled, map]);

    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    );
  };

  return (
    <div>
      <div className="my-2 shadow">
        {/* Map Container, where all map the customizing goes... */}
        <MapContainer
          center={initialBounds}
          ref={mapRef}
          zoom={2}
          // scrollWheelZoom={false}
          style={{ height: "70vh", zIndex: 0 }}
          maxBounds={maxBounds} // Set the maxBounds option
          maxBoundsViscosity={1.0} // Adjust the viscosity as needed
        >
          <div>
            {countryData.length === 0 ? (
              <Loading />
            ) : (
              <div>

                <TileLayer
                  attribution='&copy; <a href="https://carto.com/">Carto</a> contributors'
                  url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
                  zIndex={0}
                  minZoom={2}
                />

              <Legend />

                <GeoJSON
                  style={locationStyle}
                  data={mergedData.features}
                  onEachFeature={onEachCountry}
                />

                {/* The Marker and the popup tells the place you started. (A follow up feature where you will start at your current location should be added ) */}
                <FindCurrentLocation
                  isEnabled={isLocationEnabled}
                  onLocationFound={handleLocationFound}
                />
              </div>
            )}
          </div>

          {/* Here as you can see, I put a different tile layer (Carto maps) to continue customizing panes*/}
        </MapContainer>
      </div>

      <button
        className="bg-blue-800 text-gray-50 rounded-lg p-2 w-full mb-10 shadow"
        onClick={handleFindLocation}
      >
        Find Current Location
      </button>
    </div>
  );
}

export default Map;
