import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const OnlineBuyPage = ({ cartItems, setCartItems }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/api/v1/item/item-list"
        );
        if (response.data.code === 200) {
          setProducts(response.data.data);
        } else {
          console.error("Error fetching products:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const existingItem = cartItems.find(
      (item) => item.itemName === product.itemName
    );
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.itemName === product.itemName
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  return (
    <div className="p-8 text-center">
      <h1 className="text-4xl font-bold">Online Buy</h1>
      <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
        {products.map((item) => (
          <ProductCard
            key={item.itemName}
            imageUrl={item.imageUrl}
            productName={item.itemName}
            price={item.itemPrice}
            addToCart={() => addToCart(item)}
          />
        ))}
      </div>
    </div>
  );
};

export default OnlineBuyPage;
