import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FormInputGroup from './FormInputGroup';

const AddProductForm = () => {
  const branches = [
    'Computer Science', 'Electronics', 'Mechanical', 'Civil', 'Electrical',
    'Fire and Safety', 'Chemical', 'Aeronautical', 'Automobile', 'Biotechnology',
    'Agriculture', 'Architecture', 'Environmental', 'Fashion', 'Food Technology',
    'Industrial', 'Information Technology', 'Marine', 'Metallurgy', 'Mining',
    'Nuclear', 'Production', 'Textile', 'Other'
  ];

  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    name: '', description: '', price: '', category: '', branch: '', year: '', images: ''
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleFileChange = (e) => setSelectedFile(e.target.files[0]);

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

      const { data } = await axios.post(
        'http://localhost:3000/upload',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      await axios.post('http://localhost:3000/product/createproduct', {
        ...productData, images: data.imageUrl,
      });

      setProductData({ name: '', description: '', price: '', category: '', branch: '', year: '', images: '' });
      setSelectedFile(null);
      navigate('/shop/home');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
    <div className="bg-white shadow-md rounded-lg p-8 max-w-5xl mx-auto">
      {/* Form Heading */}
      <h1 className="text-4xl font-semibold text-indigo-700 text-center mb-6">
        Add a New Product
      </h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Name */}
        <div className="col-span-1">
          <FormInputGroup
            label="Product Name"
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            placeholder="Enter product name"
            required
          />
        </div>
  
        {/* Price */}
        <div className="col-span-1">
          <FormInputGroup
            label="Price"
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            placeholder="Enter product price"
            required
            min="0"
          />
        </div>
  
        {/* Category */}
        <div className="col-span-1 md:col-span-2">
          <FormInputGroup
            label="Category"
            type="select"
            name="category"
            value={productData.category}
            onChange={handleChange}
            options={[
              'Free or Donate', 'Books and Stationery', 'Electronics', 'Clothing and Merchandise',
              'Hostel Essentials', 'Fitness and Sports', 'Accessories', 'Events and Tickets',
              'Art and Craft', 'Services', 'Health and Wellness', 'Miscellaneous',
            ]}
            placeholder="Select a category"
            required
          />
        </div>
  
        {/* Branch */}
        <div className="col-span-1">
          <FormInputGroup
            label="Branch"
            type="select"
            name="branch"
            value={productData.branch}
            onChange={handleChange}
            options={branches}
            placeholder="Select your branch"
            required
          />
        </div>
  
        {/* Year */}
        <div className="col-span-1">
          <FormInputGroup
            label="Year"
            type="select"
            name="year"
            value={productData.year}
            onChange={handleChange}
            options={['1st Year', '2nd Year', '3rd Year', 'Final Year', 'Alumni']}
            placeholder="Select your year"
            required
          />
        </div>
  
        {/* Product Image */}
        <div className="col-span-1 md:col-span-2">
          <FormInputGroup
            label="Product Image"
            type="file"
            name="images"
            onChange={handleFileChange}
            uploading={uploading}
            uploadMessage="Uploading image..."
            placeholder="Upload product image"
          />
        </div>
  
        {/* Product Description */}
        <div className="col-span-1 md:col-span-2">
          <FormInputGroup
            label="Product Description"
            type="textarea"
            name="description"
            value={productData.description}
            onChange={handleChange}
            placeholder="Enter product description"
            required
            rows="4"
          />
        </div>
  
        {/* Submit Button */}
        <div className="col-span-1 md:col-span-2">
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  </div>
  
  );
};

export default AddProductForm;
