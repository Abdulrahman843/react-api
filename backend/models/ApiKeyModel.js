const mongoose = require("mongoose");
const crypto = require("crypto");

// Define API Key Schema
const apiKeySchema = new mongoose.Schema({
    key: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now, expires: '24h' } // Expires in 24 hours
});


// Create Model
const ApiKey = mongoose.model("ApiKey", apiKeySchema);

// ✅ Function to Validate API Key
const validateApiKey = async (key) => {
    const foundKey = await ApiKey.findOne({ key });
    return !!foundKey; // Returns true if the key exists
};

// ✅ Function to Generate and Store a New API Key (Only if none exist)
const generateAndSaveApiKey = async () => {
    const existingKey = await ApiKey.findOne(); // Check if a key exists

    if (existingKey) {
        return existingKey.key; // Return the existing key
    }

    const newKey = crypto.randomBytes(16).toString("hex"); // Generate a new 32-character key
    const apiKey = new ApiKey({ key: newKey });

    try {
        await apiKey.save();
        return newKey;
    } catch (err) {
        console.error("Error saving API key:", err);
        return null;
    }
};

module.exports = { validateApiKey, generateAndSaveApiKey };
