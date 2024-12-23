import React from "react";

const ProductCard = ({ product, onBuyNow, onAddToCart }) => {
  return (
    <div className="bg-white text-gray-800 shadow-lg rounded-lg overflow-hidden transform hover:scale-105 hover:shadow-xl transition-all w-72">
      <img
        src={product.images || "https://via.placeholder.com/150"}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg font-bold text-blue-500">₹{product.price}</p>
          <p className="text-sm text-yellow-500">
            ⭐ {product.ratings} / 5
          </p>
        </div>
        <p className="text-sm text-gray-500 mb-2">Branch: {product.branch}</p>
        <p className="text-sm text-gray-500 mb-2">Year: {product.year}</p>
        <p className="text-sm text-gray-500 mb-4">Category: {product.category}</p>

        <div className="flex gap-2">
          <button
            onClick={() => onBuyNow(product)}
            className="flex-1 bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition-all"
          >
            Buy Now
          </button>
          <button
            onClick={() => onAddToCart(product)}
            className="flex-1 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-all"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
