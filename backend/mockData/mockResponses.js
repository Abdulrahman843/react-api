// backend/mockData/mockResponses.js

/**
 * Generates a mock API response for a given URL.
 * Adds random values to mimic real ISP data, IPs, and proxy behavior.
 *
 * @param {string} url - The URL being requested
 * @returns {Object} - Simulated API response object
 */
function generateMockResponse(url) {
    const isSuccess = Math.random() > 0.2; // 80% success rate
    const ispOptions = ["MTN Nigeria", "GLO Nigeria", "Airtel", "9mobile"];
    const proxyOptions = ["None", "Detected Proxy", "VPN Proxy", "Tor Exit Node"];
  
    return {
      url,
      isp: ispOptions[Math.floor(Math.random() * ispOptions.length)],
      ipAddress: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      proxy: isSuccess ? "None" : proxyOptions[Math.floor(Math.random() * proxyOptions.length)],
      status: isSuccess ? "success" : "failure"
    };
  }
  
  module.exports = { generateMockResponse };
  