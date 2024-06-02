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
    <div className="p-8">
      <h1 className="mb-8 text-4xl font-bold text-center">Checkout</h1>
      <div className="flex justify-between">
        <div className="w-2/3 p-4 border">
          <h2 className="mb-4 text-2xl font-bold">Billing Address</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4">
              <input
                type="text"
                name="state"
                placeholder="State/Province"
                value={formData.state}
                onChange={handleChange}
                className="p-2 border rounded"
              />
              <input
                type="text"
                name="postalCode"
                placeholder="Postal Code"
                value={formData.postalCode}
                onChange={handleChange}
                className="p-2 border rounded"
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className="p-2 border rounded"
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="p-2 border rounded"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded"
            >
              Place Order
            </button>
          </form>
          <Link to="/cart">
            <button className="w-full px-4 py-2 mt-4 text-white bg-gray-500 rounded">
              Back to Cart
            </button>
          </Link>
        </div>
        <div className="w-1/3 p-4 border">
          <h2 className="mb-4 text-2xl font-bold">Order Summary</h2>
          <table className="w-full border-collapse">
            <tbody>
              <tr>
                <td className="p-4 border-b">Total:</td>
                <td className="p-4 border-b">${cartTotal.total?.toFixed(2)}</td>
              </tr>
              <tr>
                <td className="p-4 border-b">Shipping:</td>
                <td className="p-4 border-b">
                  ${cartTotal.shipping?.toFixed(2)}
                </td>
              </tr>
              <tr>
                <td className="p-4 font-bold border-b">Grand Total:</td>
                <td className="p-4 font-bold border-b">
                  ${cartTotal.grandTotal?.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
