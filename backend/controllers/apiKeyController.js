const { validateApiKey, generateAndSaveApiKey } = require("../models/ApiKeyModel");

// ✅ Check if API Key is Valid
const checkApiKey = async (req, res) => {
    const { apiKey } = req.body;

    if (!apiKey) {
        return res.status(400).json({ valid: false, message: "API Key is required" });
    }

    const isValid = await validateApiKey(apiKey);

    if (isValid) {
        return res.status(200).json({ valid: true });
    } else {
        return res.status(401).json({ valid: false, message: "Invalid API Key" });
    }
};

// ✅ Generate a New API Key (For testing or admin use)
const createApiKey = async (req, res) => {
    const newKey = await generateAndSaveApiKey();

    if (newKey) {
        return res.status(201).json({ apiKey: newKey });
    } else {
        return res.status(500).json({ error: "Failed to generate API key" });
    }
};

module.exports = { checkApiKey, createApiKey };
