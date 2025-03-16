import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import "./Best-route-planner.css";

const AQIRoutePlanner = () => {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [route, setRoute] = useState([]);
  const [error, setError] = useState("");
  const [startCoords, setStartCoords] = useState(null);
  const [endCoords, setEndCoords] = useState(null);

  // Convert location name to lat/lng
  const getCoordinates = async (location) => {
    try {
      console.log(`Fetching coordinates for: ${location}`);
      const res = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${location}`
      );
      if (res.data.length > 0) {
        console.log(`Coordinates found:`, res.data[0]);
        return [parseFloat(res.data[0].lat), parseFloat(res.data[0].lon)];
      } else {
        console.warn(`No results for ${location}`);
      }
    } catch (error) {
      console.error("Geocoding error:", error);
    }
    return null;
  };

  // Handle route search
  const handleSearch = async () => {
    setError("");
    setRoute([]);

    if (!start || !end) {
      setError("Please enter both start and destination.");
      return;
    }

    console.log("Fetching coordinates...");
    const startCoordsData = await getCoordinates(start);
    const endCoordsData = await getCoordinates(end);

    if (!startCoordsData || !endCoordsData) {
      setError("Could not fetch coordinates. Try again.");
      return;
    }

    setStartCoords({ name: start, coords: startCoordsData });
    setEndCoords({ name: end, coords: endCoordsData });

    try {
      console.log("Sending request to backend...");
      const res = await axios.post("http://localhost:5000/best-route", {
        source: startCoordsData,
        destination: endCoordsData,
      });

      console.log("Backend Response:", res.data);

      if (res.data.route && res.data.route.length > 0) {
        setRoute(res.data.route);
      } else {
        setError("No valid route found. Try different locations.");
      }
    } catch (error) {
      console.error("API error:", error);
      setError("Could not fetch the route. Ensure the backend is running.");

      console.warn("Displaying test route...");
      setRoute([
        [28.6139, 77.209], // Delhi
        [28.6145, 77.2101], // Nearby point in Delhi
      ]);
    }
  };

  return (
    <div className="container">
      <h2>AQI-Based Route Planner</h2>
      <div className="search-box">
        <input
          type="text"
          placeholder="Start location"
          value={start}
          onChange={(e) => setStart(e.target.value)}
        />
        <input
          type="text"
          placeholder="Destination"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
        />
        <button onClick={handleSearch}>Find Route</button>
      </div>
      {error && <p className="error">{error}</p>}
      {(startCoords || endCoords) && (
        <div className="route-info">
          {startCoords && (
            <p>
              <strong>Start:</strong> {startCoords.name} (
              {startCoords.coords[0]}, {startCoords.coords[1]})
            </p>
          )}
          {endCoords && (
            <p>
              <strong>Destination:</strong> {endCoords.name} (
              {endCoords.coords[0]}, {endCoords.coords[1]})
            </p>
          )}
        </div>
      )}

      <MapContainer center={[20, 78]} zoom={5} className="map">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {route.length > 0 && (
          <>
            <Marker position={route[0]} />
            <Marker position={route[route.length - 1]} />
            <Polyline positions={route} color="blue" weight={5} />
          </>
        )}
      </MapContainer>
    </div>
  );
};

export default AQIRoutePlanner;
