import axios from "axios";
import React from "react";
import { FaShoppingCart, FaUserCircle, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/auth-slice";

function ShoppingHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "https://campuscart-campus-cart.up.railway.app/auth/logout"
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
    <header className="bg-gray-900 text-white fixed inset-x-0 top-0 z-10 shadow-lg">
      <div className="px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#" className="flex items-center">
              <img
                className="w-auto h-8"
                src="https://th.bing.com/th/id/OIP.Jc4_fewy2DM4SNzlqWDRYAHaHa?w=165&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7"
                alt="CampusCart Logo"
              />
            </a>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex lg:items-center lg:space-x-8">
            <a
              href="#"
              className="text-base font-medium transition duration-200 hover:text-gray-300"
            >
              Features
            </a>
            <a
              href="#"
              className="text-base font-medium transition duration-200 hover:text-gray-300"
            >
              Solutions
            </a>
            <a
              href="#"
              className="text-base font-medium transition duration-200 hover:text-gray-300"
            >
              Resources
            </a>
            <a
              href="#"
              className="text-base font-medium transition duration-200 hover:text-gray-300"
            >
              Pricing
            </a>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLogout}
              className="hidden lg:inline-flex items-center px-4 py-2 text-sm font-medium bg-red-500 rounded-md shadow-sm hover:bg-red-600 transition"
            >
              Log out
            </button>

            <a
              href="#"
              className="inline-flex items-center px-4 py-2 text-sm font-medium bg-blue-500 rounded-md shadow-sm hover:bg-blue-600 transition"
            >
              Apply for free
            </a>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              className="inline-flex items-center p-2 text-gray-300 rounded-md lg:hidden hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default ShoppingHeader;
