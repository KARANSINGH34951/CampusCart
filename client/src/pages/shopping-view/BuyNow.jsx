import { useLocation } from "react-router-dom";

const BuyNow = () => {
  const location = useLocation();
  const { product } = location.state;

  const handleAddToCart = () => {
    console.log("Added to cart:", product.name);
  };

  const handleBuyNow = () => {
    console.log("Buy Now clicked for:", product.name);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <img
            src={product.images}
            alt="Product"
            className="w-full h-64 object-cover rounded-md"
          />
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
              <p className="text-gray-600 mt-4">
                Price: <span className="text-green-500 font-semibold">₹{product.price}</span>
              </p>
              <p className="text-gray-700 mt-2">Description: {product.description || "No description available."}</p>
            </div>
            <div className="flex gap-4 mt-6">
              <button
                onClick={handleAddToCart}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyNow;
