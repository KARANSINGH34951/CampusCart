import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Charts from '../../components/admin-view/Charts';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/admin');
      setUsers(response.data.users);
      console.log(response.data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className="text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-700">Admin Dashboard</h1>
        <p className="text-gray-600">Manage and monitor your application’s users and data.</p>
      </header>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Stat Card */}
        <div className="bg-blue-500 text-white rounded-lg shadow-lg p-6 flex flex-col items-center">
          <h2 className="text-xl font-semibold">Total Users</h2>
          <p className="text-4xl font-bold mt-4">{users.length}</p>
        </div>
        <div className="bg-green-500 text-white rounded-lg shadow-lg p-6 flex flex-col items-center">
          <h2 className="text-xl font-semibold">Active Users</h2>
          <p className="text-4xl font-bold mt-4">45</p>
        </div>
        <div className="bg-red-500 text-white rounded-lg shadow-lg p-6 flex flex-col items-center">
          <h2 className="text-xl font-semibold">Admins</h2>
          <p className="text-4xl font-bold mt-4">5</p>
        </div>
      </div>

      {/* Charts Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Overview</h2>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <Charts />
        </div>
      </section>

      {/* Users Table */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Users List</h2>
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg p-4">
          <table className="w-full border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-4 text-left border-b">Name</th>
                <th className="p-4 text-left border-b">Email</th>
                <th className="p-4 text-left border-b">Role</th>
                <th className="p-4 text-left border-b">Created At</th>
                <th className="p-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="p-4 border-b">{user.userName}</td>
                  <td className="p-4 border-b">{user.email}</td>
                  <td className="p-4 border-b capitalize">{user.role}</td>
                  <td className="p-4 border-b">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 border-b">
                    <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
