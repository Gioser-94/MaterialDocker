const express = require('express');
const fetch = require('node-fetch'); // si usas Node 18+, puedes usar fetch nativo
const router = express.Router();

router.get('/:city', async (req, res) => {
  const city = req.params.city;

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)}&format=json`,
      {
        headers: { 'User-Agent': 'weathernow-app/1.0' } // obligatorio
      }
    );
    const data = await response.json();
    if (data.length === 0) return res.status(404).json({ error: 'Ciudad no encontrada' });

    // devolver solo lat y lon
    res.json({
      lat: data[0].lat,
      lon: data[0].lon,
      name: data[0].display_name
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error consultando geocoding' });
  }
});

module.exports = router;