// src/Pages/UserDashboard.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import {
  LogOut,
  User,
  ShoppingBag,
  Heart,
  FileText,
  Clock,
} from "lucide-react";

const UserDashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");

  const user = JSON.parse(localStorage.getItem("user")) || {
    firstName: "John",
    email: "john@example.com",
    phone: "+94 77 123 4567",
    address: "Colombo, Sri Lanka",
  };

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("user");
    logout();
    navigate("/login");
  };

  // Dummy data
  const orders = [
    {
      id: "ORD-101",
      date: "Dec 20, 2024",
      total: "$45.99",
      status: "Delivered",
    },
    {
      id: "ORD-102",
      date: "Dec 15, 2024",
      total: "$62.50",
      status: "In Transit",
    },
  ];

  const favorites = [
    { id: 1, name: "Paracetamol 500mg", price: "$8.99" },
    { id: 2, name: "Vitamin D Supplement", price: "$14.99" },
  ];

  const prescriptions = [
    {
      id: "RX-01",
      medicine: "Amoxicillin 500mg",
      doctor: "Dr. Silva",
      refills: 2,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER */}
      <div className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Customer Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-base text-red-600 hover:text-red-700"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-6 mb-8 border-b">
          {[
            { key: "profile", label: "Profile", icon: User },
            { key: "orders", label: "Orders", icon: ShoppingBag },
            { key: "prescriptions", label: "Prescriptions", icon: FileText },
            { key: "favorites", label: "Favorites", icon: Heart },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-3 px-6 py-3 border-b-2 text-base hover:shadow-sm hover:bg-gray-50 transition-all duration-200 ${
                activeTab === key
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <Icon className="h-5 w-5" />
              {label}
            </button>
          ))}
        </div>

        {/* PROFILE */}
        {activeTab === "profile" && (
          <div className="bg-white rounded-lg p-8 shadow-md space-y-6">
            <h2 className="text-2xl font-semibold">Personal Information</h2>
            <p>
              <strong>Name:</strong> {user.firstName}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Phone:</strong> {user.phone}
            </p>
            <p>
              <strong>Address:</strong> {user.address}
            </p>
          </div>
        )}

        {/* ORDERS */}
        {activeTab === "orders" && (
          <div className="bg-white rounded-lg p-8 shadow-md space-y-6">
            <h2 className="text-2xl font-semibold">Order History</h2>
            {orders.map((order) => (
              <div
                key={order.id}
                className="flex justify-between items-center border p-6 rounded-lg"
              >
                <div>
                  <p className="font-medium">{order.id}</p>
                  <p className="text-base text-gray-500 flex items-center gap-1">
                    <Clock className="h-5 w-5" />
                    {order.date}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{order.total}</p>
                  <span className="text-base text-blue-600">
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PRESCRIPTIONS */}
        {activeTab === "prescriptions" && (
          <div className="bg-white rounded-lg p-8 shadow-md space-y-6">
            <h2 className="text-2xl font-semibold">My Prescriptions</h2>
            {prescriptions.map((rx) => (
              <div key={rx.id} className="border p-6 rounded-lg">
                <p className="font-medium">{rx.medicine}</p>
                <p className="text-base text-gray-500">Doctor: {rx.doctor}</p>
                <p className="text-base">Refills Remaining: {rx.refills}</p>
              </div>
            ))}
          </div>
        )}

        {/* FAVORITES */}
        {activeTab === "favorites" && (
          <div className="grid md:grid-cols-3 gap-8">
            {favorites.map((item) => (
              <div key={item.id} className="bg-white rounded-lg p-6 shadow-md">
                <Heart className="text-red-500 mb-3 h-6 w-6" />
                <p className="font-medium text-lg">{item.name}</p>
                <p className="font-bold mt-3 text-xl">{item.price}</p>
                <button className="mt-6 w-full bg-blue-600 text-white py-3 text-base rounded hover:bg-blue-700">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
