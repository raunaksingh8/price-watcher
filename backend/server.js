require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

const express = require("express");
const cors = require("cors");
const { log, logError } = require("./logs");
const { generalLimiter } = require("./middleware/rateLimiters");

const healthRoutes = require("./api/health");
const authRoutes = require("./api/auth");
const itemRoutes = require("./api/items");
const shopRoutes = require("./api/shops");
const priceRoutes = require("./api/prices");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(generalLimiter);

app.get("/", (req, res) => {
  res.json({ message: "Price Watcher API is running" });
});

app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/shops", shopRoutes);
app.use("/api/prices", priceRoutes);

app.use((err, req, res, next) => {
  logError(err.stack);
  res.status(500).json({ error: "Something went wrong" });
});

app.listen(PORT, () => {
  log(`Server running on port ${PORT}`);
});
