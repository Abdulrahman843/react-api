// src/routes/AppRoutes.jsx

import { BrowserRouter, Routes, Route } from "react-router-dom";
import ApiKeyPage from "../pages/ApiKeyPage";
import DashboardPage from "../pages/DashboardPage";

/**
 * App Routes
 * Defines client-side routes for the application using React Router.
 * Part of the "Route" layer in MVR architecture.
 */
const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<ApiKeyPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
