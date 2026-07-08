const rateLimit = require("express-rate-limit");

// General limiter for most routes
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { error: "Too many requests, please try again later." },
});

// Stricter limiter for write actions (e.g. adding price entries)
// to prevent spam/fake data flooding.
const writeLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10,
  message: { error: "Too many submissions, please slow down." },
});

module.exports = { generalLimiter, writeLimiter };
