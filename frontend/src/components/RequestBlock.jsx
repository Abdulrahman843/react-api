import React, { useState } from "react";
import RequestForm from "./RequestForm";
import ResultsTable from "./ResultsTable";
import { simulateRequests } from "../api/apiService";

/**
 * RequestBlock Component
 * Reusable block containing a request form and its results.
 * Each block handles its own API logic and state independently.
 */
const RequestBlock = () => {
  const [results, setResults] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handles submission from the form
  const handleSubmit = async (formData) => {
    const apiKey = localStorage.getItem("apiKey");
    if (!apiKey) {
      alert("API Key not found.");
      return;
    }

    try {
      setLoading(true);
      const res = await simulateRequests(apiKey, formData);

      setResults(res.data.detailedResults || []);
      setSummary(res.data.summaryMetrics || []);
    } catch (err) {
      console.error("Error during simulation:", err);
      alert("Request failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ border: "2px solid #ddd", padding: "1rem", marginBottom: "2rem" }}>
      <RequestForm onSubmit={handleSubmit} />

      {loading && <p style={{ color: "blue" }}>Loading...</p>}

      {summary && summary.length > 0 && (
        <>
          <h3>Summary</h3>
          <table border="1" cellPadding="6" cellSpacing="0">
            <thead>
              <tr>
                <th>URL</th>
                <th>Successes</th>
                <th>Success Rate (%)</th>
                <th>Failures</th>
                <th>Failure Rate (%)</th>
              </tr>
            </thead>
            <tbody>
              {summary.map((item, index) => (
                <tr key={index}>
                  <td>{item.url}</td>
                  <td>{item.successCount}</td>
                  <td>{item.successRate}</td>
                  <td>{item.failureCount}</td>
                  <td>{item.failureRate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {!loading && results.length === 0 && summary && (
        <p style={{ color: "orange" }}>No results returned for this block.</p>
      )}

      {results.length > 0 && <ResultsTable results={results} />}
    </div>
  );
};

export default RequestBlock;
