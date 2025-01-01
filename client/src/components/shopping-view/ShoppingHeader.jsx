import axios from "axios";
import React, { useState } from "react";
import { FaShoppingCart, FaUserCircle, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/auth-slice";

function ShoppingHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/auth/logout"
      );
      if (response.status === 200) {
        dispatch(logout());
        navigate("/");
      } else {
        console.error("Logout failed: ", response.data);
      }
    } catch (error) {
      console.error("Error during logout: ", error);
    }
  };

  return (
    <header className="bg-gray-800 text-white fixed inset-x-0 top-0 z-50 shadow-lg">
      <div className="px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a
              href="#"
              className="flex items-center text-white text-lg font-bold space-x-2"
            >
              <img
                className="w-10 h-auto"
                src="https://th.bing.com/th/id/OIP.Jc4_fewy2DM4SNzlqWDRYAHaHa?w=165&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7"
                alt="CampusCart Logo"
              />
              <span>CampusCart</span>
            </a>
          </div>

          <div className="flex-grow flex justify-center mx-4">
            <div className="relative w-3/5">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full px-4 py-2 text-gray-800 rounded-xl focus:ring-2 focus:ring-black focus:outline-none"
              />
              <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="relative">
              <button className="flex items-center text-white relative">
                <span className="ml-2 hidden lg:inline-block">
                  <FaShoppingCart className="text-xl" />
                </span>
                <span className="absolute -top-3 -right-3 flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
                  3
                </span>
              </button>
            </div>

            
            <div className="relative">
              <button
                className="flex items-center space-x-2"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              >
                <FaUserCircle className="text-xl" />
                <span className="hidden lg:inline-block">My Account</span>
              </button>
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg text-gray-800 transition-opacity duration-300 opacity-100">
                  <a
                    href="/orders"
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    My Orders
                  </a>
                  <a
                    href="/wishlist"
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    Wishlist
                  </a>
                  <a
                    href="/account"
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    Account Settings
                  </a>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-200"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default ShoppingHeader;
