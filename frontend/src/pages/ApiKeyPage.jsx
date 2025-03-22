// src/pages/ApiKeyPage.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import ApiKeyForm from "../components/ApiKeyForm";
import { validateApiKey } from "../api/apiService";

/**
 * API Key Page
 * Acts as a controller in the MVR architecture.
 * Handles user input, API key validation, and redirects to the dashboard upon success.
 */
const ApiKeyPage = () => {
  const navigate = useNavigate(); // Used for navigation between routes

  /**
   * Handles the API key validation.
   * Stores the key in localStorage and redirects to dashboard if valid.
   *
   * @param {string} apiKey - The entered API key
   * @returns {boolean} Whether the API key is valid
   */
  const handleValidate = async (apiKey) => {
    try {
      const res = await validateApiKey(apiKey);
      if (res.data.valid) {
        localStorage.setItem("apiKey", apiKey);
        navigate("/dashboard");
        return true;
      }
    } catch {
      return false;
    }
  };

  return (
    <div>
      <h2>Enter API Key</h2>
      <ApiKeyForm onValidate={handleValidate} />
    </div>
  );
};

export default ApiKeyPage;
