// src/api/orderService.js
import api from "./apiConfig";

export const orderService = {
  // Get all orders with pagination
  getAllOrders: async (
    page = 0,
    size = 10,
    sortBy = "orderId",
    sortDirection = "desc"
  ) => {
    try {
      const response = await api.get("/order/getAllOrders", {
        params: {
          page,
          size,
          sortBy,
          sortDirection,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  },

  // Get order by ID
  getOrderById: async (id) => {
    try {
      const response = await api.get(`/order/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching order by ID:", error);
      throw error;
    }
  },

  // Create new order
  createOrder: async (orderData) => {
    try {
      console.log("Creating order with data:", orderData);
      const response = await api.post("/order", orderData);
      return response.data;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  },

  // Update existing order
  updateOrder: async (id, orderData) => {
    try {
      console.log("Updating order with ID:", id, "Data:", orderData);
      const response = await api.put(`/order/${id}`, orderData);
      return response.data;
    } catch (error) {
      console.error("Error updating order:", error);
      throw error;
    }
  },

  // Update order status
  updateOrderStatus: async (id, status) => {
    try {
      console.log("Updating order status - ID:", id, "Status:", status);
      // Send status as a JSON string (not wrapped in object) for direct enum binding
      const response = await api.put(
        `/order/changeOrderStatus/${id}`,
        `"${status}"`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating order status:", error);
      throw error;
    }
  },

  // Delete order
  deleteOrder: async (id) => {
    try {
      console.log("Deleting order with ID:", id);
      const response = await api.delete(`/order/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting order:", error);
      throw error;
    }
  },

  // Get orders by customer ID
  getOrdersByCustomer: async (customerId, page = 0, size = 10) => {
    try {
      const response = await api.get(`/order/customer/${customerId}`, {
        params: { page, size },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching orders by customer:", error);
      throw error;
    }
  },

  // Get orders by status
  getOrdersByStatus: async (status, page = 0, size = 10) => {
    try {
      const response = await api.get("/order/getAllOrders", {
        params: {
          page,
          size,
          status,
          sortBy: "orderId",
          sortDirection: "desc",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching orders by status:", error);
      throw error;
    }
  },
};
