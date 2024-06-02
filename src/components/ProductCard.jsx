import React from "react";

const ProductCard = ({ imageUrl, productName, price, addToCart }) => {
  return (
    <div className="flex flex-col items-center p-4 border">
      <div className="flex items-center justify-center w-full h-64 bg-gray-200">
        <img
          src={imageUrl}
          alt={productName}
          className="object-contain w-full h-full"
        />
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-bold text-center">{productName}</h2>
      </div>
      <div className="mt-2">
        <span className="text-lg font-semibold">{price}</span>
      </div>
      <button
        className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-700"
        onClick={addToCart}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
