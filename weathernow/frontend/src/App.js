import React, { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const getWeather = () => {
    fetch(`/api/weather/${city}`)
      .then((res) => {
        if (!res.ok) throw new Error("Ciudad no encontrada");
        return res.json();
      })
      .then((data) => {
        setWeather(data);
        setError("");
      })
      .catch((err) => {
        setError(err.message);
        setWeather(null);
      });
  };

  return (
    <div style={{ background: "#dff4ff", minHeight: "100vh", textAlign: "center", padding: "40px" }}>
      <h1>🌤️ WeatherNow</h1>
      <input
        type="text"
        placeholder="Introduce una ciudad (Madrid, Sevilla...)"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ padding: "10px", width: "300px", borderRadius: "8px", border: "1px solid #ccc" }}
      />
      <button
        onClick={getWeather}
        style={{ marginLeft: "10px", padding: "10px 15px", borderRadius: "8px", border: "none", background: "#007bff", color: "#fff" }}
      >
        Buscar
      </button>

      {weather && (
        <div style={{ marginTop: "40px", fontSize: "20px" }}>
          <h2>{weather.city}</h2>
          <p>Temperatura: {weather.temp} °C</p>
          <p>Condición: {weather.condition}</p>
          <p>Viento: {weather.windspeed} km/h</p>
          <p>Lat/Lon: {weather.lat}, {weather.lon}</p>
        </div>
      )}

      {error && <p style={{ color: "red", marginTop: "20px" }}>{error}</p>}
    </div>
  );
}

export default App;
