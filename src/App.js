// src/App.js
import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import OnlineBuyPage from "./Pages/OnlineBuyPage";
import ShoppingCartPage from "./Pages/ShoppingCartPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import UserDashboard from "./Pages/UserDashboard";
import CheckoutPage from "./Pages/CheckoutPage";
import { AuthProvider, useAuth } from "./AuthContext"; // Adjust the path according to your folder structure

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState({
    total: 0,
    shipping: 0,
    grandTotal: 0,
  });

  const removeItemFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.itemId !== id));
  };

  const emptyCart = () => {
    setCartItems([]);
  };

  const incrementItemQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.itemId === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementItemQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.itemId === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar cartItemsQut={cartItems.length} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/online-buy"
            element={
              <OnlineBuyPage
                cartItems={cartItems}
                setCartItems={setCartItems}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <ShoppingCartPage
                cartItems={cartItems}
                setCartTotal={setCartTotal}
                onRemoveItem={removeItemFromCart}
                onEmptyCart={emptyCart}
                onIncrementItem={incrementItemQuantity}
                onDecrementItem={decrementItemQuantity}
              />
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up-now" element={<RegisterPage />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route
            path="/checkout"
            element={
              <RequireAuth>
                <CheckoutPage
                  cartItems={cartItems}
                  cartTotal={cartTotal}
                  setCartItems={setCartItems}
                />
              </RequireAuth>
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
};

const RequireAuth = ({ children }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default App;
