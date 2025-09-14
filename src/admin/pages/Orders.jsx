// src/admin/pages/Orders.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { orderService } from "../../api/orderService";

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(10); // Made mutable
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [filteredOrders, setFilteredOrders] = useState([]);

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

    fetchOrders();
  }, [navigate]);

  // Fetch orders using orderService
  const fetchOrders = async (page = 0, size = pageSize) => {
    setLoading(true);
    try {
      console.log("Fetching orders with axios...");

      const response = await orderService.getAllOrders(
        page,
        size,
        "orderId",
        "desc"
      );

      console.log("Full API Response:", response);

      if (response.code === 200) {
        const data = response.data;

        // Use dataList from your API response structure
        const orderList = Array.isArray(data.dataList) ? data.dataList : [];
        console.log("Setting orders:", orderList);
        setOrders(orderList);

        // Handle pagination like your other components
        const totalItems = data.dataCount || 0;
        const calculatedTotalPages =
          data.totalPages || Math.ceil(totalItems / size);

        setTotalPages(calculatedTotalPages);
        setCurrentPage(page);

        console.log("Total Items:", totalItems);
        console.log("Calculated Total Pages:", calculatedTotalPages);
      } else {
        console.error("Failed to fetch orders:", response.message);
        setOrders([]);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]);

      // Don't show alert for 401 errors as interceptor handles it
      if (error.response?.status !== 401) {
        alert("Failed to fetch orders. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle page size change
  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setCurrentPage(0);
    fetchOrders(0, newPageSize);
  };

  // Filter orders based on status (client-side filtering)
  useEffect(() => {
    if (statusFilter === "All Status") {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter(
        (order) => order.status === statusFilter.toUpperCase()
      );
      setFilteredOrders(filtered);
    }
  }, [orders, statusFilter]);

  const getStatusColor = (status) => {
    switch (status) {
      case "COMPLETED":
        return "text-green-600 bg-green-100";
      case "PROCESSING":
        return "text-blue-600 bg-blue-100";
      case "PENDING":
        return "text-yellow-600 bg-yellow-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const formatStatus = (status) => {
    return status.charAt(0) + status.slice(1).toLowerCase();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleExport = () => {
    // Implement export functionality
    alert("Export functionality to be implemented");
  };

  // Update order status
  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      setLoading(true);
      const response = await orderService.updateOrderStatus(orderId, newStatus);

      // Check for 201 status code as per your API
      if (response.code === 201) {
        // Refresh orders after status update
        fetchOrders(currentPage);
        alert("Order status updated successfully!");
      } else {
        alert(
          "Failed to update order status: " +
            (response.message || "Unknown error")
        );
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      if (error.response?.status !== 401) {
        alert(
          "Error updating order status: " +
            (error.response?.data?.message || error.message)
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-800">Orders</h3>
        <div className="flex space-x-3">
          <select
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={statusFilter}
            onChange={handleStatusFilter}
          >
            <option>All Status</option>
            <option>Pending</option>
            <option>Processing</option>
            <option>Completed</option>
          </select>
          <button
            className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            onClick={handleExport}
          >
            Export
          </button>
        </div>
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
                  Order ID
                </th>
                <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                  Customer
                </th>
                <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                  Date
                </th>
                <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                  Items
                </th>
                <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                  Total
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
              {Array.isArray(filteredOrders) && filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.orderId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-blue-600 whitespace-nowrap">
                      #{order.orderId}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                      {order.customer
                        ? `${order.customer.firstName} ${order.customer.lastName}`
                        : "N/A"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {formatDate(order.orderDate)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                      {order.orderItems ? order.orderItems.length : 0}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                      $
                      {order.totalAmount
                        ? order.totalAmount.toFixed(2)
                        : "0.00"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {formatStatus(order.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                      <button
                        className="mr-4 text-blue-600 hover:text-blue-900"
                        disabled={loading}
                      >
                        View
                      </button>
                      <select
                        className="px-2 py-1 mr-4 text-sm border border-gray-300 rounded"
                        value={order.status}
                        onChange={(e) =>
                          handleStatusUpdate(order.orderId, e.target.value)
                        }
                        disabled={loading}
                      >
                        <option value="PENDING">Pending</option>
                        <option value="PROCESSING">Processing</option>
                        <option value="COMPLETED">Completed</option>
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    {loading
                      ? "Loading orders..."
                      : statusFilter !== "All Status"
                      ? "No orders found with this status"
                      : "No orders found"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Enhanced Pagination - Same as Products/Users */}
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            {/* Previous Button */}
            <button
              onClick={() => fetchOrders(currentPage - 1)}
              disabled={currentPage === 0 || loading}
              className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {/* Center - Page Info and Controls */}
            <div className="flex items-center space-x-4">
              {/* Page Size Control */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700">Show:</span>
                <select
                  value={pageSize}
                  onChange={(e) =>
                    handlePageSizeChange(parseInt(e.target.value))
                  }
                  className="px-2 py-1 text-sm border border-gray-300 rounded"
                  disabled={loading}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
                <span className="text-sm text-gray-700">per page</span>
              </div>

              {/* Page Numbers or Input */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700">
                  Page {currentPage + 1} of {totalPages}
                </span>

                {totalPages <= 10 ? (
                  <div className="flex space-x-1">
                    {[...Array(totalPages)].map((_, index) => (
                      <button
                        key={index}
                        onClick={() => fetchOrders(index)}
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
                ) : (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-700">Go to:</span>
                    <input
                      type="number"
                      min="1"
                      max={totalPages}
                      value={currentPage + 1}
                      onChange={(e) => {
                        const page = parseInt(e.target.value) - 1;
                        if (page >= 0 && page < totalPages) {
                          fetchOrders(page);
                        }
                      }}
                      className="w-16 px-2 py-1 text-sm text-center border border-gray-300 rounded"
                      disabled={loading}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={() => fetchOrders(currentPage + 1)}
              disabled={currentPage >= totalPages - 1 || loading}
              className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="p-6 text-center bg-white border rounded-lg shadow">
          <div className="text-2xl font-bold text-blue-600">
            {orders.length}
          </div>
          <div className="text-sm text-gray-500">
            Total Orders (Current Page)
          </div>
        </div>
        <div className="p-6 text-center bg-white border rounded-lg shadow">
          <div className="text-2xl font-bold text-green-600">
            {orders.filter((o) => o.status === "COMPLETED").length}
          </div>
          <div className="text-sm text-gray-500">Completed</div>
        </div>
        <div className="p-6 text-center bg-white border rounded-lg shadow">
          <div className="text-2xl font-bold text-blue-600">
            {orders.filter((o) => o.status === "PROCESSING").length}
          </div>
          <div className="text-sm text-gray-500">Processing</div>
        </div>
        <div className="p-6 text-center bg-white border rounded-lg shadow">
          <div className="text-2xl font-bold text-purple-600">
            $
            {orders
              .reduce((sum, order) => sum + (order.totalAmount || 0), 0)
              .toFixed(2)}
          </div>
          <div className="text-sm text-gray-500">
            Total Revenue (Current Page)
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
