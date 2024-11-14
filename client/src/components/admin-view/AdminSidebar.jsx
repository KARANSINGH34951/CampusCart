import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Items = [
  { title: "Home", icon: "", url: "/admin/dashboard" },
  { title: "Products", icon: "", url: "/admin/products" },
  { title: "Feature", icon: "", url: "/admin/feature" },
  { title: "Orders", icon: "", url: "/admin/orders" }
];

const AdminSidebar = () => {
  const [toggle,settoggle]=useState(true)
  const navigate = useNavigate();

  const handleToggle=()=>{
    settoggle(!toggle)
  }

  return (
    <div className='mt-20 p-4 bg-gray-800 text-white h-full'>
        <div className='flex justify-end items-center'>
          
        <button onClick={handleToggle} className="fixed top-4 right-4 p-2 bg-gray-800 text-white rounded">
        {toggle ? 'Close' : 'Open'} Sidebar
      </button>
        </div>
      
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
