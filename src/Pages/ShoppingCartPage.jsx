import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext"; // Adjust the path according to your folder structure

const ShoppingCartPage = ({
  cartItems,
  onRemoveItem,
  onEmptyCart,
  onIncrementItem,
  onDecrementItem,
}) => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const calculateTotal = () => {
    return cartItems.reduce(
      (acc, item) => acc + (item.itemPrice || 0) * (item.quantity || 0),
      0
    );
  };

  const total = calculateTotal();
  const shipping = total > 0 ? 480 : 0; // Add your own shipping calculation logic here
  const grandTotal = total + shipping;

  const handleCheckout = () => {
    if (!isLoggedIn) {
      alert("Please log in before checking out");
      navigate("/login");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div className="p-8">
      <h1 className="mb-8 text-4xl font-bold text-center">Shopping Cart</h1>
      <div className="flex justify-between">
        <div className="w-2/3 p-4 border">
          <h2 className="mb-4 text-2xl font-bold">
            Shopping Cart [ Items: {cartItems.length} ]
          </h2>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-2 border">#</th>
                <th className="p-2 border">Product</th>
                <th className="p-2 border">Qty</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Subtotal</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={item.itemId}>
                  <td className="p-2 border">{index + 1}</td>
                  <td className="p-2 border">
                    <div className="flex items-center">
                      <img
                        src={item.imageUrl}
                        alt={item.itemName}
                        className="w-16 h-16 mr-4"
                      />
                      {item.itemName}
                    </div>
                  </td>
                  <td className="p-2 border">
                    <div className="flex items-center justify-center">
                      <button
                        className="px-2 py-1 text-white bg-blue-500 rounded"
                        onClick={() => onIncrementItem(item.itemId)}
                      >
                        +
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        className="px-2 py-1 text-white bg-blue-500 rounded"
                        onClick={() => onDecrementItem(item.itemId)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                    </div>
                  </td>
                  <td className="p-2 border">
                    {item.itemPrice ? item.itemPrice.toFixed(2) : "N/A"}
                  </td>
                  <td className="p-2 border">
                    {item.itemPrice && item.quantity
                      ? (item.itemPrice * item.quantity).toFixed(2)
                      : "N/A"}
                  </td>
                  <td className="p-2 border">
                    <button
                      className="text-red-500"
                      onClick={() => onRemoveItem(item.itemId)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className="px-4 py-2 mt-4 text-white bg-red-500 rounded"
            onClick={onEmptyCart}
          >
            Empty Cart
          </button>
        </div>
        <div className="w-1/3 p-4 border">
          <h2 className="mb-4 text-2xl font-bold">Order Summary</h2>
          <table className="w-full border-collapse">
            <tbody>
              <tr>
                <td className="p-2 border">Total:</td>
                <td className="p-2 border">${total.toFixed(2)}</td>
              </tr>
              <tr>
                <td className="p-2 border">Shipping:</td>
                <td className="p-2 border">${shipping.toFixed(2)}</td>
              </tr>
              <tr>
                <td className="p-2 font-bold border">Grand Total:</td>
                <td className="p-2 font-bold border">
                  ${grandTotal.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
          <button
            className="w-full px-4 py-2 mt-4 text-white bg-green-500 rounded"
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartPage;
