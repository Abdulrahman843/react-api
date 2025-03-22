// src/components/ApiKeyForm.jsx

import React, { useState } from "react";

/**
 * API Key Form Component
 * Renders a form for the user to input and validate their API key.
 *
 * @param {Function} onValidate - A callback function triggered when the form is submitted.
 *                                It receives the entered API key and returns a success status.
 */
const ApiKeyForm = ({ onValidate }) => {
  const [apiKey, setApiKey] = useState("");   // Stores the user's input
  const [error, setError] = useState("");     // Stores any validation error message

  // Handles form submission and triggers API key validation
  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await onValidate(apiKey);
    if (!success) setError("Invalid API Key");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter API Key"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
      />
      <button type="submit">Validate</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default ApiKeyForm;
