// src/admin/components/Header.jsx
import React from "react";

const Header = () => {
  return (
    <div className="px-6 py-4 ml-64 bg-white border-b shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Admin Dashboard</h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <span className="absolute flex items-center justify-center w-6 h-6 text-xs text-white bg-red-500 rounded-full -top-2 -right-2">
              3
            </span>
            <button className="p-2 text-gray-400 hover:text-gray-600">
              🔔
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 font-medium text-white bg-blue-500 rounded-full">
              A
            </div>
            <span className="font-medium text-gray-700">Admin User</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
