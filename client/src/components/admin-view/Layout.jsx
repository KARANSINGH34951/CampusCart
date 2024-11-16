import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

const AdminLayout = () => {
  return (
    <div className='flex min-h-screen w-full'>
      {/* Sidebar */}
      <div className='w-1/4 bg-gray-800 text-white fixed h-screen shadow-lg'>
    
        <AdminSidebar />
      </div>
      
      {/* Main Content Area */}
      <div className='flex-1 ml-1/4'>
        {/* Header */}
        <div className='sticky top-0 z-10 bg-gray-100 shadow-md p-4'>
          <AdminHeader />
        </div>

        {/* Main Content */}
        <main className='p-8 bg-gray-50 min-h-screen w-full flex justify-center'>
          {/* <h1 className='text-2xl font-semibold text-gray-800 mb-6'>Admin Page</h1> */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
