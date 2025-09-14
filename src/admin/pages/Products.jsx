// src/admin/pages/Products.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  uploadProductImage,
  deleteProductImage,
} from "../../firebase/storageUtils";
import { productService } from "../../api/productService";

const Products = () => {
  const navigate = useNavigate();
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
  const [uploadProgress, setUploadProgress] = useState(0);

  // Form state matching your entity exactly
  const [formData, setFormData] = useState({
    itemName: "",
    activeState: true,
    stockQuantity: 0,
    itemPrice: 0.0,
    imageUrl: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Check if user is admin
  const isUserAdmin = () => {
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const userData = JSON.parse(user);
        return userData.role?.roleName === "Admin";
      } catch (error) {
        console.error("Error parsing user data:", error);
        return false;
      }
    }
    return false;
  };

  // Check authentication on component mount
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      alert("Please login to access this page.");
      navigate("/login");
      return;
    }

    if (!isUserAdmin()) {
      alert("Access denied. Admin privileges required.");
      navigate("/login");
      return;
    }

    fetchProducts();
  }, [navigate]);

  // Fetch products using API service
  const fetchProducts = async (page = 0) => {
    setLoading(true);
    try {
      const response = await productService.getProducts(
        page,
        pageSize,
        "itemId",
        "asc"
      );

      if (response.code === 200) {
        setProducts(
          Array.isArray(response.data.dataList) ? response.data.dataList : []
        );
        setTotalPages(response.data.totalPages || 0);
        setCurrentPage(page);
      } else {
        console.error("Failed to fetch products:", response.message);
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);

      // The interceptor will handle 401 errors automatically
      if (error.response?.status !== 401) {
        alert("Failed to fetch products. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

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
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }

      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size must be less than 5MB");
        return;
      }

      setImageFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Upload image to Firebase
  const uploadImageToFirebase = async (file, productName) => {
    try {
      setUploading(true);
      setUploadProgress(0);

      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 90));
      }, 200);

      const result = await uploadProductImage(file, productName);

      clearInterval(progressInterval);
      setUploadProgress(100);

      setTimeout(() => {
        setUploading(false);
        setUploadProgress(0);
      }, 500);

      return result.url;
    } catch (error) {
      setUploading(false);
      setUploadProgress(0);
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
    setImagePreview(null);
  };

  // Add new product using API service
  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!formData.itemName.trim()) {
      alert("Product name is required");
      return;
    }

    setLoading(true);

    try {
      let finalImageUrl = "";

      // Upload image if selected
      if (imageFile) {
        finalImageUrl = await uploadImageToFirebase(
          imageFile,
          formData.itemName
        );
      }

      const submitData = {
        itemName: formData.itemName.trim(),
        activeState: formData.activeState,
        stockQuantity: formData.stockQuantity,
        itemPrice: formData.itemPrice,
        imageUrl: finalImageUrl,
      };

      console.log("Submitting product data:", submitData);

      // Use API service instead of direct fetch
      const data = await productService.createProduct(submitData);

      if (data.code === 201) {
        setShowAddDialog(false);
        resetForm();
        fetchProducts(currentPage);
        alert("Product added successfully!");
      } else {
        // If product save failed but image was uploaded, delete the image
        if (finalImageUrl) {
          await deleteProductImage(finalImageUrl);
        }
        alert("Failed to add product: " + (data.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error adding product:", error);

      // The interceptor handles 401 automatically, so we don't need to check for it
      if (error.response?.status !== 401) {
        alert(
          "Error adding product: " +
            (error.response?.data?.message || error.message)
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // Edit product using API service
  const handleEditProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let finalImageUrl = formData.imageUrl;
      const oldImageUrl = selectedProduct.imageUrl;

      // Upload new image if selected
      if (imageFile) {
        finalImageUrl = await uploadImageToFirebase(
          imageFile,
          formData.itemName
        );
      }

      const submitData = {
        itemName: formData.itemName.trim(),
        activeState: formData.activeState,
        stockQuantity: formData.stockQuantity,
        itemPrice: formData.itemPrice,
        imageUrl: finalImageUrl,
      };

      // Use API service
      const data = await productService.updateProduct(
        selectedProduct.itemId,
        submitData
      );

      if (data.code === 200) {
        // If update successful and we uploaded a new image, delete the old one
        if (imageFile && oldImageUrl && oldImageUrl !== finalImageUrl) {
          await deleteProductImage(oldImageUrl);
        }

        setShowEditDialog(false);
        setSelectedProduct(null);
        resetForm();
        fetchProducts(currentPage);
        alert("Product updated successfully!");
      } else {
        // If update failed but new image was uploaded, delete it
        if (imageFile && finalImageUrl !== oldImageUrl) {
          await deleteProductImage(finalImageUrl);
        }
        alert("Failed to update product: " + (data.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error updating product:", error);

      if (error.response?.status !== 401) {
        alert(
          "Error updating product: " +
            (error.response?.data?.message || error.message)
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // Delete product using API service
  const handleDeleteProduct = async () => {
    setLoading(true);

    try {
      // Use API service
      const data = await productService.deleteProduct(selectedProduct.itemId);

      if (data.code === 200) {
        // Delete associated image from Firebase
        if (selectedProduct.imageUrl) {
          await deleteProductImage(selectedProduct.imageUrl);
        }

        setShowDeleteDialog(false);
        setSelectedProduct(null);
        fetchProducts(currentPage);
        alert("Product deleted successfully!");
      } else {
        alert("Failed to delete product: " + (data.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error deleting product:", error);

      if (error.response?.status !== 401) {
        alert(
          "Error deleting product: " +
            (error.response?.data?.message || error.message)
        );
      }
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
    setImagePreview(product.imageUrl || null);
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
        <p className="mt-1 text-xs text-gray-500">
          Supported formats: JPG, PNG, GIF. Max size: 5MB
        </p>

        {/* Image Preview */}
        {(imagePreview || formData.imageUrl) && (
          <div className="mt-2">
            <img
              src={imagePreview || formData.imageUrl}
              alt="Preview"
              className="object-cover w-32 h-32 border rounded-md"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </div>
        )}

        {/* Upload Progress */}
        {uploading && (
          <div className="mt-2">
            <div className="w-full h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 transition-all duration-300 bg-blue-600 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Uploading... {uploadProgress}%
            </p>
          </div>
        )}
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
            ? `Uploading... ${uploadProgress}%`
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
          onClick={() => {
            resetForm();
            setShowAddDialog(true);
          }}
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
                          className="object-cover w-12 h-12 border rounded-md"
                          onError={(e) => {
                            e.target.src =
                              "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMCAxNkMyMS4xIDI2IDIyIDI2IDIyIDI3QzIyIDI4IDIxLjEgMjggMjAgMjhDMTguOSAyOCAxOCAyOCAxOCAyN0MxOCAyNiAxOC45IDI2IDIwIDI2VjE2WiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K";
                          }}
                        />
                      ) : (
                        <div className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-md">
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
                      $
                      {product.itemPrice
                        ? product.itemPrice.toFixed(2)
                        : "0.00"}
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
              onClick={() => !uploading && setShowAddDialog(false)}
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
                  if (!uploading) {
                    setShowAddDialog(false);
                    resetForm();
                  }
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
              onClick={() => !uploading && setShowEditDialog(false)}
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
                  if (!uploading) {
                    setShowEditDialog(false);
                    setSelectedProduct(null);
                    resetForm();
                  }
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
                  This action cannot be undone and will also delete the
                  associated image.
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
