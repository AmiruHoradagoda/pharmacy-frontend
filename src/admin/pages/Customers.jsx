// src/admin/pages/Customers.jsx
import React, { useState, useEffect } from "react";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const API_BASE_URL = "http://localhost:8081/api/v1/user";

  // Fetch customers from API
  const fetchCustomers = async (page = 0) => {
    setLoading(true);
    try {
      const url = `${API_BASE_URL}/getCustomers?page=${page}&size=${pageSize}&sortBy=userId&sortDirection=desc`;
      console.log("Fetching customers from URL:", url);

      const response = await fetch(url);
      console.log("Response status:", response.status);

      const data = await response.json();
      console.log("Full API response:", data);
      console.log("Customers list:", data.data?.dataList);

      if (data.code === 200) {
        // Use dataList from your API response structure
        const customerList = Array.isArray(data.data.dataList)
          ? data.data.dataList
          : [];
        console.log("Setting customers:", customerList);
        setCustomers(customerList);

        // Calculate total pages based on dataCount and pageSize
        const totalItems = data.data.dataCount || 0;
        setTotalPages(Math.ceil(totalItems / pageSize));
        setCurrentPage(page);
      } else {
        console.error("Failed to fetch customers:", data.message);
        setCustomers([]);
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Filter customers based on search term
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phoneNumber.includes(searchTerm)
  );

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
                <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                  User ID
                </th>
                <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {Array.isArray(filteredCustomers) &&
              filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <tr key={customer.userId} className="hover:bg-gray-50">
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
                    <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                      #{customer.userId}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                      <button className="mr-4 text-blue-600 hover:text-blue-900">
                        Edit
                      </button>
                      <button className="mr-4 text-green-600 hover:text-green-900">
                        View Details
                      </button>
                      <button className="text-red-600 hover:text-red-900">
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <button
                onClick={() => fetchCustomers(currentPage - 1)}
                disabled={currentPage === 0 || loading}
                className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              <div className="flex space-x-2">
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

              <button
                onClick={() => fetchCustomers(currentPage + 1)}
                disabled={currentPage >= totalPages - 1 || loading}
                className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Summary Card */}
      <div className="p-6 bg-white border rounded-lg shadow">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {customers.length}
            </div>
            <div className="text-sm text-gray-500">Total Customers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {customers.filter((c) => c.role?.roleName === "Customer").length}
            </div>
            <div className="text-sm text-gray-500">Active Customers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {customers.filter((c) => c.role?.roleName === "Admin").length}
            </div>
            <div className="text-sm text-gray-500">Administrators</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customers;
