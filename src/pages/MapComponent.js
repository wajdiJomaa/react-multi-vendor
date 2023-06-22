import React, { useEffect } from 'react';

const MapComponent = () => {
  useEffect(() => {
    function initMap() {
      const lebanonCoordinates = { lat: 33.8547, lng: 35.8623 }; // Coordinates of Lebanon
      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: lebanonCoordinates,
        zoom: 8,
      });

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

    // Load the Google Maps API
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&callback=initMap`;
    script.async = true;
    script.defer = true;

    // Define the callback function that will be called when the API script is loaded
    window.initMap = initMap;

    // Append the script to the document body
    document.body.appendChild(script);

    return () => {
      // Clean up the script and remove the callback function when the component unmounts
      delete window.initMap;
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
     
      <div id="map" style={{ height: '400px', width: '100%' }}></div>
      <label htmlFor="id_latitude">Latitude:</label>
      <input type="text" id="id_latitude" />
      <div>
      <label htmlFor="id_longitude">Longitude:</label>
      <input type="text" id="id_longitude" />
      </div>
    </div>
  );

};

export default MapComponent;