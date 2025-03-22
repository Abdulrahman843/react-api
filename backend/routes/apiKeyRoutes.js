const express = require("express");
const { checkApiKey, createApiKey } = require("../controllers/apiKeyController");

const router = express.Router();

// ✅ Validate API Key
router.post("/validate", checkApiKey);

// ✅ Generate New API Key
router.post("/generate", createApiKey);

module.exports = router;
