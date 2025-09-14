// src/api/dashboardService.js
import api from "./apiConfig";

export const dashboardService = {
  // Get dashboard statistics
  getDashboardStats: async () => {
    try {
      const response = await api.get("/dashboard/stats");
      return response.data;
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      throw error;
    }
  },

  // Get recent orders
  getRecentOrders: async (limit = 10) => {
    try {
      const response = await api.get("/dashboard/recent-orders", {
        params: { limit },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching recent orders:", error);
      throw error;
    }
  },

  // Get low stock items
  getLowStockItems: async (threshold = 5) => {
    try {
      const response = await api.get("/dashboard/low-stock", {
        params: { threshold },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching low stock items:", error);
      throw error;
    }
  },

  // Get sales overview
  getSalesOverview: async (days = 30) => {
    try {
      const response = await api.get("/dashboard/sales-overview", {
        params: { days },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching sales overview:", error);
      throw error;
    }
  },
  getAnnualSalesData: async (year) => {
    try {
      const response = await api.get("/dashboard/annual-sales", {
        params: { year },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching annual sales data:", error);
      throw error;
    }
  },
};
