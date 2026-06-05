import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CheckoutPage = ({ cartTotal = {}, cartItems = [], setCartItems }) => {
  const [formData, setFormData] = useState({
    state: "",
    postalCode: "",
    address: "",
    city: "",
  });

  const [customerEmail, setCustomerEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token || !user) {
      navigate("/login");
    } else {
      setCustomerEmail(user.email);
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("jwtToken");

    const orderDetailsSaves = (cartItems || []).map((item) => ({
      amount: item.itemPrice * item.quantity,
      itemId: item.itemId,
      itemName: item.itemName,
      quantity: item.quantity,
    }));

    const orderData = {
      customer: customerEmail,
      orderDate: new Date().toISOString(),
      orderDetailsSaves,
      requestShippingAddressSave: {
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
      },
      totalAmount: cartTotal.grandTotal,
    };

    console.log("order data ", orderData);

    try {
      const response = await fetch("http://localhost:8081/api/v1/order/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const result = await response.json();
        alert(result.message); // Display success message
        setCartItems([]); // Clear the cart
        navigate("/"); // Redirect to homepage
      } else {
        console.error("Failed to place order");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="p-6 md:p-12 bg-gray-50 min-h-screen">
      <h1 className="mb-8 text-3xl md:text-4xl font-bold text-center">
        Checkout
      </h1>

      <div className="flex flex-col md:flex-row gap-8 md:gap-6">
        <div className="w-full md:w-2/3 p-6 bg-white rounded-xl shadow-md border border-gray-100">
          <h2 className="mb-6 text-2xl font-semibold">Billing Address</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4">
              <input
                type="text"
                name="state"
                placeholder="State/Province"
                value={formData.state}
                onChange={handleChange}
                className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2e58a3]/20"
              />
              <input
                type="text"
                name="postalCode"
                placeholder="Postal Code"
                value={formData.postalCode}
                onChange={handleChange}
                className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2e58a3]/20"
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2e58a3]/20"
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2e58a3]/20"
              />
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 mt-6 text-white bg-[#2e58a3] rounded-lg hover:bg-[#274a86] transition"
            >
              Place Order
            </button>
          </form>

          <Link to="/cart">
            <button className="w-full px-6 py-3 mt-4 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
              Back to Cart
            </button>
          </Link>
        </div>

        <div className="w-full md:w-1/3 p-6 bg-white rounded-xl shadow-md border border-gray-100">
          <h2 className="mb-4 text-2xl font-semibold">Order Summary</h2>
          <div className="divide-y divide-gray-100">
            <div className="flex justify-between items-center py-3">
              <div className="text-gray-600">Total:</div>
              <div className="font-medium">${cartTotal.total?.toFixed(2)}</div>
            </div>
            <div className="flex justify-between items-center py-3">
              <div className="text-gray-600">Shipping:</div>
              <div className="font-medium">
                ${cartTotal.shipping?.toFixed(2)}
              </div>
            </div>
            <div className="flex justify-between items-center py-3">
              <div className="text-gray-800 font-semibold">Grand Total:</div>
              <div className="text-lg font-semibold">
                ${cartTotal.grandTotal?.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
