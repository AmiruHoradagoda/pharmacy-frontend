// src/admin/pages/Customers.jsx
import React, { useState } from "react";

const Customers = () => {
  const [customers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 234-567-8900",
      orders: 12,
      spent: "$1,234.50",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+1 234-567-8901",
      orders: 8,
      spent: "$890.25",
      status: "Active",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      phone: "+1 234-567-8902",
      orders: 15,
      spent: "$2,156.75",
      status: "VIP",
    },
    {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah@example.com",
      phone: "+1 234-567-8903",
      orders: 3,
      spent: "$234.99",
      status: "New",
    },
    {
      id: 5,
      name: "Tom Brown",
      email: "tom@example.com",
      phone: "+1 234-567-8904",
      orders: 0,
      spent: "$0.00",
      status: "Inactive",
    },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "text-green-600 bg-green-100";
      case "VIP":
        return "text-purple-600 bg-purple-100";
      case "New":
        return "text-blue-600 bg-blue-100";
      case "Inactive":
        return "text-gray-600 bg-gray-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-800">Customers</h3>
        <div className="flex space-x-3">
          <input
            type="text"
            placeholder="Search customers..."
            className="w-64 px-3 py-2 border border-gray-300 rounded-lg"
          />
          <button className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            Add Customer
          </button>
        </div>
      </div>

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
                  Orders
                </th>
                <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                  Total Spent
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
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                    {customer.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {customer.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {customer.phone}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                    {customer.orders}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                    {customer.spent}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        customer.status
                      )}`}
                    >
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                    <button className="mr-4 text-blue-600 hover:text-blue-900">
                      Edit
                    </button>
                    <button className="mr-4 text-green-600 hover:text-green-900">
                      View Orders
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Customers;
