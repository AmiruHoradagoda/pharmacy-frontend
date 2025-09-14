// src/api/apiConfig.js
import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: "http://localhost:8081/api/v1",
  timeout: 10000,
});

// Request interceptor to add JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwtToken");

    console.log("=== API INTERCEPTOR DEBUG ===");
    console.log("Request URL:", config.url);
    console.log("Request Method:", config.method);
    console.log("Token exists:", !!token);
    console.log("============================");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle authentication errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log("=== RESPONSE INTERCEPTOR ===");
    console.log("Error status:", error.response?.status);
    console.log("Error data:", error.response?.data);
    console.log("===========================");

    if (error.response?.status === 401) {
      // Token expired or invalid
      console.warn("Authentication failed - clearing tokens");
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("user");

      // Redirect to login page
      window.location.href = "/login";
    } else if (error.response?.status === 403) {
      alert(
        "Access denied. You do not have permission to perform this action."
      );
    }

    return Promise.reject(error);
  }
);

export default api;
