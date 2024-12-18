import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CategoryFilter from '../../components/shopping-view/CategoryFilter';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  // Fetch products
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/product/getproducts');
      setProducts(response.data.allProducts);
      setFilteredProducts(response.data.allProducts);
      // Extract unique categories
      const uniqueCategories = [
        ...new Set(response.data.allProducts.map((product) => product.category)),
      ];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleBuyNow = (product) => {
    console.log('Buy Now:', product);
    navigate("/shop/buynow", { state: { product } });
  };

  const handleAddToCart = (product) => {
    console.log('Add to Cart:', product);
    
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle category selection
  const handleCategorySelect = (category) => {
    if (category) {
      const filtered = products.filter((product) => product.category === category);
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products); // Show all products if no category is selected
    }
  };

  const handleAddProduct = () => {
    navigate('/shop/addproduct');
  };

  return (
    <div className="flex p-6">
      {/* Left Sidebar for Category Filter */}
      <aside className="mr-6 w-1/4">
        <CategoryFilter categories={categories} onCategorySelect={handleCategorySelect} />
      </aside>

      {/* Products Section */}
      <div className="flex-1">
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-[#1A1A1A]/80 text-[#EAEAEA] shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-all"
              >
                <img
                  src={product.images || 'https://via.placeholder.com/150'}
                  alt={product.name}
                  className="w-full h-48 object-cover mb-4"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-lg font-bold text-blue-500">${product.price}</p>
                    <p className="text-sm text-yellow-600">{product.ratings} / 5</p>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">Branch: {product.branch}</p>
                  <p className="text-sm text-gray-500 mb-2">Year: {product.year}</p>
                  <p className="text-sm text-gray-500 mb-2">Category: {product.category}</p>

                 
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleBuyNow(product)}
                      className="flex-1 bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition-all"
                    >
                      Buy Now
                    </button>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-all"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No products available at the moment.</p>
        )}
        <button
          onClick={handleAddProduct}
          className="fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg text-3xl flex items-center justify-center hover:bg-blue-600 transition-all"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Home;
