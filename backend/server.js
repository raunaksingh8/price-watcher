require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

const express = require("express");
const cors = require("cors");
const { log, logError } = require("./logs");
const { globallimiter } = require("./middleware/rateLimiters");

const healthRoutes = require("./api/health");
const authRoutes = require("./api/auth");
// const itemRoutes = require("./api/items");
// const shopRoutes = require("./api/shops");
// const priceRoutes = require("./api/prices");

const app = express();
const PORT = process.env.PORT || 8000;

// Needed on Render/Vercel-style hosts sitting behind a proxy,
// so req.ip and rate limiting work correctly.
app.set("trust proxy", 1);

// Request logging middleware (IST timestamps, method, url, status, duration, IP)
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const ist = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    log(
      `[${ist}] ${req.method} ${req.url} ${res.statusCode} - ${Date.now() - start}ms - IP:${req.ip}`
    );
  });
  next();
});

console.log("FRONTEND_URL =", process.env.FRONTEND_URL);

// CORS: only allow your real frontend + local dev, not "*"
app.use(
  cors({
    origin: [process.env.FRONTEND_URL, "http://localhost:3000"],
  })
);

app.use(express.json());
app.use(globallimiter);

app.get("/", (req, res) => {
  res.json({ message: "Backend API is running" });
});

require("./api/health")(app);
require("./api/auth")(app);
// require("./api/items")(app);
// require("./api/shops")(app);
// require("./api/prices")(app);

// Central error handler
app.use((err, req, res, next) => {
  logError(err.stack);
  res.status(500).json({ error: "Something went wrong" });
});

app.listen(PORT, () => {
  log(`Server running on port ${PORT}`);
});