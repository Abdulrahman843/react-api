// src/api/apiService.js

import axios from "axios";

// Base URL for all API endpoints
const API_BASE = "http://localhost:5000/api";

/**
 * Validate API Key
 * Sends the API key to the backend for validation.
 * @param {string} apiKey - The API key entered by the user.
 * @returns {Promise} Axios response indicating whether the API key is valid.
 */
export const validateApiKey = (apiKey) =>
  axios.post(`${API_BASE}/key/validate`, { apiKey });

/**
 * Generate a New API Key
 * Used by admin or test users to generate a fresh API key.
 * @returns {Promise} Axios response containing the newly generated API key.
 */
export const generateApiKey = () =>
  axios.post(`${API_BASE}/key/generate`);

/**
 * Simulate API Requests
 * Sends a payload containing request parameters and the API key to simulate multiple requests.
 * @param {string} apiKey - The authenticated API key.
 * @param {object} payload - Contains URL list, country, number of requests, etc.
 * @returns {Promise} Axios response containing the simulation results.
 */
export const simulateRequests = (apiKey, payload) =>
  axios.post(`${API_BASE}/request/send`, { apiKey, ...payload });
