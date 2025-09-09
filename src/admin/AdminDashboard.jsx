// src/admin/AdminDashboard.jsx
import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "products":
        return <Products />;
      case "orders":
        return <Orders />;
      case "customers":
        return <Customers />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />
      <div className="ml-64">
        <Header />
        <main className="p-6">{renderContent()}</main>
      </div>
    </div>
  );
};

export default AdminDashboard;
