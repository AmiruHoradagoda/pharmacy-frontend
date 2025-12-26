import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../AuthContext"; // keep the existing auth hook
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ShoppingCartPage = ({
  setCartTotal,
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
  const shipping = total > 0 ? 480 : 0; // preserve existing logic
  const grandTotal = total + shipping;

  const handleCheckout = () => {
    if (!isLoggedIn) {
      alert("Please log in before checking out");
      navigate("/login");
    } else {
      setCartTotal({ total, shipping, grandTotal });
      navigate("/checkout");
    }
  };

  // Empty cart UI
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 bg-gray-50">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-lg mx-auto p-12 bg-white rounded-xl shadow-md border border-gray-100 text-center">
              <div className="flex justify-center mb-6">
                <div className="h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 8h14l-2-8M16 21a2 2 0 11-4 0"
                    />
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-semibold mb-3">
                Your Cart is Empty
              </h2>
              <p className="text-gray-500 mb-8">
                Add products to your cart to see them here
              </p>
              <Link to="/">
                <button className="inline-flex items-center gap-2 px-4 py-2 bg-[#2e58a3] text-white rounded-lg hover:bg-[#274a86] transition">
                  Continue Shopping
                </button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* <Navbar /> */}
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
              <p className="text-gray-500">
                {cartItems.length} {cartItems.length === 1 ? "item" : "items"}{" "}
                in your cart
              </p>
            </div>
            <Link to="/">
              <button className="px-3 py-2 border border-gray-200 rounded bg-transparent hover:bg-gray-100 transition">
                Continue Shopping
              </button>
            </Link>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.itemId}
                  className="bg-white p-4 rounded-xl shadow-sm border border-gray-100"
                >
                  <div className="flex gap-4">
                    <img
                      src={item.imageUrl || "/placeholder.svg"}
                      alt={item.itemName}
                      className="w-28 h-28 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {item.itemName}
                          </h3>
                        </div>
                        <button
                          className="text-red-500 hover:text-red-600"
                          onClick={() => onRemoveItem(item.itemId)}
                        >
                          Remove
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button
                            className="h-9 w-9 flex items-center justify-center border border-gray-200 rounded-md bg-white hover:bg-gray-50"
                            onClick={() => onDecrementItem(item.itemId)}
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span className="w-14 text-center font-medium text-lg">
                            {item.quantity}
                          </span>
                          <button
                            className="h-9 w-9 flex items-center justify-center border border-gray-200 rounded-md bg-white hover:bg-gray-50"
                            onClick={() => onIncrementItem(item.itemId)}
                          >
                            +
                          </button>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold">
                            ${(item.itemPrice * item.quantity).toFixed(2)}
                          </div>
                          <div className="text-sm text-gray-500">
                            $
                            {item.itemPrice ? item.itemPrice.toFixed(2) : "N/A"}{" "}
                            each
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={onEmptyCart}
                className="w-full px-4 py-2 text-red-600 border border-red-100 rounded hover:bg-red-50"
              >
                Clear Cart
              </button>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 sticky top-24">
                <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-medium">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Shipping</span>
                    <span className="font-medium">${shipping.toFixed(2)}</span>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Promo Code</label>
                    <div className="flex gap-2 mt-2">
                      <input
                        className="flex-1 border border-gray-200 rounded px-3 py-2 focus:ring-2 focus:ring-[#2e58a3]/20"
                        placeholder="Enter code"
                      />
                      <button className="px-3 py-2 bg-[#2e58a3] text-white rounded hover:bg-[#274a86] transition">
                        Apply
                      </button>
                    </div>
                  </div>

                  <div className="pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>${grandTotal.toFixed(2)}</span>
                    </div>
                    <button
                      onClick={handleCheckout}
                      className="mt-4 w-full px-4 py-3 bg-[#2e58a3] text-white rounded-lg hover:bg-[#274a86] transition"
                    >
                      Proceed to Checkout
                    </button>
                    <p className="text-xs text-center text-gray-500 mt-2">
                      Secure checkout • SSL encrypted
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ShoppingCartPage;
