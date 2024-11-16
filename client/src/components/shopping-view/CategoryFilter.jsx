import React, { useState } from 'react';

const CategoryFilter = ({ categories, onCategorySelect }) => {
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    onCategorySelect(category);
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md w-64">
      <h2 className="text-xl font-semibold mb-4">Filter by Category</h2>
      <ul className="space-y-2">
        <li
          className={`cursor-pointer p-2 rounded-md ${
            !selectedCategory ? 'bg-blue-500 text-white' : ''
          }`}
          onClick={() => handleCategoryClick('')}
        >
          All
        </li>
        {categories.map((category, index) => (
          <li
            key={index}
            className={`cursor-pointer p-2 rounded-md ${
              selectedCategory === category ? 'bg-blue-500 text-white' : 'hover:bg-blue-100'
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryFilter;
