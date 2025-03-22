// src/components/ResultsTable.jsx

import React from "react";

/**
 * ResultsTable Component
 * Displays detailed results of each API request made through the simulation form.
 * This includes metrics like IP, ISP, Proxy, and status.
 *
 * @param {Array} results - Array of request result objects (each with url, isp, ipAddress, proxy, status)
 * @returns {JSX.Element} A responsive, styled HTML table of request results
 */
const ResultsTable = ({ results = [] }) => {
  return (
    <div>
      <h3>Detailed Results</h3>
      <table border="1" cellPadding="6" cellSpacing="0">
        <thead>
          <tr>
            <th>URL</th>
            <th>ISP</th>
            <th>IP Address</th>
            <th>Proxy</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {results.map((res, index) => (
            <tr key={index}>
              <td>{res.url}</td>
              <td>{res.isp}</td>
              <td>{res.ipAddress}</td>
              <td>{res.proxy}</td>
              <td style={{ color: res.status === "success" ? "green" : "red" }}>
                {res.status.toUpperCase()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultsTable;
