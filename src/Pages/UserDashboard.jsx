// src/Pages/UserDashboard.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import {
  LogOut,
  Mail,
  Phone,
  MapPin,
  Settings,
  Clock,
  ArrowRight,
} from "lucide-react";

const UserDashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");

  const user = JSON.parse(localStorage.getItem("user")) || {
    firstName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, New York, NY 10001",
    memberSince: "January 15, 2024",
  };

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("user");
    logout();
    navigate("/login");
  };

  // Updated dummy data
  const orders = [
    {
      id: "ORD-001",
      date: "Dec 20, 2024",
      items: 3,
      total: "$45.99",
      status: "Delivered",
    },
    {
      id: "ORD-002",
      date: "Dec 15, 2024",
      items: 5,
      total: "$62.50",
      status: "Delivered",
    },
    {
      id: "ORD-003",
      date: "Dec 10, 2024",
      items: 2,
      total: "$38.75",
      status: "In Transit",
    },
  ];

  const prescriptions = [
    {
      id: "RX-01",
      medicine: "Amoxicillin 500mg",
      doctor: "Dr. Smith",
      prescriptionDate: "Dec 18, 2024",
      refills: 2,
      status: "Active",
    },
  ];

  // Get user initials for avatar
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER with User Info */}
      <div className="bg-white ">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex justify-between items-center">
            {/* User Info */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-xl font-semibold text-blue-700">
                  {getInitials(user.firstName)}
                </span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {user.firstName}
                </h1>
                <p className="text-sm text-gray-500">
                  Member since {user.memberSince}
                </p>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {[
            { key: "profile", label: "Profile" },
            { key: "orders", label: "Orders" },
            { key: "prescriptions", label: "Prescriptions" },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-8 py-3 text-sm font-medium rounded-lg transition-colors ${
                activeTab === key
                  ? "bg-gray-200 text-gray-900"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* PROFILE TAB */}
        {activeTab === "profile" && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Personal Information
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                View and manage your account details
              </p>

              <div className="space-y-5">
                <div>
                  <label className="text-sm text-gray-500 block mb-1">
                    Full Name
                  </label>
                  <p className="text-base text-gray-900 font-medium">
                    {user.firstName}
                  </p>
                </div>

                <div>
                  <label className="text-sm text-gray-500 block mb-1">
                    Email Address
                  </label>
                  <div className="flex items-center gap-2 text-gray-900">
                    <Mail className="h-4 w-4" />
                    <p className="text-base">{user.email}</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-500 block mb-1">
                    Phone Number
                  </label>
                  <div className="flex items-center gap-2 text-gray-900">
                    <Phone className="h-4 w-4" />
                    <p className="text-base">{user.phone}</p>
                  </div>
                </div>
              </div>

              <button className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm font-medium">
                <Settings className="h-4 w-4" />
                Edit Profile
              </button>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Shipping Address
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Manage your delivery addresses
              </p>

              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
                  <p className="text-base text-gray-900">{user.address}</p>
                </div>
              </div>

              <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                Add New Address
              </button>
            </div>
          </div>
        )}

        {/* ORDERS TAB */}
        {activeTab === "orders" && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Order History
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              View your past orders and track deliveries
            </p>

            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 mb-1">
                      {order.id}
                    </p>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span>
                        {order.date} • {order.items} items
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="font-bold text-gray-900 mb-1">
                        {order.total}
                      </p>
                      <span
                        className={`text-sm px-3 py-1 rounded-full ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PRESCRIPTIONS TAB */}
        {activeTab === "prescriptions" && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              My Prescriptions
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Manage your active prescriptions and refills
            </p>

            <div className="space-y-4">
              {prescriptions.map((rx) => (
                <div
                  key={rx.id}
                  className="border border-gray-200 rounded-lg p-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {rx.medicine}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Prescribed by {rx.doctor}
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                      {rx.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">
                        Prescription Date
                      </p>
                      <p className="text-base font-medium text-gray-900">
                        {rx.prescriptionDate}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">
                        Refills Remaining
                      </p>
                      <p className="text-base font-medium text-gray-900">
                        {rx.refills}
                      </p>
                    </div>
                  </div>

                  <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                    Refill Prescription
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
