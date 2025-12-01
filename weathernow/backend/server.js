import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());

app.get("/api/weather/:city", async (req, res) => {
  try {
    const city = req.params.city;

    // 1️⃣ Buscar coordenadas con Nominatim
    const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)}&format=json&limit=1`, {
      headers: {
        "User-Agent": "WeatherNowApp/1.0 (contact: weathernow@example.com)"
      }
    });
    const geoData = await geoRes.json();

    if (!geoData || geoData.length === 0) {
      return res.status(404).json({ error: "Ciudad no encontrada" });
    }

    const { lat, lon } = geoData[0];

    // 2️⃣ Obtener clima actual de Open-Meteo
    const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
    const weatherData = await weatherRes.json();

    if (!weatherData || !weatherData.current_weather) {
      return res.status(500).json({ error: "No se pudo obtener el clima" });
    }

    const { temperature: temp, windspeed, weathercode } = weatherData.current_weather;

    // Mapear weathercode a condición simple
    const conditionsMap = {
      0: "Despejado",
      1: "Parcialmente nublado",
      2: "Parcialmente nublado",
      3: "Nublado",
      45: "Niebla",
      48: "Niebla",
      51: "Lluvia ligera",
      53: "Lluvia ligera",
      55: "Lluvia moderada",
      61: "Lluvia",
      63: "Lluvia",
      65: "Lluvia intensa",
      71: "Nieve ligera",
      73: "Nieve moderada",
      75: "Nieve intensa",
      95: "Tormenta",
      96: "Tormenta con granizo",
      99: "Tormenta con granizo"
    };

    const condition = conditionsMap[weathercode] || "Desconocido";

    res.json({ city, temp, condition, windspeed, lat, lon });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

app.listen(4000, () => console.log("🌦️ Backend escuchando en http://localhost:4000"));
