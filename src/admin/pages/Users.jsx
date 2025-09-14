// src/admin/pages/Users.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/apiConfig";

const Users = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(10); // Made mutable like Products
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState([]);

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

    fetchCustomers();
  }, [navigate]);

  // Fetch customers from API using axios
  const fetchCustomers = async (page = 0, size = pageSize) => {
    setLoading(true);
    try {
      console.log("Fetching customers with axios...");

      // Use axios instance instead of fetch
      const response = await api.get("/user/getAllUsers", {
        params: {
          page,
          size,
          sortBy: "userId",
          sortDirection: "desc",
        },
      });

      console.log("Response status:", response.status);
      console.log("Full API response:", response.data);
      console.log("Customers list:", response.data.data?.dataList);

      if (response.data.code === 200) {
        const data = response.data.data;

        // Use dataList from your API response structure
        const customerList = Array.isArray(data.dataList) ? data.dataList : [];
        console.log("Setting customers:", customerList);
        setCustomers(customerList);

        // Handle pagination like your Products component
        const totalItems = data.dataCount || 0;
        const calculatedTotalPages =
          data.totalPages || Math.ceil(totalItems / size);

        setTotalPages(calculatedTotalPages);
        setCurrentPage(page);

        console.log("Total Items:", totalItems);
        console.log("Calculated Total Pages:", calculatedTotalPages);
      } else {
        console.error("Failed to fetch customers:", response.data.message);
        setCustomers([]);
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
      setCustomers([]);

      // Don't show alert for 401 errors as interceptor handles it
      if (error.response?.status !== 401) {
        alert("Failed to fetch customers. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle page size change
  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setCurrentPage(0);
    fetchCustomers(0, newPageSize);
  };

  // Filter customers based on search term (client-side filtering)
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredCustomers(customers);
    } else {
      const filtered = customers.filter(
        (customer) =>
          customer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.phoneNumber.includes(searchTerm)
      );
      setFilteredCustomers(filtered);
    }
  }, [customers, searchTerm]);

  const getStatusColor = (role) => {
    switch (role?.roleName) {
      case "Customer":
        return "text-green-600 bg-green-100";
      case "Admin":
        return "text-purple-600 bg-purple-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-800">Customers</h3>
        <div className="flex space-x-3">
          <input
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-64 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            Add Customer
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
                  User ID
                </th>
                <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                  Email
                </th>
                <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                  Phone
                </th>
                <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                  Role
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {Array.isArray(filteredCustomers) &&
              filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <tr key={customer.userId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                      #{customer.userId}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                      {customer.firstName} {customer.lastName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {customer.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {customer.phoneNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          customer.role
                        )}`}
                      >
                        {customer.role?.roleName || "N/A"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    {loading
                      ? "Loading customers..."
                      : searchTerm
                      ? "No customers found matching your search"
                      : "No customers found"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Enhanced Pagination - Same as Products component */}
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            {/* Previous Button */}
            <button
              onClick={() => fetchCustomers(currentPage - 1)}
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
                        onClick={() => fetchCustomers(index)}
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
                          fetchCustomers(page);
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
              onClick={() => fetchCustomers(currentPage + 1)}
              disabled={currentPage >= totalPages - 1 || loading}
              className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Summary Card */}
      <div className="p-6 bg-white border rounded-lg shadow">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {customers.length}
            </div>
            <div className="text-sm text-gray-500">
              Total Users (Current Page)
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {customers.filter((c) => c.role?.roleName === "Customer").length}
            </div>
            <div className="text-sm text-gray-500">
              Customers (Current Page)
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {customers.filter((c) => c.role?.roleName === "Admin").length}
            </div>
            <div className="text-sm text-gray-500">
              Administrators (Current Page)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
