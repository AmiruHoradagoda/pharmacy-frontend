import api from "./apiConfig";

export const productService = {
  // Get all products with pagination
  getProducts: async (
    page = 0,
    size = 5,
    sortBy = "itemId",
    sortDirection = "asc"
  ) => {
    try {
      const response = await api.get("/item/item-list", {
        params: {
          page,
          size,
          sortBy,
          sortDirection,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },

  // Get product by ID
  getProductById: async (id) => {
    try {
      const response = await api.get(`/item/by-id/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching product by ID:", error);
      throw error;
    }
  },

  // Create new product
  createProduct: async (productData) => {
    try {
      console.log("Creating product with data:", productData);
      const response = await api.post("/item/save", productData);
      return response.data;
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  },

  // Update existing product
  updateProduct: async (id, productData) => {
    try {
      console.log("Updating product with ID:", id, "Data:", productData);
      const response = await api.put(`/item/${id}`, productData);
      return response.data;
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  },

  // Delete product
  deleteProduct: async (id) => {
    try {
      console.log("Deleting product with ID:", id);
      const response = await api.delete(`/item/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  },
};
