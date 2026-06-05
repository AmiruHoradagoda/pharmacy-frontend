import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const OnlineBuyPage = ({ cartItems, setCartItems }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 0,
    totalPages: 0,
    pageSize: 3, // Changed to match your backend default
    totalItems: 0,
    hasNext: false,
    hasPrevious: false,
  });
  const [sortBy, setSortBy] = useState("itemId");
  const [sortDirection, setSortDirection] = useState("asc");

  // UI state for search and product dialog
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setDialogOpen(true);
  };

  const filteredProducts = products.filter((p) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    return (
      (p.itemName && p.itemName.toLowerCase().includes(q)) ||
      (p.description && p.description.toLowerCase().includes(q)) ||
      (p.category && p.category.toLowerCase().includes(q))
    );
  });

  const fetchProducts = async (
    page = 0,
    size = 3, 
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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-3">All Products</h1>
          <p className="text-muted-foreground text-lg">
            Browse our complete range of healthcare products
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35"
              />
            </svg>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPagination((p) => ({ ...p, currentPage: 0 }));
              }}
              className="pl-10 border rounded w-full px-3 py-2"
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Showing {filteredProducts.length} of {pagination.totalItems}{" "}
            products
          </p>
        </div>

        {/* Controls Section */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
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

          <div className="flex items-center gap-2">
            <label className="font-medium">Items per page:</label>
            <select
              value={pagination.pageSize}
              onChange={(e) => handlePageSizeChange(parseInt(e.target.value))}
              className="px-3 py-2 border border-gray-300 rounded"
            >
              <option value={3}>3</option>
              <option value={6}>6</option>
              <option value={9}>9</option>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8 auto-rows-fr">
            {filteredProducts.map((item) => (
              <div
                key={item.itemId}
                onClick={() => handleProductClick(item)}
                className="cursor-pointer h-full"
              >
                <ProductCard
                  imageUrl={item.imageUrl}
                  productName={item.itemName}
                  description={item.description || item.itemDetails}
                  price={item.itemPrice}
                  originalPrice={item.originalPrice}
                  rating={item.rating}
                  reviews={item.reviews}
                  addToCart={() => addToCart(item)}
                  stockQuantity={item.stockQuantity}
                />
              </div>
            ))}
          </div>
        )}

        {/* No Products Message */}
        {!loading && products.length === 0 && (
          <div className="py-8 text-center">
            <p className="text-lg text-gray-600">No products found.</p>
          </div>
        )}

        {/* Pagination Controls */}
        {!loading && pagination.totalItems > pagination.pageSize && (
          <div className="flex items-center justify-center gap-2">
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

            <span className="px-3 py-2 bg-gray-100 rounded">
              Page {pagination.currentPage + 1} of{" "}
              {Math.max(1, pagination.totalPages)}
            </span>

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
          </div>
        )}
      </div>

      {/* Product Details Modal */}
      {dialogOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="flex justify-between items-start p-4 border-b">
              <h3 className="text-xl font-bold">{selectedProduct.itemName}</h3>
              <button
                onClick={() => setDialogOpen(false)}
                className="text-gray-500"
              >
                Close
              </button>
            </div>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <img
                src={selectedProduct.imageUrl}
                alt={selectedProduct.itemName}
                className="w-full h-64 object-cover rounded"
              />
              <div>
                <p className="text-gray-700 mb-2">
                  {selectedProduct.description || selectedProduct.itemDetails}
                </p>
                <p className="font-bold text-2xl mb-4">
                  ${selectedProduct.itemPrice?.toFixed(2)}
                </p>
                <button
                  onClick={() => {
                    addToCart(selectedProduct);
                    setDialogOpen(false);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OnlineBuyPage;
