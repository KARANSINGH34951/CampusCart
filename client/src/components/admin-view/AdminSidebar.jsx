import React from 'react';
import { useNavigate } from 'react-router-dom';

const Items = [
  { title: "Home", icon: "🏠", url: "/admin/dashboard" },
  { title: "Products", icon: "📦", url: "/admin/products" },
  { title: "Feature", icon: "✨", url: "/admin/feature" },
  { title: "Orders", icon: "🛒", url: "/admin/orders" },
];

const AdminSidebar = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-800 text-white w-full h-full">
      {/* Close Button */}
      <div className="p-4 flex justify-end">
        <button
          className="text-white text-2xl"
          onClick={toggleSidebar}
        >
          ✕
        </button>
      </div>

      {/* Sidebar Items */}
      <div className="p-4">
        <h1 className="text-lg font-semibold mb-4">Admin</h1>
        {Items.map((item) => (
          <div
            key={item.title}
            className="text-white mb-4 cursor-pointer hover:bg-gray-700 p-2 rounded flex items-center"
            onClick={() => navigate(item.url)}
          >
            <span className="mr-2">{item.icon}</span>
            <h1>{item.title}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSidebar;
