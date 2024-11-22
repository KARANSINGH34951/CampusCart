import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProducts = () => {

  const branches = [
    "Computer Science", "Electronics", "Mechanical", "Civil", "Electrical", 
    "Fire and Safety", "Chemical", "Aeronautical", "Automobile", "Biotechnology", 
    "Agriculture", "Architecture", "Bio Medical", "Bio Technology", "Environmental", 
    "Fashion", "Food Technology", "Industrial", "Information Technology", 
    "Instrumentation", "Marine", "Metallurgy", "Mining", "Nuclear", "Production", 
    "Textile", "Other"
  ];

  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    branch: '',
    year: '',
    images: '',
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      alert('Please select an image before submitting.');
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('image', selectedFile);

      const uploadResponse = await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const imageUrl = uploadResponse.data.imageUrl;

      const response = await axios.post('http://localhost:3000/product/createproduct', {
        ...productData,
        images: imageUrl,
      });

      setProductData({
        name: '',
        description: '',
        price: '',
        category: '',
        branch: '',
        year: '',
        images: '',
      });
      setSelectedFile(null);
      navigate("/shop/home");
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-center text-indigo-600 mb-8">Add a New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Product Name */}
          <div>
            <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">
              Product Name
            </label>
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
            <label htmlFor="price" className="block text-lg font-medium text-gray-700 mb-2">
              Price
            </label>
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
          <label htmlFor="description" className="block text-lg font-medium text-gray-700 mb-2">
            Description
          </label>
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

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-lg font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={productData.category}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="" disabled>Select a category</option>
            <option value="Free or Donate">Free or Donate</option>
            <option value="Books and Stationery">Books and Stationery</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing and Merchandise">Clothing and Merchandise</option>
            <option value="Hostel Essentials">Hostel Essentials</option>
            <option value="Fitness and Sports">Fitness and Sports</option>
            <option value="Accessories">Accessories</option>
            <option value="Events and Tickets">Events and Tickets</option>
            <option value="Art and Craft">Art and Craft</option>
            <option value="Services">Services</option>
            <option value="Health and Wellness">Health and Wellness</option>
            <option value="Miscellaneous">Miscellaneous</option>
          </select>
        </div>

        {/* Branch */}
        <div>
          <label htmlFor="branch" className="block text-lg font-medium text-gray-700 mb-2">
            Branch
          </label>
          <select
            id="branch"
            name="branch"
            value={productData.branch}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="" disabled>Select your branch</option>
            {branches.map((branch, index) => (
              <option key={index} value={branch}>{branch}</option>
            ))}
          </select>
        </div>

        {/* Year */}
        <div>
          <label htmlFor="year" className="block text-lg font-medium text-gray-700 mb-2">
            Year
          </label>
          <select
            id="year"
            name="year"
            value={productData.year}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="" disabled>Select your year</option>
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
            <option value="4th Year">Final Year</option>
            <option value="Alumni">Alumni</option>
          </select>
        </div>

        {/* Product Image */}
        <div>
          <label htmlFor="images" className="block text-lg font-medium text-gray-700 mb-2">
            Product Image
          </label>
          <input
            type="file"
            id="images"
            name="images"
            onChange={handleFileChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {uploading && <p className="text-sm text-gray-500 mt-2">Uploading image...</p>}
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
