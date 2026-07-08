const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET /api/shops/search?q=big+bazaar
router.get("/search", async (req, res) => {
  const { q } = req.query;
  try {
    const result = await pool.query(
      `SELECT * FROM shops WHERE name ILIKE $1 LIMIT 10`,
      [`%${q || ""}%`]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/shops/nearby?lat=..&lng=..&radius_km=5
router.get("/nearby", async (req, res) => {
  const { lat, lng, radius_km = 5 } = req.query;
  if (!lat || !lng) {
    return res.status(400).json({ error: "lat and lng are required" });
  }
  try {
    const result = await pool.query(
      `SELECT *,
        (6371 * acos(
          cos(radians($1)) * cos(radians(latitude)) *
          cos(radians(longitude) - radians($2)) +
          sin(radians($1)) * sin(radians(latitude))
        )) AS distance_km
      FROM shops
      HAVING (6371 * acos(
          cos(radians($1)) * cos(radians(latitude)) *
          cos(radians(longitude) - radians($2)) +
          sin(radians($1)) * sin(radians(latitude))
        )) < $3
      ORDER BY distance_km ASC`,
      [lat, lng, radius_km]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/shops
router.post("/", async (req, res) => {
  const { name, brand_id, city, area, latitude, longitude, pincode } =
    req.body;
  try {
    const result = await pool.query(
      `INSERT INTO shops (name, brand_id, city, area, latitude, longitude, pincode)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [name, brand_id, city, area, latitude, longitude, pincode]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
