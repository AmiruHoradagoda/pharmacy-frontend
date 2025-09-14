import React from "react";

const Sidebar = ({ activeSection, onSectionChange }) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "products", label: "Products", icon: "💊" },
    { id: "orders", label: "Orders", icon: "📋" },
    { id: "users", label: "Users", icon: "👥" },
  ];

  return (
    <div className="fixed top-0 left-0 z-30 w-64 h-full bg-white shadow-lg">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-blue-600">PharmaCare</h1>
        <p className="text-sm text-gray-500">Admin Panel</p>
      </div>

      <nav className="mt-6">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={`w-full text-left px-6 py-3 flex items-center space-x-3 hover:bg-blue-50 transition-colors ${
              activeSection === item.id
                ? "bg-blue-50 border-r-4 border-blue-500 text-blue-700"
                : "text-gray-700"
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* User Info at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-gray-50">
        <div className="text-center">
          <p className="text-xs text-gray-500">Logged in as</p>
          <p className="text-sm font-medium text-gray-700">
            {JSON.parse(localStorage.getItem("user") || "{}")?.firstName ||
              "Admin"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
