import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./Aqi.css";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [dateTime, setDateTime] = useState(new Date());

  // Update real-time date and time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchWeather = async () => {
    if (!city) return alert("Enter a city name");

    const apiKey = "c0add54beec14d3faba185522250903";
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log("data: ", data);
      setWeather(data);
    } catch (error) {
      alert("Failed to fetch weather data");
    }
  };

  const getHealthTips = () => {
    if (!weather) return [];
    const temp = weather?.current?.temp_c;
    const condition = weather?.current?.condition?.text.toLowerCase();

    let tips = ["Stay hydrated", "Wear comfortable clothes"];

    if (temp > 30) {
      tips.push("Avoid direct sunlight", "Use sunscreen");
    } else if (temp < 10) {
      tips.push("Wear warm clothes", "Drink hot beverages");
    }

    if (condition.includes("rain")) {
      tips.push("Carry an umbrella", "Avoid slippery roads");
    } else if (condition.includes("snow")) {
      tips.push("Wear boots", "Drive carefully on icy roads");
    }

    return tips;
  };

  return (
    <div className="app-container">
      <h2 className="title">Predict Weather In Your City</h2>

      {/* Display Real-Time Date and Time */}
      <p className="date-time">
        📅 {dateTime.toLocaleDateString()} | ⏰ {dateTime.toLocaleTimeString()}
      </p>

      <div className="input-container">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
        />
        <button onClick={fetchWeather}>Get Weather</button>
      </div>

      {weather && (
        <div className="weather-card">
          <h3>
            {weather?.location?.name}, {weather?.location?.country}
          </h3>
          <p>Temperature: {weather?.current?.temp_c}°C</p>
          <p>Condition: {weather?.current?.condition?.text}</p>
          <img src={weather?.current?.condition?.icon} alt="Weather Icon" />

          <div className="health-tips">
            <h4>Health Tips 🏥:</h4>
            <ul>
              {getHealthTips().map((tip, index) => (
                <li key={index}>✅ {tip}</li>
              ))}
            </ul>
          </div>

          {weather?.current?.air_quality && (
            <div className="aqi-chart">
              <h4>Air Quality Index</h4>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart
                  data={Object.entries(weather.current.air_quality).map(
                    ([key, value]) => ({ name: key, value })
                  )}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
