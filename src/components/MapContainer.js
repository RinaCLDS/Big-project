import React, { useState } from 'react';
import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react';
import SearchBar from './SearchBar';
import { useGetGurjarUsersQuery } from '../state/api';
const MapContainer = (props) => {
    console.log('this is map container')
  const [activeMarker, setActiveMarker] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [map, setMap] = useState(null);
  const [place, setPlaces] = useState([]);
  const {data, isLoading} = useGetGurjarUsersQuery();
  
  console.log(data)
  const onMarkerClick = (props, marker) => {
    setActiveMarker(marker);
    setSelectedPlace(props);
  };
  const places = isLoading? [
    {
      id: 1,
      latitude: 37.7749,
      longitude: -122.4194,
      name: 'Name',
      country: 'Country',
      state: 'State',
      city: 'City',
      village: 'Village',
      bloodGroup: 'BloodGroup',

    },
    // Add more places as needed
  ]:data
  console.log(isLoading, '111')

  const renderMarkers = () => {
    return places.map((place, index) => (
      <Marker
        key={index}
        title={place.name}
        position={{ lat: place.latitude, lng: place.longitude }}
        onClick={onMarkerClick}
        name={place.name}
        city={place.city}
        state={place.state}
        bloodgroup={place.blood_group}
        country={place.nationality}
        image={place.profile_pic}
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
            <Marker key={index} position={`${place.latitude}, ${place.longitude}`} title={place.name} />
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
