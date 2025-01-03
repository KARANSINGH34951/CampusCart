import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CategoryFilter from "../../components/shopping-view/CategoryFilter";
import ProductCard from "./ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  // Fetch products and categories
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://campuscart-campus-cart.up.railway.app/product/getproducts"
      );

      if (response.data?.allProducts) {
        const products = response.data.allProducts;

        setProducts(products);
        setFilteredProducts(products);

        // Extract unique categories
        const uniqueCategories = [
          ...new Set(products.map((product) => product.category)),
        ];
        setCategories(uniqueCategories);
      } else {
        console.error("Unexpected API response:", response.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("Failed to fetch products. Please try again later.");
    }
  };

  // Handle product actions
  const handleBuyNow = (product) => {
    console.log("Navigating to Buy Now with product:", product);
    navigate("/shop/buynow", { state: { product } });
  };

  const handleAddToCart = async (product) => {
    console.log("Adding product to cart:", product);
    try {
      const userId = "USER_ID_FROM_AUTH"; // Replace with actual user ID from authentication

      const response = await axios.post(
        "https://campuscart-campus-cart.up.railway.app/cart/add",
        {
          userId,
          productId: product._id,
          quantity: 1,
        }
      );

      if (response.data?.success) {
        console.log("Product added to cart successfully:", response.data.cart);
        alert("Product added to cart!");
      } else {
        console.error("Error adding product to cart:", response.data.message);
        alert("Failed to add product to cart.");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("An error occurred while adding the product to the cart.");
    }
  };

  // Navigate to Add Product page
  const handleAddProduct = () => {
    navigate("/shop/addproduct");
  };

  // Handle category filter
  const handleCategorySelect = (category) => {
    console.log("Category selected:", category);
    if (category) {
      const filtered = products.filter((product) => product.category === category);
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row p-6 gap-6 bg-gray-50 h-auto">
      {/* Left Sidebar for Category Filter */}
      <aside className="lg:w-1/4 w-full bg-gradient-to-b from-blue-900 to-blue-600 text-white p-6 rounded-md shadow-lg mb-6 lg:mb-0">
        <h2 className="text-lg font-semibold mb-4">Categories</h2>
        <CategoryFilter
          categories={categories}
          onCategorySelect={handleCategorySelect}
        />
      </aside>

      {/* Products Section */}
      <div className="flex-1">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6 items-center justify-center">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onBuyNow={handleBuyNow}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">
            No products available at the moment.
          </p>
        )}
        <button
          onClick={handleAddProduct}
          className="fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg text-3xl flex items-center justify-center hover:bg-blue-600 transition-transform transform hover:scale-110"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Home;
