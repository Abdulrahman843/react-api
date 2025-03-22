const mongoose = require("mongoose");

// ✅ Define API Request Schema
const apiRequestSchema = new mongoose.Schema({
    apiKey: { type: String, required: true }, // The API key used
    url: { type: String, required: true }, // The URL requested
    method: { type: String, required: true, enum: ["GET", "POST", "PUT", "DELETE"] }, // HTTP Method
    statusCode: { type: Number, required: true }, // Response status code (e.g., 200, 401, 500)
    success: { type: Boolean, required: true }, // Whether the request was successful
    responseTime: { type: Number, required: true }, // Time taken to process the request (ms)
    createdAt: { type: Date, default: Date.now } // Timestamp for tracking
});

// ✅ Create Model
const ApiRequest = mongoose.model("ApiRequest", apiRequestSchema);

module.exports = ApiRequest;
