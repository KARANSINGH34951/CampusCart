import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex">
      {/* Left Section: Message or Image */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-indigo-600 text-white p-8 relative">
        {/* Background Image */}
        <img
          src="https://th.bing.com/th/id/OIP.EUqeSI7ZZGmSTFNWvqokkQHaE8?w=291&h=194&c=7&r=0&o=5&dpr=1.5&pid=1.7"
          alt="Campus Cart"
          className="absolute inset-0 w-full h-full object-cover opacity-60" // Image with opacity and full cover
        />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold mb-4">WELCOME TO THE CAMPUS-CART</h1>
          <h2 className="text-2xl font-semibold mb-2">FAST, EFFECTIVE, CREATIVE</h2>
          <h2 className="text-lg italic">--Just order--</h2>
        </div>
      </div>

      {/* Right Section: Outlet */}
      <div className="w-1/2 flex justify-center items-center p-8 bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
