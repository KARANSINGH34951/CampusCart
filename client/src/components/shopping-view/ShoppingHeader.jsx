import React from 'react';
import { FaShoppingCart, FaUserCircle, FaSearch } from 'react-icons/fa';

function ShoppingHeader() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="text-2xl font-bold text-gray-800">
          CampusCart
        </a>

        {/* Links and Search Bar */}
        <div className="hidden md:flex space-x-6 items-center">
          <a href="/" className="text-gray-800 hover:text-gray-500">
            Home
          </a>
          <a href="/products" className="text-gray-800 hover:text-gray-500">
            Products
          </a>
          <a href="/categories" className="text-gray-800 hover:text-gray-500">
            Categories
          </a>

          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search products"
              className="border rounded-lg py-1 px-4 focus:outline-none focus:ring focus:ring-gray-300"
            />
            <button className="absolute right-2 top-1 text-gray-500">
              <FaSearch />
            </button>
          </div>
        </div>

        {/* Icons for Cart and User */}
        <div className="flex items-center space-x-4">
          <a href="/cart" className="text-gray-800 hover:text-gray-500">
            <FaShoppingCart className="text-2xl" />
          </a>
          <a href="/account" className="text-gray-800 hover:text-gray-500">
            <FaUserCircle className="text-2xl" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className="text-gray-800 focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden px-4 py-2">
        <a href="/" className="block py-1 text-gray-800 hover:text-gray-500">
          Home
        </a>
        <a
          href="/products"
          className="block py-1 text-gray-800 hover:text-gray-500"
        >
          Products
        </a>
        <a
          href="/categories"
          className="block py-1 text-gray-800 hover:text-gray-500"
        >
          Categories
        </a>
      </div>
    </nav>
  );
}

export default ShoppingHeader;
