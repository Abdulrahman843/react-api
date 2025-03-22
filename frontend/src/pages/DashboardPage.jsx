import React, { useState } from "react";
import RequestBlock from "../components/RequestBlock";
import RequestForm from "../components/RequestForm";
import ResultsTable from "../components/ResultsTable";
import { simulateRequests } from "../api/apiService";

/**
 * DashboardPage
 * Combines one default request form + result block, and supports adding multiple independent RequestBlocks.
 */
const DashboardPage = () => {
    // State for default block
    const [results, setResults] = useState([]);
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(false);
  
    // State for additional independent blocks
    const [blocks, setBlocks] = useState([]);

  // Handle default block's request submission
  const handleSubmit = async (formData) => {
    const apiKey = localStorage.getItem("apiKey");

    if (!apiKey) {
      alert("API Key not found. Please login again.");
      return;
    }

    try {
      setLoading(true);
      const res = await simulateRequests(apiKey, formData);
      setResults(res.data.detailedResults || []);
      setSummary(res.data.summaryMetrics || null);
    } catch (err) {
      console.error("Simulation failed:", err);
      alert("Something went wrong during simulation.");
    } finally {
      setLoading(false);
    }
  };

  // Add a new independent RequestBlock
  const addBlock = () => {
    setBlocks((prev) => [...prev, prev.length]);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>📡 API Request Simulator</h2>

      {/* 🔹 Default RequestForm and Results block */}
      <div style={{ border: "2px solid #aaa", padding: "1rem", marginBottom: "2rem" }}>
        <h3>🌐 Default Block</h3>
        {loading && <p style={{ color: "blue" }}>Processing API requests...</p>}
        <RequestForm onSubmit={handleSubmit} />

        {summary && (
          <div style={{ marginBottom: "1rem" }}>
            <h4>Summary</h4>
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
          </div>
        )}

        {!loading && results.length === 0 && summary && (
          <p style={{ color: "orange", fontStyle: "italic" }}>
            No valid results were returned. Check your URLs or network.
          </p>
        )}

        {results.length > 0 && <ResultsTable results={results} />}
      </div>

      {/* 🔹 Add Independent RequestBlock Instances */}
      <button onClick={addBlock} style={{ marginBottom: "1rem" }}>
        ➕ Add Request Block
      </button>

      {blocks.map((_, index) => (
        <RequestBlock key={index} />
      ))}
    </div>
  );
};

export default DashboardPage;