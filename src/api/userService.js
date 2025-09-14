// src/api/userService.js
import api from "./apiConfig";

export const userService = {
  // Get all users with pagination
  getAllUsers: async (
    page = 0,
    size = 10,
    sortBy = "userId",
    sortDirection = "desc"
  ) => {
    try {
      const response = await api.get("/user/getAllUsers", {
        params: {
          page,
          size,
          sortBy,
          sortDirection,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },

  // Get user by ID
  getUserById: async (id) => {
    try {
      const response = await api.get(`/user/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      throw error;
    }
  },

  // Create new user
  createUser: async (userData) => {
    try {
      console.log("Creating user with data:", userData);
      const response = await api.post("/user", userData);
      return response.data;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },

  // Update existing user
  updateUser: async (id, userData) => {
    try {
      console.log("Updating user with ID:", id, "Data:", userData);
      const response = await api.put(`/user/${id}`, userData);
      return response.data;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  },

  // Delete user
  deleteUser: async (id) => {
    try {
      console.log("Deleting user with ID:", id);
      const response = await api.delete(`/user/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  },
};
