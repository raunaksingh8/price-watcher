const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET /api/health
router.get("/", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ status: "ok", database: "connected" });
  } catch (err) {
    res.status(500).json({ status: "error", detail: err.message });
  }
});

module.exports = router;
