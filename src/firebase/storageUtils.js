// src/firebase/storageUtils.js
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "./config";

/**
 * Upload product image to Firebase Storage
 * @param {File} file - The image file to upload
 * @param {string} productName - Product name for folder organization
 * @returns {Promise<{url: string, path: string}>} - Download URL and storage path
 */
export const uploadProductImage = async (file, productName = "") => {
  try {
    // Debug: Log storage configuration
    console.log("Firebase Storage instance:", storage);
    console.log("Storage bucket:", storage.app.options.storageBucket);

    // Validate file
    if (!file) {
      throw new Error("No file provided");
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      throw new Error("File must be an image");
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      throw new Error("Image size must be less than 5MB");
    }

    // Create unique filename
    const timestamp = Date.now();
    const sanitizedProductName = productName
      .replace(/[^a-zA-Z0-9]/g, "_")
      .toLowerCase();
    const fileExtension = file.name.split(".").pop();
    const fileName = `${timestamp}_${sanitizedProductName}_${Math.random()
      .toString(36)
      .substring(7)}.${fileExtension}`;

    // Create storage reference
    const storageRef = ref(storage, `products/${fileName}`);

    // Set metadata
    const metadata = {
      contentType: file.type,
      customMetadata: {
        uploadedAt: new Date().toISOString(),
        productName: productName,
      },
    };

    // Upload file
    console.log("Uploading image to Firebase Storage...");
    const snapshot = await uploadBytes(storageRef, file, metadata);

    // Get download URL
    const downloadURL = await getDownloadURL(snapshot.ref);

    console.log("Image uploaded successfully:", downloadURL);

    return {
      url: downloadURL,
      path: `pharmacy-products/${fileName}`,
      fileName: fileName,
    };
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error(`Image upload failed: ${error.message}`);
  }
};

/**
 * Delete image from Firebase Storage
 * @param {string} imagePath - Storage path of the image to delete
 * @returns {Promise<boolean>} - Success status
 */
export const deleteProductImage = async (imagePath) => {
  try {
    if (!imagePath) {
      console.warn("No image path provided for deletion");
      return false;
    }

    // Extract path from URL if full URL is provided
    let pathToDelete = imagePath;
    if (imagePath.includes("firebase")) {
      // Extract path from Firebase URL
      const urlParts = imagePath.split("/o/")[1];
      if (urlParts) {
        pathToDelete = decodeURIComponent(urlParts.split("?")[0]);
      }
    }

    const storageRef = ref(storage, pathToDelete);
    await deleteObject(storageRef);

    console.log("Image deleted successfully");
    return true;
  } catch (error) {
    console.error("Error deleting image:", error);
    return false;
  }
};

/**
 * Get optimized image URL with query parameters
 * @param {string} imageUrl - Original Firebase Storage URL
 * @param {Object} options - Optimization options
 * @returns {string} - Optimized image URL
 */
export const getOptimizedImageUrl = (imageUrl, options = {}) => {
  if (!imageUrl || !imageUrl.includes("firebase")) {
    return imageUrl;
  }

  const { width, height, quality = 80 } = options;
  let optimizedUrl = imageUrl;

  // Add transformation parameters if supported by your setup
  const params = new URLSearchParams();
  if (width) params.append("w", width);
  if (height) params.append("h", height);
  if (quality !== 80) params.append("q", quality);

  if (params.toString()) {
    const separator = imageUrl.includes("?") ? "&" : "?";
    optimizedUrl = `${imageUrl}${separator}${params.toString()}`;
  }

  return optimizedUrl;
};
