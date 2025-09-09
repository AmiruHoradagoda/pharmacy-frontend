import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    roleName: "Customer",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      phoneNumber,
      roleName,
    } = formData;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Debug: Log the data being sent
    console.log("Sending registration data:", {
      firstName,
      lastName,
      email,
      password: password ? "[PRESENT]" : "[EMPTY]",
      phoneNumber,
      roleName,
    });

    try {
      const response = await axios.post(
        "http://localhost:8081/api/v1/auth/register",
        {
          firstName,
          lastName,
          email,
          password,
          phoneNumber,
          roleName,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log("Backend response:", response.data);

      // Fixed: Check for success field instead of code
      if (response.data.success === true) {
        alert(response.data.message);
        navigate("/login");
      } else {
        alert(response.data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      console.error("Error response:", error.response?.data);
      
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("There was an error registering the account");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gradientStart to-gradientEnd">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Create an Account!
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-wrap justify-between mb-4">
            <div className="w-full md:w-5/12">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                required
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-gradientStart focus:border-gradientStart"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-5/12">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-gradientStart focus:border-gradientStart"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-gradientStart focus:border-gradientStart"
              placeholder="user@gmail.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-wrap justify-between mb-4">
            <div className="w-full md:w-5/12">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-gradientStart focus:border-gradientStart"
                placeholder="******************"
                value={formData.password}
                onChange={handleChange}
              />
              <p className="text-xs italic text-red-500">
                Please choose a password.
              </p>
            </div>
            <div className="w-full md:w-5/12">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                required
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-gradientStart focus:border-gradientStart"
                placeholder="******************"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              id="phoneNumber"
              type="text"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-gradientStart focus:border-gradientStart"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Register Account
            </button>
          </div>
        </form>

        <hr className="border-t" />

        <p className="mt-6 text-sm text-center text-gray-500">
          Already have an account?{" "}
          <span className="font-semibold leading-6 text-blue-500 hover:text-blue-800">
            <Link to="/login">Login!</Link>
          </span>
        </p>
      </div>
    </div>
  );
}