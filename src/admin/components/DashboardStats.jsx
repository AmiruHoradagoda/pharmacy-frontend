import React, { useState } from "react";

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
