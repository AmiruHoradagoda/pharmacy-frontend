// src/Pages/LoginPage.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../AuthContext";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8081/api/v1/auth/authentication",
        {
          userEmail: email,
          userPassword: password,
        }
      );

      if (response.data.jwtToken) {
        localStorage.setItem("jwtToken", response.data.jwtToken);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        login();

        // Check user role and redirect accordingly
        const userRole = response.data.user?.role?.roleName;

        if (userRole === "Admin") {
          navigate("/admin-dashboard");
        } else if (userRole === "Customer") {
          navigate("/user-dashboard");
        } else {
          // Fallback for unknown roles
          navigate("/user-dashboard");
        }
      } else {
        alert("Login failed. Please check your email and password.");
      }
    } catch (error) {
      console.error("There was an error logging in:", error);

      // Handle different error scenarios
      if (error.response) {
        // Server responded with error status
        if (error.response.status === 401) {
          alert("Invalid email or password. Please try again.");
        } else if (error.response.status === 403) {
          alert("Access denied. Please contact administrator.");
        } else {
          alert("Login failed. Please try again later.");
        }
      } else if (error.request) {
        // Request was made but no response received
        alert(
          "Unable to connect to server. Please check your internet connection."
        );
      } else {
        // Something else happened
        alert("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gradientStart to-gradientEnd">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Login Form
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-gradientStart focus:border-gradientStart"
              placeholder="user@gmail.com"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-gradientStart focus:border-gradientStart"
              placeholder="password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
        <p className="mt-10 text-sm text-center text-gray-500">
          If you don't have an account, please{" "}
          <span className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            <Link to="/sign-up-now">Sign Up Now</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
