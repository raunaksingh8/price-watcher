const express = require("express");
const router = express.Router();
const pool = require("../db");

// POST /api/prices - log a new price entry
router.post("/", async (req, res) => {
  const { item_id, shop_id, user_id, price, date_recorded, notes } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO price_entries (item_id, shop_id, user_id, price, date_recorded, notes)
       VALUES ($1, $2, $3, $4, COALESCE($5, CURRENT_DATE), $6) RETURNING *`,
      [item_id, shop_id, user_id, price, date_recorded, notes]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/prices/nearby/:itemId?lat=..&lng=..&radius_km=5
router.get("/nearby/:itemId", async (req, res) => {
  const { itemId } = req.params;
  const { lat, lng, radius_km = 5 } = req.query;
  try {
    const result = await pool.query(
      `SELECT pe.*, s.name AS shop_name, s.latitude, s.longitude,
        (6371 * acos(
          cos(radians($2)) * cos(radians(s.latitude)) *
          cos(radians(s.longitude) - radians($3)) +
          sin(radians($2)) * sin(radians(s.latitude))
        )) AS distance_km
      FROM price_entries pe
      JOIN shops s ON pe.shop_id = s.id
      WHERE pe.item_id = $1
      ORDER BY pe.price ASC`,
      [itemId, lat, lng]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/prices/trend/:itemId
router.get("/trend/:itemId", async (req, res) => {
  const { itemId } = req.params;
  try {
    const result = await pool.query(
      `SELECT price, date_recorded FROM price_entries
       WHERE item_id = $1 ORDER BY date_recorded ASC`,
      [itemId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
