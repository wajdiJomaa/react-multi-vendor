import React, { useEffect, useMemo ,  useState  } from 'react';
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import "./css/map.css"

const MapComponent = () => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const options = {
    disableDefaultUI: true,
    zoomControl: true
  };

  const center = useMemo(() => ({ lat: 33.8547, lng: 35.8623 }), []);


    const initMap  = (map) => {

      // Create a marker variable
      let marker;

      // Function to update the marker position
      const updateMarkerPosition = (latitude, longitude) => {
        const position = { lat: parseFloat(latitude), lng: parseFloat(longitude) };

        // Remove existing marker if it exists
        if (marker) {
          marker.setMap(null);
        }

        // Create a new marker at the updated position
        marker = new window.google.maps.Marker({
          position: position,
          map: map,
        });
      };

      // Add a click event listener to the map
      map.addListener('click', (event) => {
        const latitudeInput = document.getElementById('id_latitude');
        const longitudeInput = document.getElementById('id_longitude');
        const latitude = event.latLng.lat();
        const longitude = event.latLng.lng();

        // Update the input values
        latitudeInput.value = latitude;
        longitudeInput.value = longitude;

        // Update the marker position
        updateMarkerPosition(latitude, longitude);
      });

      // Function to handle changes in the latitude input
      const handleLatitudeChange = (event) => {
        const latitude = event.target.value;
        const longitude = document.getElementById('id_longitude').value;

        // Update the marker position
        updateMarkerPosition(latitude, longitude);
      };

      // Function to handle changes in the longitude input
      const handleLongitudeChange = (event) => {
        const latitude = document.getElementById('id_latitude').value;
        const longitude = event.target.value;

        // Update the marker position
        updateMarkerPosition(latitude, longitude);
      };

      // Add event listeners to the latitude and longitude inputs
      document.getElementById('id_latitude').addEventListener('input', handleLatitudeChange);
      document.getElementById('id_longitude').addEventListener('input', handleLongitudeChange);
    
    }

    const handleMapClick = (event) => {
      const latitude = event.latLng.lat();
      const longitude = event.latLng.lng();
    
      setLatitude(latitude);
      setLongitude(longitude);
    };


  return (
    <div>
        {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <>
        <GoogleMap
          mapContainerClassName="map-container"
          onLoad={initMap}
          center={center}
          zoom={8}
          options={options}
        ></GoogleMap>
      <label htmlFor="id_latitude">Latitude:</label>
      <input type="text" id="id_latitude" />
      <div>
      <label htmlFor="id_longitude">Longitude:</label>
      <input type="text" id="id_longitude" />
      </div>
      </>
      )}
    </div>
  );

};

export default MapComponent;