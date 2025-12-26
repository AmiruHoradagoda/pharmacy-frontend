import React, { useState } from "react";
import { Heart, ShoppingCart, Star } from "lucide-react";

const ProductCard = ({
  imageUrl,
  productName,
  description,
  price,
  addToCart,
  originalPrice,
  rating,
  reviews,
  stockQuantity,
}) => {
  const [favorite, setFavorite] = useState(false);
  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : null;

  // Small helper to render a star-based rating (supports partial values)
  const StarRating = ({ rating, max = 5 }) => {
    const stars = [];
    for (let i = 0; i < max; i++) {
      const partial = Math.max(0, Math.min(1, rating - i));
      const widthPercent = Math.round(partial * 100);

      stars.push(
        <div key={i} className="relative w-4 h-4">
          <Star className="absolute inset-0 text-gray-300" />
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${widthPercent}%` }}
          >
            <Star className="absolute inset-0 text-yellow-400" />
          </div>
        </div>
      );
    }

    return <div className="flex items-center gap-0.5">{stars}</div>;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-100 overflow-hidden group hover:shadow-md transition-all cursor-pointer flex flex-col h-full">
      <div className="relative">
        <div className="h-72 w-full bg-gray-100 overflow-hidden border-b border-gray-100">
          <img
            src={imageUrl || "/placeholder.svg"}
            alt={productName}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {discount ? (
          <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-semibold px-3 py-0.5 rounded-full">
            {discount}% OFF
          </span>
        ) : null}

        <button
          onClick={(e) => {
            e.stopPropagation();
            setFavorite((f) => !f);
          }}
          className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-sm ring-1 ring-gray-100"
          aria-label="Toggle favorite"
        >
          <Heart
            className={`h-4 w-4 ${
              favorite ? "text-red-500 fill-red-500" : "text-gray-400"
            }`}
          />
        </button>

        {stockQuantity !== undefined && stockQuantity <= 0 && (
          <span className="absolute bottom-3 left-3 bg-gray-800 text-white text-xs px-2 py-1 rounded">
            Out of stock
          </span>
        )}
      </div>

      <div className="p-6 space-y-3 flex-1 flex flex-col">
        <div>
          <h3 className="text-lg font-semibold">{productName}</h3>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>

        <div className="flex items-center gap-2">
          {rating != null && (
            <div className="flex items-center gap-2">
              <div className="flex items-center text-sm">
                <StarRating rating={rating} />
              </div>
              <span className="font-medium text-gray-700 text-sm">{rating}</span>
            </div>
          )}
          {reviews != null && (
            <span className="text-sm text-gray-500">({reviews} reviews)</span>
          )}
        </div>

        <div className="mt-auto flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold">
                ${typeof price === "number" ? price.toFixed(2) : price}
              </span>
              {originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  ${originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              if (stockQuantity === undefined || stockQuantity > 0) addToCart();
            }}
            disabled={stockQuantity !== undefined && stockQuantity <= 0}
            className={`inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm ${
              stockQuantity !== undefined && stockQuantity <= 0
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            <ShoppingCart className="h-4 w-4" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
