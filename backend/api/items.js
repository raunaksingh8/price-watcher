const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET /api/items/search?q=milk
router.get("/search", async (req, res) => {
  const { q } = req.query;
  try {
    const result = await pool.query(
      `SELECT * FROM items WHERE name ILIKE $1 LIMIT 10`,
      [`%${q || ""}%`]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/items
router.post("/", async (req, res) => {
  const { name, category_id, unit } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO items (name, category_id, unit) VALUES ($1, $2, $3) RETURNING *`,
      [name, category_id, unit]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/items/:id
router.get("/:id", async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM items WHERE id = $1`, [
      req.params.id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
