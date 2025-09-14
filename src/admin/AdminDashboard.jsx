import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Users from "./pages/Users";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard onSectionChange={handleSectionChange} />;
      case "products":
        return <Products />;
      case "orders":
        return <Orders />;
      case "users":
        return <Users />;
      default:
        return <Dashboard onSectionChange={handleSectionChange} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />
      <Header />
      <div className="pt-20 ml-64">
        {" "}
        {/* Add top padding to account for fixed header */}
        <main className="p-6">{renderContent()}</main>
      </div>
    </div>
  );
};

export default AdminDashboard;
