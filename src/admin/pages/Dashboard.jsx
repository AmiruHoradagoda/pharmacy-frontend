import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { dashboardService } from "../../api/dashboardService";
import DashboardStats from "../components/DashboardStats";
import RecentOrders from "../components/RecentOrders";
import QuickActions from "../components/QuickActions";
import SalesChart from "../components/SalesChart";
import LowStockAlert from "../components/LowStockAlert";

const Dashboard = ({ onSectionChange }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [lowStockItems, setLowStockItems] = useState([]);
  const [salesData, setSalesData] = useState(null);
  const [error, setError] = useState(null);

  // Check if user is admin
  const isUserAdmin = () => {
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const userData = JSON.parse(user);
        return userData.role?.roleName === "Admin";
      } catch (error) {
        console.error("Error parsing user data:", error);
        return false;
      }
    }
    return false;
  };

  // Check authentication on component mount
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      alert("Please login to access this page.");
      navigate("/login");
      return;
    }

    if (!isUserAdmin()) {
      alert("Access denied. Admin privileges required.");
      navigate("/login");
      return;
    }

    loadDashboardData();
  }, [navigate]);

  const loadDashboardData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Load all dashboard data concurrently
      const [statsResponse, ordersResponse, lowStockResponse, salesResponse] =
        await Promise.allSettled([
          dashboardService.getDashboardStats(),
          dashboardService.getRecentOrders(5),
          dashboardService.getLowStockItems(5),
          dashboardService.getSalesOverview(30),
        ]);

      // Handle stats
      if (
        statsResponse.status === "fulfilled" &&
        statsResponse.value.code === 200
      ) {
        setDashboardStats(statsResponse.value.data);
      } else {
        console.error("Error loading dashboard stats:", statsResponse.reason);
      }

      // Handle recent orders
      if (
        ordersResponse.status === "fulfilled" &&
        ordersResponse.value.code === 200
      ) {
        setRecentOrders(ordersResponse.value.data);
      } else {
        console.error("Error loading recent orders:", ordersResponse.reason);
      }

      // Handle low stock items
      if (
        lowStockResponse.status === "fulfilled" &&
        lowStockResponse.value.code === 200
      ) {
        setLowStockItems(lowStockResponse.value.data);
      } else {
        console.error(
          "Error loading low stock items:",
          lowStockResponse.reason
        );
      }

      // Handle sales data
      if (
        salesResponse.status === "fulfilled" &&
        salesResponse.value.code === 200
      ) {
        setSalesData(salesResponse.value.data);
      } else {
        console.error("Error loading sales data:", salesResponse.reason);
      }
    } catch (error) {
      console.error("Error loading dashboard data:", error);
      setError("Failed to load dashboard data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    loadDashboardData();
  };

  if (error) {
    return (
      <div className="space-y-6">
        <div className="py-12 text-center">
          <div className="mb-4 text-xl text-red-500">⚠️</div>
          <h2 className="mb-2 text-xl font-semibold text-gray-900">
            Error Loading Dashboard
          </h2>
          <p className="mb-4 text-gray-500">{error}</p>
          <button
            onClick={handleRefresh}
            className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

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
        <div className="flex items-center space-x-4">
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="px-3 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50"
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
          <div className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* Dashboard Stats */}
      <DashboardStats stats={dashboardStats} loading={loading} />

      {/* Quick Actions - Pass onSectionChange prop */}
      <QuickActions onSectionChange={onSectionChange} />

      {/* Charts and Alerts Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SalesChart salesData={salesData} loading={loading} />
        <LowStockAlert
          lowStockItems={lowStockItems}
          loading={loading}
          onRefresh={handleRefresh}
        />
      </div>

      {/* Recent Orders */}
      <RecentOrders orders={recentOrders} loading={loading} />
    </div>
  );
};

export default Dashboard;
