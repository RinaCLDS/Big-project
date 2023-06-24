import React, { useState } from 'react';
import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react';
import SearchBar from './SearchBar';
const MapContainer = (props) => {
  const [activeMarker, setActiveMarker] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [map, setMap] = useState(null);
  const [place, setPlaces] = useState([]);

  const onMarkerClick = (props, marker) => {
    setActiveMarker(marker);
    setSelectedPlace(props);
  };
  const places = [
    {
      id: 1,
      lat: 37.7749,
      lng: -122.4194,
      name: 'Name',
      country: 'Country',
      state: 'State',
      city: 'City',
      village: 'Village',
      bloodGroup: 'BloodGroup',


    },
    {
      id: 2,
      lat: 39.7749,
      lng: -110.4194,
      name: 'Name',
      country: 'Country',
      state: 'State',
      city: 'City',
      village: 'Village',
      bloodGroup: 'BloodGroup',

    },
    {
      id: 2,
      lat: 17.607789,
      lng: 8.081666,
      name: 'Name',
      country: 'Country',
      state: 'State',
      city: 'City',
      village: 'Village',
      bloodGroup: 'BloodGroup',

    },
    {
      id: 2,
      lat: -69.9,
      lng: 18.46666667,
      name: 'Name',
      country: 'Country',
      state: 'State',
      city: 'City',
      village: 'Village',
      bloodGroup: 'BloodGroup',

    },
    {
      id: 2,
      lat: -61.75,
      lng: 12.05,
      name: 'Name',
      country: 'Country',
      state: 'State',
      city: 'City',
      village: 'Village',
      bloodGroup: 'BloodGroup',

    },
    {
      id: 2,
      lat: 17.607789,
      lng: 8.081666,
      name: 'Name',
      country: 'Country',
      state: 'State',
      city: 'City',
      village: 'Village',
      bloodGroup: 'BloodGroup',

    },
    {
      id: 2,
      lat: -21.95,
      lng: 64.15,
      name: 'Name',
      country: 'Country',
      state: 'State',
      city: 'City',
      village: 'Village',
      bloodGroup: 'BloodGroup',

    },
    {
      id: 2,
      lat: 16.7,
      lng: 29.36666667,
      name: 'Name',
      country: 'Country',
      state: 'State',
      city: 'City',
      village: 'Village',
      bloodGroup: 'BloodGroup',

    },
    {
      id: 2,
      lat: -62.216667,
      lng: 16.7,
      name: 'Name',
      country: 'Country',
      state: 'State',
      city: 'City',
      village: 'Village',
      bloodGroup: 'BloodGroup',

    },
    {
      id: 2,
      lat: 10.75,
      lng: 59.91666667,
      name: 'Name',
      country: 'Country',
      state: 'State',
      city: 'City',
      village: 'Village',
      bloodGroup: 'BloodGroup',

    },
    {
      id: 2,
      lat: -3.683333,
      lng: 40.4,
      name: 'Name',
      country: 'Country',
      state: 'State',
      city: 'City',
      village: 'Village',
      bloodGroup: 'BloodGroup',

    },
    {
      id: 2,
      lat: 28.283333,
      lng: -15.41666667,
      name: 'Name',
      country: 'Country',
      state: 'State',
      city: 'City',
      village: 'Village',
      bloodGroup: 'BloodGroup',

    },
    {
      id: 2,
      lat: 100.516667,
      lng: 13.75,
      name: 'Name',
      country: 'Country',
      state: 'State',
      city: 'City',
      village: 'Village',
      bloodGroup: 'BloodGroup',

    },
    {
      id: 2,
      lat: 18.05,
      lng: 59.33333333,
      name: 'Name',
      country: 'Country',
      state: 'State',
      city: 'City',
      village: 'Village',
      bloodGroup: 'BloodGroup',

    },
    {
      id: 2,
      lat: 38.7,
      lng: 9.033333333,
      name: 'Name',
      country: 'Country',
      state: 'State',
      city: 'City',
      village: 'Village',
      bloodGroup: 'BloodGroup',


    },
    {
      id: 2,
      name: 'Name',
      lat: -70.666667,
      lng: -33.45,
      country: 'Country',
      state: 'State',
      city: 'City',
      village: 'Village',
      bloodGroup: 'BloodGroup',

    },
    // Add more places as needed
  ];


  const renderMarkers = () => {
    return places.map((place) => (
      <Marker
        key={place.id}
        title={place.name}
        position={{ lat: place.lat, lng: place.lng }}
        onClick={onMarkerClick}
        name={place.name}
        city={place.city}
        state={place.state}
        bloodgroup={place.bloodgroup}
        country={place.country}
        image={place.image}
        icon={{
          url: 'user.png',
          scaledSize: new props.google.maps.Size(40, 40),
        }}
      />
    ));
  };

  const onMapReady = (mapProps, map) => {
    setMap(map);
  };

  const onSearch = (query) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: query }, (results, status) => {
      if (status === 'OK' && results.length > 0) {
        const location = results[0].geometry.location;
        map.panTo(location);
        map.setZoom(6);
        setPlaces([{ name: query, location }]);
        // Create a new marker for the search result
        const searchMarker = new window.google.maps.Marker({
          position: location,
          map: map,
          title: 'Search Result',
        });


      }
    });
  };

  const { google } = props;

  return (

    <div>
      <div>
        <SearchBar onSearch={onSearch} />
      </div>

      <div style={{ position: 'relative', height: '70vh', }}>
        <Map
          google={google}
          zoom={4}
          minZoom={2}
          maxZoom={15}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, padding: '1rem' }}
          initialCenter={{ lat: 17.607789, lng: 8.081666 }}
          onReady={onMapReady}
        >
          <SearchBar onSearch={onSearch} />
          {places.map((place, index) => (
            <Marker key={index} position={place.location} title={place.name} />
          ))}
          {renderMarkers()}
          <InfoWindow
            marker={activeMarker}
            visible={activeMarker !== null}
            onClose={() => setActiveMarker(null)}
          >
            <div>
              <h3>{selectedPlace && selectedPlace.name}</h3>
              <p>{selectedPlace && selectedPlace.city}</p>
              <p>{selectedPlace && selectedPlace.state}</p>
              <p>{selectedPlace && selectedPlace.bloodgroup}</p>
              <p>{selectedPlace && selectedPlace.country}</p>
            </div>
          </InfoWindow>
        </Map>
      </div>
    </div >
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyD41j_ryqGYD2R7EcSFMblU3Hx_rqIiarg', // Replace with your API Key
})(MapContainer);
