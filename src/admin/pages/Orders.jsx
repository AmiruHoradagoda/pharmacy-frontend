// src/admin/pages/Orders.jsx
import React, { useState } from "react";

const Orders = () => {
  const [orders] = useState([
    {
      id: "#1234",
      customer: "John Doe",
      date: "2024-01-15",
      total: "$89.99",
      status: "Completed",
      items: 3,
    },
    {
      id: "#1235",
      customer: "Jane Smith",
      date: "2024-01-15",
      total: "$156.50",
      status: "Processing",
      items: 5,
    },
    {
      id: "#1236",
      customer: "Mike Johnson",
      date: "2024-01-14",
      total: "$45.25",
      status: "Pending",
      items: 2,
    },
    {
      id: "#1237",
      customer: "Sarah Wilson",
      date: "2024-01-14",
      total: "$78.99",
      status: "Completed",
      items: 4,
    },
    {
      id: "#1238",
      customer: "Tom Brown",
      date: "2024-01-13",
      total: "$234.75",
      status: "Shipped",
      items: 7,
    },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "text-green-600 bg-green-100";
      case "Processing":
        return "text-blue-600 bg-blue-100";
      case "Pending":
        return "text-yellow-600 bg-yellow-100";
      case "Shipped":
        return "text-purple-600 bg-purple-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-800">Orders</h3>
        <div className="flex space-x-3">
          <select className="px-3 py-2 border border-gray-300 rounded-lg">
            <option>All Status</option>
            <option>Pending</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Completed</option>
          </select>
          <button className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            Export
          </button>
        </div>
      </div>

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
              {orders.map((order, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-blue-600 whitespace-nowrap">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                    {order.items}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                    {order.total}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                    <button className="mr-4 text-blue-600 hover:text-blue-900">
                      View
                    </button>
                    <button className="text-green-600 hover:text-green-900">
                      Update
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

export default Orders;
