import React from "react";

const QuickActions = ({ onSectionChange }) => {
  const actions = [
    {
      title: "Add New Product",
      icon: "➕",
      color: "bg-blue-500",
      action: () => onSectionChange("products"),
    },
    {
      title: "Process Orders",
      icon: "📦",
      color: "bg-green-500",
      action: () => onSectionChange("orders"),
    },
    {
      title: "View Reports",
      icon: "📊",
      color: "bg-purple-500",
      action: () => console.log("View Reports - Coming Soon"),
    },
    {
      title: "Manage Users",
      icon: "👥",
      color: "bg-orange-500",
      action: () => onSectionChange("users"),
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

export default QuickActions;
