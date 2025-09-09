const RecentOrders = () => {
  const orders = [
    {
      id: "#1234",
      customer: "John Doe",
      date: "2024-01-15",
      amount: "$89.99",
      status: "Completed",
    },
    {
      id: "#1235",
      customer: "Jane Smith",
      date: "2024-01-15",
      amount: "$156.50",
      status: "Processing",
    },
    {
      id: "#1236",
      customer: "Mike Johnson",
      date: "2024-01-14",
      amount: "$45.25",
      status: "Pending",
    },
    {
      id: "#1237",
      customer: "Sarah Wilson",
      date: "2024-01-14",
      amount: "$78.99",
      status: "Completed",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "text-green-600 bg-green-100";
      case "Processing":
        return "text-blue-600 bg-blue-100";
      case "Pending":
        return "text-yellow-600 bg-yellow-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
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
            {orders.map((order, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                  {order.id}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                  {order.customer}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                  {order.date}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                  {order.amount}
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
