import React from "react";
import { Link } from "react-router-dom";
import { FiHome, FiClipboard, FiUsers, FiSettings, FiLogOut } from "react-icons/fi";

const AdminDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white flex flex-col p-5">
        <div className="text-2xl font-bold mb-10">Admin Panel</div>
        <nav className="flex flex-col gap-6">
          <Link to="/admin" className="flex items-center gap-2 text-lg hover:text-amber-300">
            <FiHome /> Dashboard
          </Link>
          <Link to="/admin/orders" className="flex items-center gap-2 text-lg hover:text-amber-300">
            <FiClipboard /> Orders
          </Link>
          <Link to="/admin/users" className="flex items-center gap-2 text-lg hover:text-amber-300">
            <FiUsers /> Users
          </Link>
          <Link to="/admin/settings" className="flex items-center gap-2 text-lg hover:text-amber-300">
            <FiSettings /> Restaurants
          </Link>
          <button className="flex items-center gap-2 text-lg hover:text-red-400 mt-auto">
            <FiLogOut /> Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="grid grid-cols-3 gap-6 mt-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Total Orders</h2>
            <p className="text-2xl font-bold">120</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Users</h2>
            <p className="text-2xl font-bold">350</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Revenue</h2>
            <p className="text-2xl font-bold">$15,000</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
