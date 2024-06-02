import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CheckoutPage = ({ cartTotal }) => {
  const [formData, setFormData] = useState({
    state: "",
    postalCode: "",
    address: "",
    city: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
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
              Place to Order
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
                <td className="p-4 border-b">${cartTotal.total.toFixed(2)}</td>
              </tr>
              <tr>
                <td className="p-4 border-b">Shipping:</td>
                <td className="p-4 border-b">
                  ${cartTotal.shipping.toFixed(2)}
                </td>
              </tr>
              <tr>
                <td className="p-4 font-bold border-b">Grand Total:</td>
                <td className="p-4 font-bold border-b">
                  ${cartTotal.grandTotal.toFixed(2)}
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
