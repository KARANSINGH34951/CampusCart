import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); 

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/product/getproducts");
      setProducts(response.data.allProducts); 
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddProduct = () => {
    navigate("/shop/addproduct"); 
  };

  return (
    <div className="text-center p-6">
      <h1 className="text-3xl font-bold mb-8">Home Page</h1>
      <div className="flex flex-wrap justify-center gap-6">
        {products.map((product) => (
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
            <p className="text-sm text-green-600">In Stock: {product.stock}</p>
          </div>
        ))}
      </div>

   
      <button 
        onClick={handleAddProduct} 
        className="fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg text-3xl flex items-center justify-center hover:bg-blue-600 transition-all"
      >
        +
      </button>
    </div>
  );
};

export default Home;
