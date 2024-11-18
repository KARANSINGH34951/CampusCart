import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gray-100 shadow-md p-4 flex items-center">
        <button className="text-gray-800 mr-4 text-2xl" onClick={toggleSidebar}>
          ☰
        </button>
        <AdminHeader />
      </div>

      {/* Sidebar and Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        {isSidebarOpen && (
          <div className="fixed top-[64px] left-0 w-1/4 bg-gray-800 h-[calc(100vh-64px)] z-20">
            <AdminSidebar toggleSidebar={toggleSidebar} />
          </div>
        )}

        {/* Main Content */}
        <div className={`flex-1 p-8 bg-gray-50 ${isSidebarOpen ? 'ml-1/4' : 'ml-0'}`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
