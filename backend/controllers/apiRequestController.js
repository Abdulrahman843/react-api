const { validateApiKey } = require("../models/ApiKeyModel");
const { generateMockResponse } = require("../mockData/mockResponses");

/**
 * Simulates a single API request with random mock data
 * Adds an artificial delay to mimic network latency.
 *
 * @param {string} url - The URL to simulate a request for
 * @returns {Promise<Object>} Mock response object
 */
const mockApiResponse = (url) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generateMockResponse(url));
    }, Math.random() * 1000 + 300); // Simulate random delay (300ms to 1300ms)
  });
};

/**
 * Handles concurrent API simulations with per-URL configurations
 * Expects payload:
 * {
 *   apiKey: string,
 *   defaultCountry: string,
 *   defaultNumber: number,
 *   requests: [{ url: string, country?: string, number?: number }]
 * }
 */
const handleApiRequests = async (req, res) => {
  const { apiKey, defaultCountry, defaultNumber, requests } = req.body;

  // API Key Validation
  if (!apiKey || !(await validateApiKey(apiKey))) {
    return res.status(401).json({ error: "Invalid or expired API key" });
  }

  if (!requests || !Array.isArray(requests) || requests.length === 0) {
    return res.status(400).json({ error: "No requests found in payload" });
  }

  try {
    let allResults = [];

    // Loop over each request group (per URL)
    for (const reqItem of requests) {
      const url = reqItem.url;
      const country = reqItem.country || defaultCountry;
      const numRequests = parseInt(reqItem.number || defaultNumber);

      const batch = await Promise.all(
        Array.from({ length: numRequests }).map(() =>
          mockApiResponse(url)
        )
      );

      allResults = allResults.concat(batch);
    }

    // Group and summarize results by URL
    const summaryMap = {};

    allResults.forEach((res) => {
      const url = res.url;
      if (!summaryMap[url]) {
        summaryMap[url] = { url, successCount: 0, failureCount: 0 };
      }
      res.status === "success"
        ? summaryMap[url].successCount++
        : summaryMap[url].failureCount++;
    });

    // Build summary array with success/failure percentages
    const summaryMetrics = Object.values(summaryMap).map((entry) => {
      const total = entry.successCount + entry.failureCount;
      return {
        ...entry,
        successRate: Math.round((entry.successCount / total) * 100),
        failureRate: Math.round((entry.failureCount / total) * 100),
      };
    });

    // Final response
    return res.status(200).json({
      summaryMetrics,
      detailedResults: allResults,
    });

  } catch (error) {
    console.error("Simulation error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { handleApiRequests };
