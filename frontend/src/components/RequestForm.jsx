// src/components/RequestForm.jsx

import React, { useState } from "react";

/**
 * RequestForm Component
 * Allows users to input multiple API request configurations, including:
 * - URL
 * - Override country
 * - Override number of requests
 * - Defaults for country and number
 *
 * Handles dynamic row addition/removal and emits form data to parent for processing.
 *
 * @param {Function} onSubmit - Callback triggered with all input values when the form is submitted
 * @returns {JSX.Element} A dynamic form for configuring API requests
 */
const RequestForm = ({ onSubmit }) => {
  const [defaultCountry, setDefaultCountry] = useState("NG");
  const [defaultNumber, setDefaultNumber] = useState(1);
  const [rows, setRows] = useState([
    { url: "", country: "", number: "" }
  ]);

  // Handles input changes per row
  const handleRowChange = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;
    setRows(updated);
  };

  // Adds a new empty row
  const addRow = () => {
    setRows([...rows, { url: "", country: "", number: "" }]);
  };

  // Removes a row by index
  const removeRow = (index) => {
    const updated = [...rows];
    updated.splice(index, 1);
    setRows(updated);
  };

  // Handles form submission and prepares payload for parent component
  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedPayload = rows.map((row) => ({
      url: row.url,
      country: row.country || defaultCountry,
      number: parseInt(row.number || defaultNumber)
    }));

    onSubmit({ defaultCountry, defaultNumber, requests: formattedPayload });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Simulation Configuration</h3>

      <div>
        <label>Default Country: </label>
        <input
          type="text"
          value={defaultCountry}
          onChange={(e) => setDefaultCountry(e.target.value)}
        />
      </div>

      <div>
        <label>Default Number of Requests: </label>
        <input
          type="number"
          value={defaultNumber}
          min={1}
          onChange={(e) => setDefaultNumber(e.target.value)}
        />
      </div>

      <hr />

      {rows.map((row, idx) => (
        <div key={idx} style={{ marginBottom: "1rem", padding: "10px", border: "1px solid #ccc" }}>
          <label>URL: </label>
          <input
            type="text"
            value={row.url}
            onChange={(e) => handleRowChange(idx, "url", e.target.value)}
            required
          />

          <label>Country: </label>
          <input
            type="text"
            value={row.country}
            onChange={(e) => handleRowChange(idx, "country", e.target.value)}
          />

          <label>Number: </label>
          <input
            type="number"
            value={row.number}
            min={1}
            onChange={(e) => handleRowChange(idx, "number", e.target.value)}
          />

          <button type="button" onClick={() => removeRow(idx)}>
            Remove
          </button>
        </div>
      ))}

      <button type="button" onClick={addRow}>Add Row</button>
      <button type="submit">Send Requests</button>
    </form>
  );
};

export default RequestForm;
