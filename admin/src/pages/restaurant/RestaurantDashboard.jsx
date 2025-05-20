import React, { useState, useEffect } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { GiForkKnifeSpoon } from "react-icons/gi";
import {
  FiHome,
  FiBox,
  FiUser,
  FiCreditCard,
  FiLogOut,
  FiMenu,
} from "react-icons/fi";
import axiosInstance from "../../config/axiosInstance";
import toast from "react-hot-toast";
import useFetch from "../../hooks/useFetch";

const RestaurantDashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [data, isLoading, error] = useFetch(
    "/restaurant/get/restaurant/profile"
  );
  const restaurantName = data?.findRestaurant?.name;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post("/restaurant/logout");
      toast.success(response?.data?.message || "Logout successful");
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 100);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Logout failed");
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-orange-50">
      
      {isMobile && (
        <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-orange-600 to-red-600 text-white p-4 z-30 flex justify-between items-center shadow-md">
          <div className="text-xl font-bold flex items-center">
            <GiForkKnifeSpoon className="mr-2" />
            {restaurantName || "Dashboard"}
          </div>
          <button
            onClick={toggleSidebar}
            className="text-white focus:outline-none hover:text-amber-200 transition-colors"
          >
            <FiMenu size={24} />
          </button>
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 transform transition-transform duration-300 ease-in-out
        w-64 bg-gradient-to-b from-gray-800 to-gray-900 text-white flex flex-col p-5 fixed inset-0 z-20 ${
          isMobile ? "mt-16" : "mt-0"
        } shadow-xl`}
      >
        
        <div className="mb-10 pt-4 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-orange-300 mb-3">
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
              alt="Restaurant"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-xl font-bold text-center">{restaurantName}</h2>
          <p className="text-gray-400 text-sm mt-1">Restaurant Dashboard</p>
        </div>

        
        <nav className="flex flex-col gap-2 flex-grow">
          <Link
            to="/restaurant/dashboard"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 hover:text-amber-300 transition-all duration-200 group"
            onClick={() => isMobile && setSidebarOpen(false)}
          >
            <div className="w-8 h-8 rounded-full bg-gray-700 group-hover:bg-amber-300 group-hover:text-gray-800 flex items-center justify-center transition-all duration-200">
              <FiHome className="group-hover:text-gray-800" />
            </div>
            Dashboard
          </Link>
          <Link
            to="/restaurant/menu"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 hover:text-amber-300 transition-all duration-200 group"
            onClick={() => isMobile && setSidebarOpen(false)}
          >
            <div className="w-8 h-8 rounded-full bg-gray-700 group-hover:bg-amber-300 group-hover:text-gray-800 flex items-center justify-center transition-all duration-200">
              <GiForkKnifeSpoon className="group-hover:text-gray-800" />
            </div>
            Menu
          </Link>
          <Link
            to="/restaurant/orders"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 hover:text-amber-300 transition-all duration-200 group"
            onClick={() => isMobile && setSidebarOpen(false)}
          >
            <div className="w-8 h-8 rounded-full bg-gray-700 group-hover:bg-amber-300 group-hover:text-gray-800 flex items-center justify-center transition-all duration-200">
              <FiBox className="group-hover:text-gray-800" />
            </div>
            Orders
          </Link>
          <Link
            to="/restaurant/profile"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 hover:text-amber-300 transition-all duration-200 group"
            onClick={() => isMobile && setSidebarOpen(false)}
          >
            <div className="w-8 h-8 rounded-full bg-gray-700 group-hover:bg-amber-300 group-hover:text-gray-800 flex items-center justify-center transition-all duration-200">
              <FiUser className="group-hover:text-gray-800" />
            </div>
            Profile
          </Link>
          {/* <Link
            to="/restaurant/payments"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 hover:text-amber-300 transition-all duration-200 group"
            onClick={() => isMobile && setSidebarOpen(false)}
          >
            <div className="w-8 h-8 rounded-full bg-gray-700 group-hover:bg-amber-300 group-hover:text-gray-800 flex items-center justify-center transition-all duration-200">
              <FiCreditCard className="group-hover:text-gray-800" />
            </div>
            Payments
          </Link> */}
        </nav>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 hover:text-red-400 transition-all duration-200 group mt-auto mb-4"
        >
          <div className="w-8 h-8 rounded-full bg-gray-700 group-hover:bg-red-400 group-hover:text-white flex items-center justify-center transition-all duration-200">
            <FiLogOut className="group-hover:text-white" />
          </div>
          Logout
        </button>

        
        <div className="text-xs text-gray-500 text-center pt-2 border-t border-gray-700">
          v1.0.0 • Online
        </div>
      </div>

      
      {sidebarOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen && !isMobile ? "ml-64" : ""
        } p-5 ${isMobile ? "pt-20" : "pt-5"}`}
      >
        <div className="bg-white rounded-xl shadow-sm p-6 min-h-[calc(100vh-40px)]">
          {/* Background Image for Dashboard */}
          <div className="relative overflow-hidden rounded-lg mb-6">
            <img
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
              alt="Restaurant Background"
              className="w-full h-48 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
              <h1 className="text-3xl font-bold text-white">
                 {restaurantName}
              </h1>
            </div>
          </div>
          
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default RestaurantDashboard;