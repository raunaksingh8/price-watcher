const express = require("express");
const router = express.Router();

// POST /api/auth/signup
router.post("/signup", async (req, res) => {
  // TODO: implement signup (e.g. via Supabase Auth or bcrypt + JWT)
  res.status(501).json({ message: "Signup not implemented yet" });
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  // TODO: implement login
  res.status(501).json({ message: "Login not implemented yet" });
});

module.exports = router;
