import React from "react";

const DashboardStats = ({ stats, loading }) => {
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num?.toString() || "0";
  };

  const formatPercentage = (percentage) => {
    if (percentage === null || percentage === undefined) return "0%";
    const sign = percentage >= 0 ? "+" : "";
    return `${sign}${percentage.toFixed(1)}%`;
  };

  const statItems = [
    {
      title: formatNumber(stats?.totalOrders),
      subtitle: `${formatPercentage(
        stats?.orderGrowthPercentage
      )} from last month`,
      icon: "📋",
      color: stats?.orderGrowthPercentage >= 0 ? "green" : "red",
      label: "Total Orders",
    },
    {
      title: `$${
        stats?.totalRevenue ? stats.totalRevenue.toLocaleString() : "0"
      }`,
      subtitle: `${formatPercentage(
        stats?.revenueGrowthPercentage
      )} from last month`,
      icon: "💰",
      color: stats?.revenueGrowthPercentage >= 0 ? "green" : "red",
      label: "Total Revenue",
    },
    {
      title: formatNumber(stats?.totalProducts),
      subtitle: `${formatPercentage(
        stats?.productGrowthPercentage
      )} from last month`,
      icon: "💊",
      color: stats?.productGrowthPercentage >= 0 ? "green" : "red",
      label: "Products",
    },
    {
      title: formatNumber(stats?.lowStockCount),
      subtitle: `${formatPercentage(
        stats?.lowStockChangePercentage
      )} from last month`,
      icon: "⚠️",
      color: stats?.lowStockChangePercentage <= 0 ? "green" : "red",
      label: "Low Stock",
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((index) => (
          <div
            key={index}
            className="p-6 bg-white border rounded-lg shadow animate-pulse"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="w-20 h-8 bg-gray-200 rounded"></div>
                <div className="w-16 h-4 mt-2 bg-gray-200 rounded"></div>
              </div>
              <div className="w-8 h-8 bg-gray-200 rounded"></div>
            </div>
            <div className="w-24 h-4 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
      {statItems.map((stat, index) => (
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

export default DashboardStats;
