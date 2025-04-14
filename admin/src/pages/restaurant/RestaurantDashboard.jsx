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
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Header */}
      {isMobile && (
        <div className="fixed top-0 left-0 right-0 bg-gray-800 text-white p-4 z-10 flex justify-between items-center">
          <div className="text-xl font-bold"></div>
          <button
            onClick={toggleSidebar}
            className="text-white focus:outline-none"
          >
            <FiMenu size={24} />
          </button>
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 transform transition-transform duration-300 ease-in-out
        w-64 bg-gray-800 text-white flex flex-col p-5 fixed inset-0 z-20 mt-${
          isMobile ? "16" : "0"
        }`}
      >
        <div className="text-2xl font-bold mb-10 flex items-center">
          <span>{restaurantName}</span>
        </div>

        <nav className="flex flex-col gap-4 flex-grow">
          <Link
            to="/restaurant/dashboard"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 hover:text-amber-300 transition-colors"
            onClick={() => isMobile && setSidebarOpen(false)}
          >
            <FiHome size={20} /> Dashboard
          </Link>
          <Link
            to="/restaurant/menu"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 hover:text-amber-300 transition-colors"
            onClick={() => isMobile && setSidebarOpen(false)}
          >
            <GiForkKnifeSpoon size={20} /> Menu
          </Link>
          <Link
            to="/restaurant/orders"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 hover:text-amber-300 transition-colors"
            onClick={() => isMobile && setSidebarOpen(false)}
          >
            <FiBox size={20} /> Orders
          </Link>
          <Link
            to="/restaurant/profile"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 hover:text-amber-300 transition-colors"
            onClick={() => isMobile && setSidebarOpen(false)}
          >
            <FiUser size={20} /> Restaurant
          </Link>
          <Link
            to="/restaurant/payments"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 hover:text-amber-300 transition-colors"
            onClick={() => isMobile && setSidebarOpen(false)}
          >
            <FiCreditCard size={20} /> Payments
          </Link>
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 hover:text-red-400 transition-colors mt-auto"
        >
          <FiLogOut size={20} /> Logout
        </button>
      </div>

      {/* Overlay for mobile */}
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
        } p-5 pt-${isMobile ? "20" : "5"}`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default RestaurantDashboard;
