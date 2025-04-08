const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const axios = require('axios');

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
  try {
    const apiKey = '18eegpVw4Zrh7ZQdAjFNaGv7Ko966KFs6elyb3og'; // or move to .env
    const response = await axios.get(`https://developer.nrel.gov/api/alt-fuel-stations/v1.json?api_key=${apiKey}&country=US&limit=100`);
    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch projects' });
  }
});

module.exports = router;
