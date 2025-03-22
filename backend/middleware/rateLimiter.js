const rateLimit = require("express-rate-limit");

// Middleware to Limit API Requests
const apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute window
    max: 10, // Limit each API key to 10 requests per minute
    message: { error: "Too many requests. Please try again later." },
    headers: true, // Show rate limit headers
    keyGenerator: (req) => req.headers["x-api-key"] || req.ip, // Limit by API key or IP
});

module.exports = apiLimiter;
