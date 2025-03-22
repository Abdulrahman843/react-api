const express = require("express");
const { handleApiRequests } = require("../controllers/apiRequestController");

const router = express.Router();

// ✅ Route for handling API requests
router.post("/send", handleApiRequests);

module.exports = router;
