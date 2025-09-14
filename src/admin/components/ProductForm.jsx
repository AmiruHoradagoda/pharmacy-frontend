import React, { useState, useEffect } from "react";

const ProductForm = ({ product = null, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    itemId: null,
    itemName: "",
    activeState: false,
    stockQuantity: 0,
    itemPrice: 0.0,
    imageUrl: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Initialize form data for editing
  useEffect(() => {
    if (product) {
      setFormData({
        itemId: product.itemId,
        itemName: product.itemName || "",
        activeState: product.activeState || false,
        stockQuantity: product.stockQuantity || 0,
        itemPrice: product.itemPrice || 0.0,
        imageUrl: product.imageUrl || "",
      });
    }
  }, [product]);

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Preview the image
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

  const uploadImageToFirebase = async (file) => {
    // TODO: Implement Firebase image upload
    // This is a placeholder for your Firebase upload logic
    try {
      setUploading(true);

      // Example Firebase upload (you'll need to implement this)
      // const storage = getStorage();
      // const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
      // const snapshot = await uploadBytes(storageRef, file);
      // const downloadURL = await getDownloadURL(snapshot.ref);

      // For now, return a placeholder URL
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let finalImageUrl = formData.imageUrl;

      // Upload new image if selected
      if (imageFile) {
        finalImageUrl = await uploadImageToFirebase(imageFile);
      }

      const submitData = {
        ...formData,
        imageUrl: finalImageUrl,
      };

      // Remove itemId for new products (backend will generate it)
      if (!product) {
        delete submitData.itemId;
      }

      onSubmit(submitData);
    } catch (error) {
      alert("Error uploading image. Please try again.");
    }
  };

  return (
    <div className="max-w-md p-6 mx-auto bg-white rounded-lg shadow-md">
      <h2 className="mb-6 text-2xl font-bold text-center">
        {product ? "Edit Product" : "Add New Product"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Item Name */}
        <div>
          <label
            htmlFor="itemName"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Product Name *
          </label>
          <input
            type="text"
            id="itemName"
            name="itemName"
            value={formData.itemName}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter product name"
          />
        </div>

        {/* Stock Quantity */}
        <div>
          <label
            htmlFor="stockQuantity"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Stock Quantity *
          </label>
          <input
            type="number"
            id="stockQuantity"
            name="stockQuantity"
            value={formData.stockQuantity}
            onChange={handleInputChange}
            required
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter stock quantity"
          />
        </div>

        {/* Item Price */}
        <div>
          <label
            htmlFor="itemPrice"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Price *
          </label>
          <input
            type="number"
            id="itemPrice"
            name="itemPrice"
            value={formData.itemPrice}
            onChange={handleInputChange}
            required
            min="0"
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          <label
            htmlFor="image"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Product Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formData.imageUrl && (
            <div className="mt-2">
              <img
                src={formData.imageUrl}
                alt="Preview"
                className="object-cover w-32 h-32 border rounded-md"
              />
            </div>
          )}
        </div>

        {/* Current Image URL (for reference) */}
        <div>
          <label
            htmlFor="imageUrl"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Image URL
          </label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
            placeholder="Image URL (auto-filled after upload)"
            readOnly
          />
        </div>

        {/* Submit Buttons */}
        <div className="flex pt-4 space-x-4">
          <button
            type="submit"
            disabled={uploading}
            className="flex-1 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading
              ? "Uploading..."
              : product
              ? "Update Product"
              : "Add Product"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-4 py-2 text-gray-700 bg-gray-300 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
