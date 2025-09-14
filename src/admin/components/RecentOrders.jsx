import React from "react";

const RecentOrders = ({ orders, loading }) => {
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
    if (!status) return "Unknown";
    return status.charAt(0) + status.slice(1).toLowerCase();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="bg-white border rounded-lg shadow">
      <div className="p-6 border-b">
        <h3 className="text-lg font-semibold text-gray-800">Recent Orders</h3>
      </div>
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
                Amount
              </th>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              [...Array(5)].map((_, index) => (
                <tr key={index} className="animate-pulse">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-16 h-4 bg-gray-200 rounded"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-24 h-4 bg-gray-200 rounded"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-20 h-4 bg-gray-200 rounded"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-16 h-4 bg-gray-200 rounded"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-20 h-6 bg-gray-200 rounded-full"></div>
                  </td>
                </tr>
              ))
            ) : orders?.length > 0 ? (
              orders.map((order, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                    #{order.orderId}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                    {order.customerName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {formatDate(order.orderDate)}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                    ${order.totalAmount?.toFixed(2)}
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
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                  No recent orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;
