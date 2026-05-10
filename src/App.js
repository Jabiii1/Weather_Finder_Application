import React, { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "333a36c9ccfa01cccdefd2602b40df8e";

  const fetchWeather = async () => {
    if (!city.trim()) return;

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();
      
      setWeather({
        name: data.name,
        temperature: data.main.temp,
        condition: data.weather[0].main,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        background: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "50px 40px",
          borderRadius: "20px",
          boxShadow: "0 15px 30px rgba(0,0,0,0.2)",
          width: "100%",
          maxWidth: "500px",
          textAlign: "center",
        }}
      >

        <h1 style={{ color: "#2c3e50", fontSize: "36px", margin: "0 0 30px 0" }}>
          🌤️ Weather App
        </h1>
  
        <div style={{ display: "flex", gap: "15px", marginBottom: "30px" }}>
          <input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            style={{
              flex: 1,
              padding: "15px 20px",
              borderRadius: "10px",
              border: "2px solid #e1e5ee",
              fontSize: "18px",
              outline: "none",
            }}
          />
          <button
            onClick={fetchWeather}
            style={{
              padding: "15px 30px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "18px",
              boxShadow: "0 4px 6px rgba(0,123,255,0.3)",
            }}
          >
            Search
          </button>
        </div>

        {loading && <p style={{ color: "#66a6ff", fontSize: "20px", fontWeight: "bold" }}>⏳ Loading...</p>}

        {error && <p style={{ color: "#ff4d4f", fontSize: "20px", fontWeight: "bold" }}>❌ {error}</p>}

        {weather && !loading && !error && (
          <div
            style={{
              marginTop: "10px",
              padding: "30px",
              background: "linear-gradient(to bottom, #f8f9fa, #e9ecef)",
              borderRadius: "15px",
              border: "1px solid #dee2e6",
            }}
          >
            <h2 style={{ margin: "0 0 20px 0", color: "#343a40", fontSize: "32px" }}>
              📍 {weather.name}
            </h2>
            <p style={{ margin: "10px 0", fontSize: "24px", color: "#495057" }}>
              <strong>🌡️ Temp:</strong> {weather.temperature}°C
            </p>
            <p style={{ margin: "10px 0", fontSize: "24px", color: "#495057" }}>
              <strong>☁️ Condition:</strong> {weather.condition}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
