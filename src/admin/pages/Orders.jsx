// src/admin/pages/Orders.jsx
import React, { useState, useEffect } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize] = useState(10);
  const [statusFilter, setStatusFilter] = useState("All Status");

  const API_BASE_URL = "http://localhost:8081/api/v1/order";

  // Fetch orders from API
  const fetchOrders = async (page = 0) => {
    setLoading(true);
    try {
      const url = `${API_BASE_URL}/getAllOrders?page=${page}&size=${pageSize}&sortBy=orderId&sortDirection=desc`;
      console.log("Fetching orders from URL:", url);

      const response = await fetch(url);
      console.log("Response status:", response.status);

      const data = await response.json();
      console.log("Full API response:", data);
      console.log("Orders list:", data.data?.dataList);

      if (data.code === 200) {
        // Use dataList from your API response structure
        const orderList = Array.isArray(data.data.dataList)
          ? data.data.dataList
          : [];
        console.log("Setting orders:", orderList);
        setOrders(orderList);

        // Calculate total pages based on dataCount and pageSize
        const totalItems = data.data.dataCount || 0;
        setTotalPages(Math.ceil(totalItems / pageSize));
        setCurrentPage(page);
      } else {
        console.error("Failed to fetch orders:", data.message);
        setOrders([]);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Filter orders based on status
  const filteredOrders = orders.filter((order) => {
    if (statusFilter === "All Status") return true;
    return order.status === statusFilter.toUpperCase();
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "COMPLETED":
        return "text-green-600 bg-green-100";
      case "PROCESSING":
        return "text-blue-600 bg-blue-100";
      case "PENDING":
        return "text-yellow-600 bg-yellow-100";
      case "SHIPPED":
        return "text-purple-600 bg-purple-100";
      case "CANCELLED":
        return "text-red-600 bg-red-100";
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
            <option>Shipped</option>
            <option>Completed</option>
            <option>Cancelled</option>
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
                      ${order.totalAmount.toFixed(2)}
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
                      <button className="mr-4 text-blue-600 hover:text-blue-900">
                        View
                      </button>
                      <button className="mr-4 text-green-600 hover:text-green-900">
                        Update
                      </button>
                      <button className="text-purple-600 hover:text-purple-900">
                        Details
                      </button>
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <button
                onClick={() => fetchOrders(currentPage - 1)}
                disabled={currentPage === 0 || loading}
                className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              <div className="flex space-x-2">
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

              <button
                onClick={() => fetchOrders(currentPage + 1)}
                disabled={currentPage >= totalPages - 1 || loading}
                className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="p-6 text-center bg-white border rounded-lg shadow">
          <div className="text-2xl font-bold text-blue-600">
            {orders.length}
          </div>
          <div className="text-sm text-gray-500">Total Orders</div>
        </div>
        <div className="p-6 text-center bg-white border rounded-lg shadow">
          <div className="text-2xl font-bold text-green-600">
            {orders.filter((o) => o.status === "COMPLETED").length}
          </div>
          <div className="text-sm text-gray-500">Completed</div>
        </div>
        <div className="p-6 text-center bg-white border rounded-lg shadow">
          <div className="text-2xl font-bold text-yellow-600">
            {orders.filter((o) => o.status === "PENDING").length}
          </div>
          <div className="text-sm text-gray-500">Pending</div>
        </div>
        <div className="p-6 text-center bg-white border rounded-lg shadow">
          <div className="text-2xl font-bold text-purple-600">
            $
            {orders
              .reduce((sum, order) => sum + order.totalAmount, 0)
              .toFixed(2)}
          </div>
          <div className="text-sm text-gray-500">Total Revenue</div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
