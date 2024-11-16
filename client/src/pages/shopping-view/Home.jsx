import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CategoryFilter from '../../components/shopping-view/CategoryFilter'; // Import the filter component

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

  const handleBuyNow=()=>{
    console.log("Buy Now");
    
  }

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
      <aside className="mr-6">
        <CategoryFilter categories={categories} onCategorySelect={handleCategorySelect} />
      </aside>

      {/* Products Section */}
      <div className="flex-1">
  <h1 className="text-3xl font-bold mb-8 text-center">Home Page</h1>
    {
      products.length>0? (
        <div className="flex flex-wrap justify-center gap-6">
        {filteredProducts.map((product) => (
          <div key={product._id} className="bg-white shadow-lg rounded-lg p-4 w-72">
            <img
              src={product.images || 'https://via.placeholder.com/150'}
              alt={product.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <p className="text-lg font-bold text-blue-500 mb-2">Price: ${product.price}</p>
            <p className="text-sm text-gray-500 mb-1">Category: {product.category}</p>
            <p className="text-sm text-yellow-600 mb-1">Rating: {product.ratings} / 5</p>
            <p className="text-sm text-green-600 mb-4">In Stock: {product.stock}</p>
            
            {/* Buy Now Button */}
            <button
              onClick={() => handleBuyNow(product)}
              className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition-all"
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
      ):( "fnf" )
    }

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
