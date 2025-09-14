import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const OnlineBuyPage = ({ cartItems, setCartItems }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 0,
    totalPages: 0,
    pageSize: 5, // Changed to match your backend default
    totalItems: 0,
    hasNext: false,
    hasPrevious: false,
  });
  const [sortBy, setSortBy] = useState("itemId");
  const [sortDirection, setSortDirection] = useState("asc");

  const fetchProducts = async (
    page = 0,
    size = 5, // Changed to match your dropdown
    sort = "itemId",
    direction = "asc"
  ) => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:8081/api/v1/item/item-list",
        {
          params: {
            page: page,
            size: size,
            sortBy: sort,
            sortDirection: direction,
          },
        }
      );

      console.log("Full API Response:", response.data); // Debug log

      if (response.data.code === 200) {
        const data = response.data.data;
        console.log("Pagination Data:", data); // Debug log

        setProducts(data.dataList || []);

        // Handle both possible response structures
        setPagination({
          currentPage: data.currentPage ?? page,
          totalPages: data.totalPages ?? Math.ceil(data.dataCount / size),
          pageSize: data.pageSize ?? size,
          totalItems: data.dataCount ?? 0,
          hasNext: data.hasNext ?? (page + 1) * size < data.dataCount,
          hasPrevious: data.hasPrevious ?? page > 0,
        });
      } else {
        console.error("Error fetching products:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Debug: Log pagination state
  useEffect(() => {
    console.log("Current Pagination State:", pagination);
  }, [pagination]);

  const addToCart = (product) => {
    const existingItem = cartItems.find(
      (item) => item.itemId === product.itemId
    );
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.itemId === product.itemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < pagination.totalPages) {
      fetchProducts(newPage, pagination.pageSize, sortBy, sortDirection);
    }
  };

  const handleSortChange = (newSortBy, newDirection) => {
    setSortBy(newSortBy);
    setSortDirection(newDirection);
    fetchProducts(0, pagination.pageSize, newSortBy, newDirection);
  };

  const handlePageSizeChange = (newSize) => {
    fetchProducts(0, newSize, sortBy, sortDirection);
  };

  return (
    <div className="p-8">
      <div className="mb-6 text-center">
        <h1 className="text-4xl font-bold">Online Buy</h1>
        <p className="mt-2 text-gray-600">
          Showing {products.length} of {pagination.totalItems} products
        </p>
      </div>
      {/* Controls Section */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        {/* Sort Controls */}
        <div className="flex items-center gap-4">
          <label className="font-medium">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value, sortDirection)}
            className="px-3 py-2 border border-gray-300 rounded"
          >
            <option value="itemId">ID</option>
            <option value="itemName">Name</option>
            <option value="itemPrice">Price</option>
            <option value="stockQuantity">Stock</option>
          </select>

          <select
            value={sortDirection}
            onChange={(e) => handleSortChange(sortBy, e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        {/* Page Size Controls */}
        <div className="flex items-center gap-2">
          <label className="font-medium">Items per page:</label>
          <select
            value={pagination.pageSize}
            onChange={(e) => handlePageSizeChange(parseInt(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded"
          >
            <option value={2}>2</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="py-8 text-center">
          <div className="inline-block w-8 h-8 border-b-2 border-blue-600 rounded-full animate-spin"></div>
          <p className="mt-2 text-gray-600">Loading products...</p>
        </div>
      )}

      {/* Products Grid */}
      {!loading && (
        <div className="grid grid-cols-1 gap-6 mt-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((item) => (
            <ProductCard
              key={item.itemId}
              imageUrl={item.imageUrl}
              productName={item.itemName}
              price={item.itemPrice}
              addToCart={() => addToCart(item)}
              stockQuantity={item.stockQuantity}
            />
          ))}
        </div>
      )}

      {/* No Products Message */}
      {!loading && products.length === 0 && (
        <div className="py-8 text-center">
          <p className="text-lg text-gray-600">No products found.</p>
        </div>
      )}

      {/* Pagination Controls - Modified condition */}
      {!loading && pagination.totalItems > pagination.pageSize && (
        <div className="flex flex-col items-center mt-8 space-y-4">
          {/* Page Info */}
          <div className="text-sm text-gray-600">
            Page {pagination.currentPage + 1} of{" "}
            {Math.max(1, pagination.totalPages)}
          </div>

          {/* Pagination Buttons */}
          <div className="flex items-center space-x-2">
            {/* First Page */}
            <button
              onClick={() => handlePageChange(0)}
              disabled={pagination.currentPage === 0}
              className={`px-3 py-2 rounded ${
                pagination.currentPage === 0
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              First
            </button>

            {/* Previous Page */}
            <button
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 0}
              className={`px-3 py-2 rounded ${
                pagination.currentPage === 0
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Previous
            </button>

            {/* Page Numbers */}
            {Array.from(
              { length: Math.min(5, Math.max(1, pagination.totalPages)) },
              (_, i) => {
                const startPage = Math.max(0, pagination.currentPage - 2);
                const pageNum = startPage + i;
                const totalPages = Math.max(1, pagination.totalPages);

                if (pageNum >= totalPages) return null;

                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-3 py-2 rounded ${
                      pageNum === pagination.currentPage
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {pageNum + 1}
                  </button>
                );
              }
            )}

            {/* Next Page */}
            <button
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage >= pagination.totalPages - 1}
              className={`px-3 py-2 rounded ${
                pagination.currentPage >= pagination.totalPages - 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Next
            </button>

            {/* Last Page */}
            <button
              onClick={() =>
                handlePageChange(Math.max(0, pagination.totalPages - 1))
              }
              disabled={pagination.currentPage >= pagination.totalPages - 1}
              className={`px-3 py-2 rounded ${
                pagination.currentPage >= pagination.totalPages - 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Last
            </button>
          </div>

          {/* Mobile Pagination (simplified) */}
          <div className="flex items-center space-x-2 md:hidden">
            <button
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 0}
              className={`px-4 py-2 rounded ${
                pagination.currentPage === 0
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              ← Prev
            </button>

            <span className="px-4 py-2 bg-gray-100 rounded">
              {pagination.currentPage + 1} /{" "}
              {Math.max(1, pagination.totalPages)}
            </span>

            <button
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage >= pagination.totalPages - 1}
              className={`px-4 py-2 rounded ${
                pagination.currentPage >= pagination.totalPages - 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Next →
            </button>
          </div>
        </div>
      )}

      {/* Force show pagination for testing - Remove this in production */}
      {/* <div className="p-4 mt-8 bg-green-100 border border-green-300 rounded">
        <h3 className="mb-2 font-bold">Force Pagination (Test):</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() =>
              handlePageChange(Math.max(0, pagination.currentPage - 1))
            }
            className="px-3 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Previous
          </button>
          <span className="px-3 py-2 bg-gray-200 rounded">
            Page {pagination.currentPage + 1}
          </span>
          <button
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            className="px-3 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Next
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default OnlineBuyPage;
