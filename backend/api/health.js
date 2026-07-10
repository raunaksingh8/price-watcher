const pool = require("../db");

module.exports = (app) => {
  // GET /api/health
  app.get("/api/health", async (req, res) => {
    try {
      await pool.query("SELECT 1");
      res.json({ status: "ok", database: "connected" });
    } catch (err) {
      res.status(500).json({ status: "error", detail: err.message });
    }
  });
};