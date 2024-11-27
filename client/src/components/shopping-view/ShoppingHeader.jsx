import axios from 'axios';
import React from 'react';
import { FaShoppingCart, FaUserCircle, FaSearch } from 'react-icons/fa';
import {useNavigate} from "react-router-dom"
import {useDispatch} from "react-redux"
import { logout } from '../../store/auth-slice';


function ShoppingHeader() {
  const navigate=useNavigate();
  const dispatch=useDispatch();

  const handlelogout = async () => {
    try {
      const response = await axios.get("http://localhost:3000/auth/logout"); // Fix protocol
      console.log(response.data); // Log server response
  
      if (response.status === 200) { // Check if logout is successful
        dispatch(logout()); // Dispatch logout action
        navigate("/"); // Redirect to home
      } else {
        console.error("Logout failed: ", response.data);
      }
    } catch (error) {
      console.error("Error during logout: ", error);
    }
  };
                 

  return (
  <div>
         <header className="absolute inset-x-0 top-0 z-10 w-full">
        <div className="px-4 mx-auto sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 lg:h-20">
                <div className="flex-shrink-0">
                    <a href="#" title="" className="flex">
                        <img className="w-auto h-8" src="https://th.bing.com/th/id/OIP.Jc4_fewy2DM4SNzlqWDRYAHaHa?w=165&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7" alt="" />
                    </a>
                </div>

                <div className="hidden lg:flex lg:items-center lg:justify-center lg:space-x-10">
                    <a href="#" title="" className="text-base text-white transition-all duration-200 hover:text-opacity-80"> Features </a>

                    <a href="#" title="" className="text-base text-white transition-all duration-200 hover:text-opacity-80"> Solutions </a>

                    <a href="#" title="" className="text-base text-white transition-all duration-200 hover:text-opacity-80"> Resources </a>

                    <a href="#" title="" className="text-base text-white transition-all duration-200 hover:text-opacity-80"> Pricing </a>
                </div>

                <div className="lg:flex lg:items-center lg:justify-end lg:space-x-6 sm:ml-auto">
                    <button onClick={handlelogout} title="" className="hidden text-base text-white transition-all duration-200 lg:inline-flex hover:text-opacity-80"> Log out </button>

                    <a href="#" title="" className="inline-flex items-center justify-center px-3 sm:px-5 py-2.5 text-sm sm:text-base font-semibold transition-all duration-200 text-white bg-white/20 hover:bg-white/40 focus:bg-white/40 rounded-lg" role="button"> Apply for free </a>
                </div>

                <button
  type="button"
  className="inline-flex p-2 ml-1 text-white transition-all duration-200 rounded-md sm:ml-4 lg:hidden focus:bg-gray-800 hover:bg-gray-800"
>
  {/* Menu open: "hidden", Menu closed: "block" */}
  <svg
    className="block w-6 h-6"
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
  {/* Menu open: "block", Menu closed: "hidden" */}
  <svg
    className="hidden w-6 h-6"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
</button>

            </div>
        </div>
    </header>
    
  </div>
  );
}

export default ShoppingHeader;
