import React, { useState } from 'react';
import axios from 'axios';

const AddProducts = () => {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    images: '',
    ratings: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/products/add', productData);
      alert('Product added successfully!');
      setProductData({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        images: '',
        ratings: 0,
      });
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-center text-indigo-600 mb-8">Add a New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Product Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">Product Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={productData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
              placeholder="Enter product name"
            />
          </div>

          {/* Price */}
          <div>
            <label htmlFor="price" className="block text-lg font-medium text-gray-700 mb-2">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={productData.price}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
              min="0"
              placeholder="Enter product price"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-lg font-medium text-gray-700 mb-2">Description</label>
          <textarea
            id="description"
            name="description"
            value={productData.description}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
            placeholder="Enter product description"
          ></textarea>
        </div>

        {/* Category and Stock */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-lg font-medium text-gray-700 mb-2">Category</label>
            <input
              type="text"
              id="category"
              name="category"
              value={productData.category}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
              placeholder="Enter product category"
            />
          </div>

          {/* Stock */}
          <div>
            <label htmlFor="stock" className="block text-lg font-medium text-gray-700 mb-2">Stock</label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={productData.stock}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              min="0"
              placeholder="Enter product stock"
            />
          </div>
        </div>

        {/* Image URL */}
        <div>
          <label htmlFor="images" className="block text-lg font-medium text-gray-700 mb-2">Image URL</label>
          <input
            type="text"
            id="images"
            name="images"
            value={productData.images}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter image URL (optional)"
          />
        </div>

        {/* Ratings */}
        <div>
          <label htmlFor="ratings" className="block text-lg font-medium text-gray-700 mb-2">Ratings</label>
          <input
            type="number"
            id="ratings"
            name="ratings"
            value={productData.ratings}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            min="0"
            max="5"
            placeholder="Rate the product (0 to 5)"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="w-full p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProducts;
