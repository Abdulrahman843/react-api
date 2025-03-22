const express = require("express");
const cors = require("cors");
const apiKeyRoutes = require("./routes/apiKeyRoutes");
const apiRequestRoutes = require("./routes/apiRequestRoutes"); // ✅ Ensure this is included
// const { trackApiUsage } = require("./controllers/apiRequestController");
const apiLimiter = require("./middleware/rateLimiter");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// app.use(trackApiUsage); // Log API requests
app.use(apiLimiter); // Apply rate limiting

// Register API Routes
app.use("/api/key", apiKeyRoutes);
app.use("/api/request", apiRequestRoutes); // Ensure this line is present

module.exports = app;
