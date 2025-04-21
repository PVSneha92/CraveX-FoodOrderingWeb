import React from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { MdOutlineFoodBank } from "react-icons/md";
import { FiHome, FiUsers, FiCheck, FiLogOut, FiMenu, FiGift } from "react-icons/fi";
import axiosInstance from "../../config/axiosInstance";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

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
      const response = await axiosInstance.post("/admin/logout");
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
      {isMobile && (
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed top-0 left-0 right-0 bg-gradient-to-r from-gray-800 to-gray-700 text-white p-4 z-20 flex justify-between items-center shadow-md"
        >
          <div className="text-xl font-bold flex items-center">
            <MdOutlineFoodBank className="mr-2 text-amber-400" size={24} />
            <span>CraveX Admin</span>
          </div>
          <button
            onClick={toggleSidebar}
            className="text-white focus:outline-none hover:text-amber-300 transition-colors"
          >
            <FiMenu size={24} />
          </button>
        </motion.div>
      )}

      <AnimatePresence>
        {(sidebarOpen || !isMobile) && (
          <motion.div
            initial={isMobile ? { x: -300 } : { x: 0 }}
            animate={isMobile ? { x: 0 } : { x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`w-64 bg-gradient-to-b from-gray-800 to-gray-900 text-white flex flex-col p-5 fixed inset-0 z-20 ${
              isMobile ? "mt-16" : "mt-0"
            } shadow-xl`}
          >
            <div className="text-2xl font-bold mb-10 flex items-center">
              <MdOutlineFoodBank className="mr-2 text-amber-400" size={28} />
              <span>CraveX</span>
            </div>

            <nav className="flex flex-col gap-2 flex-grow">
              {[
                { to: "/admin", icon: <FiHome size={20} />, text: "Dashboard" },
                {
                  to: "/admin/restaurants",
                  icon: <MdOutlineFoodBank size={20} />,
                  text: "Restaurants",
                },
                {
                  to: "/admin/users",
                  icon: <FiUsers size={20} />,
                  text: "Users",
                },
                {
                  to: "/admin/verify/restaurant",
                  icon: <FiCheck size={20} />,
                  text: "Verify",
                },
                {
                  to: "/admin/all/payments",
                  icon: <LiaRupeeSignSolid size={20} />,
                  text: "Payments",
                },
                {
                  to: "/admin/coupon",
                  icon: <FiGift size={20} />,
                  text: "Coupon",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to={item.to}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 hover:text-amber-300 transition-colors duration-200"
                    onClick={() => isMobile && setSidebarOpen(false)}
                  >
                    <span className="text-amber-400">{item.icon}</span>
                    {item.text}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.button
              onClick={handleLogout}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 hover:text-red-400 transition-colors duration-200 mt-auto"
            >
              <FiLogOut size={20} /> Logout
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {sidebarOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-10"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      <div
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen && !isMobile ? "ml-64" : ""
        } p-5 ${isMobile ? "pt-20" : "pt-5"}`}
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-sm p-6 h-full overflow-auto"
        >
          <Outlet />
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;