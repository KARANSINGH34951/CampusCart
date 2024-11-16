import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Items = [
  { title: "Home", icon: "", url: "/admin/dashboard" },
  { title: "Products", icon: "", url: "/admin/products" },
  { title: "Feature", icon: "", url: "/admin/feature" },
  { title: "Orders", icon: "", url: "/admin/orders" }
];

const AdminSidebar = () => {
  const navigate = useNavigate();

  return (
    <div className='mt-20 p-4 bg-gray-800 text-white h-full'>
      
      <h1 className='text-lg font-semibold mb-4' >Admin</h1>

      {Items.map((item) => (
        <div 
          key={item.title}
          className='text-white mb-4 cursor-pointer hover:bg-gray-700 p-2 rounded'
          onClick={() => navigate(item.url)}
        >
          <h1>{item.title}</h1>
        </div>
      ))}
    </div>
  );
}

export default AdminSidebar;
