import React, { useState } from "react";
import { Heart, ShoppingCart, Star } from "lucide-react";

// Small helper to render a star-based rating (supports partial values)
const StarRating = ({ rating, max = 5 }) => {
  const stars = [];
  for (let i = 0; i < max; i++) {
    const partial = Math.max(0, Math.min(1, rating - i));
    const widthPercent = Math.round(partial * 100);

    // Use inline filled SVGs so the star appears solid when colored
    stars.push(
      <div key={i} className="relative w-4 h-4">
        <svg
          viewBox="0 0 24 24"
          className="absolute inset-0 w-full h-full text-gray-300"
          fill="currentColor"
          aria-hidden
        >
          <path d="M12 .587l3.668 7.431L23.327 9.6l-5.659 5.52L18.335 24 12 19.897 5.665 24l.667-8.88L.673 9.6l7.659-1.582L12 .587z" />
        </svg>
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${widthPercent}%` }}
        >
          <svg
            viewBox="0 0 24 24"
            className="absolute inset-0 w-full h-full text-yellow-400"
            fill="currentColor"
            aria-hidden
          >
            <path d="M12 .587l3.668 7.431L23.327 9.6l-5.659 5.52L18.335 24 12 19.897 5.665 24l.667-8.88L.673 9.6l7.659-1.582L12 .587z" />
          </svg>
        </div>
      </div>
    );
  }

  return <div className="flex items-center gap-0.5">{stars}</div>;
};

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
              <span className="font-medium text-gray-700 text-sm">
                {rating}
              </span>
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
