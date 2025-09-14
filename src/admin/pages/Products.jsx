// src/admin/pages/Products.jsx
import React, { useState, useEffect } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize] = useState(10);
  const [uploading, setUploading] = useState(false);

  // Form state matching your entity exactly
  const [formData, setFormData] = useState({
    itemName: "",
    activeState: false,
    stockQuantity: 0,
    itemPrice: 0.0,
    imageUrl: "",
  });

  const [imageFile, setImageFile] = useState(null);

  const API_BASE_URL = "http://localhost:8081/api/v1/item";

  // Fetch products from API
  const fetchProducts = async (page = 0) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/item-list?page=${page}&size=${pageSize}&sortBy=itemId&sortDirection=asc`
      );
      const res = await response.json();

      if (res.code === 200) {
        setProducts(Array.isArray(res.data.dataList) ? res.data.dataList : []);
        setTotalPages(res.data.totalPages || 0);
        setCurrentPage(page);
      } else {
        console.error("Failed to fetch products:", res.message);
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? name === "itemPrice"
            ? parseFloat(value) || 0
            : parseInt(value) || 0
          : value,
    }));
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData((prev) => ({
          ...prev,
          imageUrl: e.target.result, // Temporary preview URL
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Firebase image upload function (placeholder - you need to implement Firebase config)
  const uploadImageToFirebase = async (file) => {
    try {
      setUploading(true);

      // TODO: Implement actual Firebase upload
      // For now, simulate upload and return placeholder URL
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate upload delay

      // Replace this with actual Firebase upload logic
      const downloadURL = `https://firebasestorage.googleapis.com/v0/b/your-project/o/products%2F${Date.now()}_${
        file.name
      }?alt=media`;

      setUploading(false);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploading(false);
      throw error;
    }
  };

  // Reset form data
  const resetForm = () => {
    setFormData({
      itemName: "",
      activeState: false,
      stockQuantity: 0,
      itemPrice: 0.0,
      imageUrl: "",
    });
    setImageFile(null);
  };

  // Add new product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let finalImageUrl = formData.imageUrl;

      // Upload image if selected
      if (imageFile) {
        finalImageUrl = await uploadImageToFirebase(imageFile);
      }

      const submitData = {
        itemName: formData.itemName,
        activeState: formData.activeState,
        stockQuantity: formData.stockQuantity,
        itemPrice: formData.itemPrice,
        imageUrl: finalImageUrl || "", // Ensure imageUrl is not null
      };

      const response = await fetch(`${API_BASE_URL}/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      const data = await response.json();

      if (response.ok && data.code === 201) {
        setShowAddDialog(false);
        resetForm();
        fetchProducts(currentPage);
        alert("Product added successfully!");
      } else {
        alert("Failed to add product: " + (data.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error adding product: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Edit product
  const handleEditProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let finalImageUrl = formData.imageUrl;

      // Upload new image if selected
      if (imageFile) {
        finalImageUrl = await uploadImageToFirebase(imageFile);
      }

      const submitData = {
        itemName: formData.itemName,
        activeState: formData.activeState,
        stockQuantity: formData.stockQuantity,
        itemPrice: formData.itemPrice,
        imageUrl: finalImageUrl,
      };

      const response = await fetch(
        `${API_BASE_URL}/${selectedProduct.itemId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submitData),
        }
      );

      if (response.ok) {
        setShowEditDialog(false);
        setSelectedProduct(null);
        resetForm();
        fetchProducts(currentPage);
        alert("Product updated successfully!");
      } else {
        alert("Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Error updating product: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete product
  const handleDeleteProduct = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/${selectedProduct.itemId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (response.ok && data.code === 200) {
        setShowDeleteDialog(false);
        setSelectedProduct(null);
        fetchProducts(currentPage);
        alert("Product deleted successfully!");
      } else {
        alert("Failed to delete product: " + (data.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error deleting product");
    } finally {
      setLoading(false);
    }
  };

  // Open edit dialog
  const openEditDialog = (product) => {
    setSelectedProduct(product);
    setFormData({
      itemName: product.itemName || "",
      activeState: product.activeState || false,
      stockQuantity: product.stockQuantity || 0,
      itemPrice: product.itemPrice || 0.0,
      imageUrl: product.imageUrl || "",
    });
    setImageFile(null);
    setShowEditDialog(true);
  };

  // Open delete dialog
  const openDeleteDialog = (product) => {
    setSelectedProduct(product);
    setShowDeleteDialog(true);
  };

  // Get status based on stock and active state
  const getStatus = (product) => {
    if (!product.activeState) return "Inactive";
    if (product.stockQuantity <= 5) return "Low Stock";
    return "Active";
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "text-green-600 bg-green-100";
      case "Low Stock":
        return "text-yellow-600 bg-yellow-100";
      case "Inactive":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  // Product Form Component
  const ProductForm = ({ isEdit, onSubmit, onCancel }) => (
    <form onSubmit={onSubmit} className="px-6 py-4 space-y-4">
      {/* Item Name */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Product Name *
        </label>
        <input
          type="text"
          name="itemName"
          value={formData.itemName}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          placeholder="Enter product name"
        />
      </div>

      {/* Stock Quantity */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Stock Quantity *
        </label>
        <input
          type="number"
          name="stockQuantity"
          value={formData.stockQuantity}
          onChange={handleInputChange}
          min="0"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          placeholder="Enter stock quantity"
        />
      </div>

      {/* Item Price */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Price *
        </label>
        <input
          type="number"
          name="itemPrice"
          value={formData.itemPrice}
          onChange={handleInputChange}
          min="0"
          step="0.01"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          placeholder="Enter price"
        />
      </div>

      {/* Active State */}
      <div>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="activeState"
            checked={formData.activeState}
            onChange={handleInputChange}
            className="text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-gray-700">
            Active Product
          </span>
        </label>
      </div>

      {/* Image Upload */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Product Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {formData.imageUrl && (
          <div className="mt-2">
            <img
              src={formData.imageUrl}
              alt="Preview"
              className="object-cover w-20 h-20 border rounded-md"
            />
          </div>
        )}
      </div>

      {/* Image URL Display */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Image URL
        </label>
        <input
          type="text"
          name="imageUrl"
          value={formData.imageUrl}
          readOnly
          className="w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-md bg-gray-50"
          placeholder="Image URL (auto-filled after upload)"
        />
      </div>

      {/* Submit Buttons */}
      <div className="flex justify-end pt-4 space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
          disabled={loading || uploading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
          disabled={loading || uploading}
        >
          {uploading
            ? "Uploading..."
            : loading
            ? isEdit
              ? "Updating..."
              : "Adding..."
            : isEdit
            ? "Update Product"
            : "Add Product"}
        </button>
      </div>
    </form>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-800">Products</h3>
        <button
          onClick={() => setShowAddDialog(true)}
          className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          disabled={loading}
        >
          Add Product
        </button>
      </div>

      {loading && (
        <div className="flex justify-center py-8">
          <div className="w-8 h-8 border-b-2 border-blue-600 rounded-full animate-spin"></div>
        </div>
      )}

      <div className="bg-white border rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                  Product
                </th>
                <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                  Image
                </th>
                <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                  Stock
                </th>
                <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                  Price
                </th>
                <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {Array.isArray(products) && products.length > 0 ? (
                products.map((product) => (
                  <tr key={product.itemId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                      {product.itemName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {product.imageUrl ? (
                        <img
                          src={product.imageUrl}
                          alt={product.itemName}
                          className="object-cover w-10 h-10 rounded-md"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-md">
                          <span className="text-xs text-gray-500">
                            No image
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                      {product.stockQuantity}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                      ${product.itemPrice.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          getStatus(product)
                        )}`}
                      >
                        {getStatus(product)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                      <button
                        onClick={() => openEditDialog(product)}
                        className="mr-4 text-blue-600 hover:text-blue-900"
                        disabled={loading}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => openDeleteDialog(product)}
                        className="text-red-600 hover:text-red-900"
                        disabled={loading}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    {loading ? "Loading products..." : "No products found"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <button
                onClick={() => fetchProducts(currentPage - 1)}
                disabled={currentPage === 0 || loading}
                className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              <div className="flex space-x-2">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => fetchProducts(index)}
                    disabled={loading}
                    className={`px-3 py-2 text-sm font-medium rounded-md ${
                      currentPage === index
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => fetchProducts(currentPage + 1)}
                disabled={currentPage >= totalPages - 1 || loading}
                className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add Dialog */}
      {showAddDialog && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75"
              onClick={() => setShowAddDialog(false)}
            ></div>
            <div className="relative w-full max-w-md bg-white rounded-lg shadow-xl">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Add New Product
                </h3>
              </div>
              <ProductForm
                isEdit={false}
                onSubmit={handleAddProduct}
                onCancel={() => {
                  setShowAddDialog(false);
                  resetForm();
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Edit Dialog */}
      {showEditDialog && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75"
              onClick={() => setShowEditDialog(false)}
            ></div>
            <div className="relative w-full max-w-md bg-white rounded-lg shadow-xl">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Edit Product
                </h3>
              </div>
              <ProductForm
                isEdit={true}
                onSubmit={handleEditProduct}
                onCancel={() => {
                  setShowEditDialog(false);
                  setSelectedProduct(null);
                  resetForm();
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Delete Dialog */}
      {showDeleteDialog && selectedProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75"
              onClick={() => setShowDeleteDialog(false)}
            ></div>
            <div className="relative w-full max-w-md bg-white rounded-lg shadow-xl">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Delete Product
                </h3>
              </div>

              <div className="px-6 py-4">
                <p className="text-gray-700">
                  Are you sure you want to delete "{selectedProduct.itemName}"?
                  This action cannot be undone.
                </p>
              </div>

              <div className="flex justify-end px-6 py-4 space-x-3 border-t border-gray-200">
                <button
                  onClick={() => setShowDeleteDialog(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteProduct}
                  className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
