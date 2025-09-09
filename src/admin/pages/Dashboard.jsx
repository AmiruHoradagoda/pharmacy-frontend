import React from "react";

// Dashboard Stats Component
const DashboardStats = () => {
  const stats = [
    {
      title: "1,234",
      subtitle: "+12% from last month",
      icon: "📋",
      color: "green",
    },
    {
      title: "$45,678",
      subtitle: "+8% from last month",
      icon: "💰",
      color: "green",
    },
    {
      title: "567",
      subtitle: "+3% from last month",
      icon: "💊",
      color: "green",
      label: "Products",
    },
    {
      title: "23",
      subtitle: "-5% from last month",
      icon: "⚠️",
      color: "red",
      label: "Low Stock",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <div key={index} className="p-6 bg-white border rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold text-gray-800">{stat.title}</h3>
              {stat.label && (
                <p className="mt-1 text-sm text-gray-500">{stat.label}</p>
              )}
            </div>
            <span className="text-2xl">{stat.icon}</span>
          </div>
          <p
            className={`text-sm ${
              stat.color === "green" ? "text-green-600" : "text-red-600"
            }`}
          >
            {stat.subtitle}
          </p>
        </div>
      ))}
    </div>
  );
};

// Recent Orders Component
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

// Quick Actions Component
const QuickActions = () => {
  const actions = [
    {
      title: "Add New Product",
      icon: "➕",
      color: "bg-blue-500",
      action: () => console.log("Add Product"),
    },
    {
      title: "Process Orders",
      icon: "📦",
      color: "bg-green-500",
      action: () => console.log("Process Orders"),
    },
    {
      title: "View Reports",
      icon: "📊",
      color: "bg-purple-500",
      action: () => console.log("View Reports"),
    },
    {
      title: "Manage Inventory",
      icon: "📋",
      color: "bg-orange-500",
      action: () => console.log("Manage Inventory"),
    },
  ];

  return (
    <div className="p-6 mb-8 bg-white border rounded-lg shadow">
      <h3 className="mb-4 text-lg font-semibold text-gray-800">
        Quick Actions
      </h3>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.action}
            className={`${action.color} text-white p-4 rounded-lg hover:opacity-90 transition-opacity flex flex-col items-center space-y-2`}
          >
            <span className="text-2xl">{action.icon}</span>
            <span className="text-sm font-medium text-center">
              {action.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

// Sales Chart Component (Placeholder)
const SalesChart = () => {
  return (
    <div className="p-6 mb-8 bg-white border rounded-lg shadow">
      <h3 className="mb-4 text-lg font-semibold text-gray-800">
        Sales Overview
      </h3>
      <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
        <div className="text-center">
          <div className="mb-2 text-4xl text-gray-400">📈</div>
          <p className="text-gray-500">Sales chart will be displayed here</p>
          <p className="text-sm text-gray-400">Connect your chart library</p>
        </div>
      </div>
    </div>
  );
};

// Low Stock Alert Component
const LowStockAlert = () => {
  const lowStockItems = [
    { name: "Vitamin D3", currentStock: 5, minStock: 20 },
    { name: "Ibuprofen 200mg", currentStock: 8, minStock: 25 },
    { name: "Hand Sanitizer", currentStock: 3, minStock: 15 },
    { name: "Face Masks", currentStock: 12, minStock: 30 },
  ];

  return (
    <div className="p-6 bg-white border rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Low Stock Alert</h3>
        <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
          {lowStockItems.length} items
        </span>
      </div>
      <div className="space-y-3">
        {lowStockItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-lg bg-red-50"
          >
            <div>
              <p className="font-medium text-gray-900">{item.name}</p>
              <p className="text-sm text-gray-500">
                Current: {item.currentStock} | Min: {item.minStock}
              </p>
            </div>
            <button className="text-sm font-medium text-red-600 hover:text-red-800">
              Reorder
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-gray-500">
            Welcome back! Here's what's happening with your pharmacy.
          </p>
        </div>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Dashboard Stats */}
      <DashboardStats />

      {/* Quick Actions */}
      <QuickActions />

      {/* Charts and Orders Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SalesChart />
        <LowStockAlert />
      </div>

      {/* Recent Orders */}
      <RecentOrders />
    </div>
  );
};

export default Dashboard;
