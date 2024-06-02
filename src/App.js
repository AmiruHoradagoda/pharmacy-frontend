import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import OnlineBuyPage from "./Pages/OnlineBuyPage";
import ShoppingCartPage from "./Pages/ShoppingCartPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import UserDashboard from "./Pages/UserDashboard";

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  const removeItemFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const emptyCart = () => {
    setCartItems([]);
  };

  const incrementItemQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementItemQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };
  return (
    <BrowserRouter>
      <Navbar cartItemsQut={cartItems.length} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/online-buy"
          element={
            <OnlineBuyPage cartItems={cartItems} setCartItems={setCartItems} />
          }
        />
        <Route
          path="/cart"
          element={
            <ShoppingCartPage
              cartItems={cartItems}
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
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
