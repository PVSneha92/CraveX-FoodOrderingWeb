import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiShoppingCart, FiPlus, FiTrash2 } from "react-icons/fi";
import { HiOutlineMinusSm, HiOutlinePlusSm } from "react-icons/hi";
import { RiRestaurantLine } from "react-icons/ri";
import toast from "react-hot-toast";
import useFetch from "../hooks/useFetch";
import axiosInstance from "../config/axiosInstance";
import { Link, useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();
  const [cartData, isLoading, error, fetchCart] = useFetch("/cart/all");

  const cart = cartData?.data || { items: [], totalPrice: 0, finalPrice: 0 };
  const isEmptyCart = cart.items.length === 0 && !isLoading && !error;

  const removeItemFromCart = async (itemId) => {
    try {
      await axiosInstance.delete(`/cart/remove/${itemId}`);
      await fetchCart();
      toast.success("Item removed from cart", {
        icon: '🗑️',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      if (cart.items.length === 1) {
        setTimeout(() => navigate("/home"), 100);
      }
    } catch (err) {
      toast.error("Failed to remove item");
    }
  };

  const updateQuantity = async (foodId, action) => {
    try {
      await axiosInstance.put("/cart/update", { foodId, action });
      await fetchCart();
      toast.success("Cart updated", {
        icon: '🔄',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    } catch (err) {
      toast.error("Failed to update quantity");
    }
  };

  const handleCheckout = () => {
    if (isEmptyCart) {
      toast.error("Your cart is empty");
      return;
    }
    if (cart._id) {
      navigate("/checkout", { state: { cart, cartId: cart._id } });
    } else {
      toast.error("Unable to proceed to checkout");
    }
  };

  useEffect(() => {
    if (isEmptyCart) navigate("/cart");
  }, [isEmptyCart, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="flex flex-col items-center">
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="rounded-full h-16 w-16 border-t-4 border-b-4 border-amber-500 mb-6"
          ></motion.div>
          <motion.p 
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-gray-600 font-medium"
          >
            Loading your delicious items...
          </motion.p>
        </div>
      </div>
    );
  }

  if (error && error.response?.status !== 404) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-[70vh] flex items-center justify-center p-6 bg-gradient-to-br from-gray-50 to-gray-100"
      >
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full border border-gray-200">
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
              transition: { repeat: Infinity, duration: 2 }
            }}
            className="text-red-500 text-6xl mb-4"
          >
            ⚠️
          </motion.div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">Oops!</h3>
          <p className="text-gray-600 mb-6">
            {error.message || "We couldn't load your cart items"}
          </p>
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 5px 15px rgba(245, 158, 11, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={fetchCart}
            className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-3 rounded-xl font-medium shadow-md"
          >
            Try Again
          </motion.button>
        </div>
      </motion.div>
    );
  }

  if (isEmptyCart) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-gray-50 to-gray-100"
      >
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            transition: { repeat: Infinity, duration: 3 }
          }}
          className="bg-gradient-to-br from-amber-100 to-amber-50 p-8 rounded-full mb-8 shadow-inner"
        >
          <FiShoppingCart className="text-5xl text-amber-500" />
        </motion.div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Your cart feels lonely
        </h2>
        <p className="text-gray-500 max-w-md mb-8 text-lg">
          No items in your cart yet. Let's add some delicious food!
        </p>
        <motion.div
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 5px 15px rgba(245, 158, 11, 0.3)"
          }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/menu"
            className="flex items-center gap-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-8 py-4 rounded-xl font-medium shadow-lg"
          >
            <FiPlus className="text-xl" />
            <span className="text-lg">Explore Menu</span>
          </Link>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-6">
            <motion.div
              whileHover={{ rotate: 10 }}
              className="bg-gradient-to-br from-amber-500 to-amber-600 p-3 rounded-xl shadow-lg"
            >
              <FiShoppingCart className="text-2xl text-white" />
            </motion.div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-1">Your Cart</h1>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: 80 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="h-1.5 bg-gradient-to-r from-amber-500 to-amber-300 rounded-full"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-200 max-w-md">
            <div className="bg-amber-100 p-3 rounded-lg">
              <RiRestaurantLine className="text-amber-600 text-xl" />
            </div>
            <div>
              <p className="text-gray-700 font-medium">
                {cart.items.length} {cart.items.length === 1 ? "item" : "items"} • Total: 
                <span className="text-amber-600 font-bold ml-1">₹{cart.totalPrice}</span>
              </p>
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-6 mb-12"
          >
            {cart.items.map((item, index) => (
              <motion.div
                key={item._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: index * 0.05 }
                }}
                exit={{ opacity: 0, x: -20 }}
                whileHover={{ y: -3 }}
                className="flex gap-6 p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
              >
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="relative"
                >
                  <img
                    src={item.foodImage}
                    alt={item.foodName}
                    className="w-28 h-28 rounded-xl object-cover border border-gray-100 shadow-sm"
                  />
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="absolute -top-3 -right-3 bg-white p-1.5 rounded-full shadow-md border border-gray-200"
                  >
                    <div className="bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {item.quantity}x
                    </div>
                  </motion.div>
                </motion.div>

                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-900 text-xl">
                      {item.foodName}
                    </h3>
                    <p className="font-bold text-amber-600 text-lg">₹{item.totalItemPrice}</p>
                  </div>

                  <p className="text-gray-500 mb-5">
                    ₹{item.totalItemPrice / item.quantity} per item • {item.restaurantName}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50">
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => updateQuantity(item.foodId, "decrement")}
                        disabled={item.quantity <= 1}
                        className={`px-4 py-2 ${
                          item.quantity <= 1
                            ? "text-gray-300 bg-gray-100"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <HiOutlineMinusSm className="text-lg" />
                      </motion.button>
                      <span className="px-4 py-1 text-gray-700 font-medium text-lg">
                        {item.quantity}
                      </span>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => updateQuantity(item.foodId, "increment")}
                        className="px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        <HiOutlinePlusSm className="text-lg" />
                      </motion.button>
                    </div>

                    <motion.button
                      whileHover={{ 
                        scale: 1.1,
                        color: "#ef4444",
                        backgroundColor: "rgba(239, 68, 68, 0.1)"
                      }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeItemFromCart(item.foodId)}
                      className="text-gray-400 p-3 rounded-full transition-all"
                    >
                      <FiTrash2 className="text-xl" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {!isEmptyCart && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, type: "spring" }}
            className="bg-white p-8 rounded-2xl border border-gray-200 shadow-xl sticky bottom-8"
          >
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
              <div className="flex-1">
                <div className="flex items-baseline gap-3 mb-1">
                  <p className="text-gray-600 text-lg">Subtotal:</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ₹{cart.totalPrice}
                  </p>
                </div>
                {cart.discount > 0 && (
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-green-600 font-medium"
                  >
                    🎉 You saved ₹{cart.discount}
                  </motion.p>
                )}
              </div>
              <motion.button
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: "0 8px 20px rgba(245, 158, 11, 0.3)"
                }}
                whileTap={{ scale: 0.97 }}
                onClick={handleCheckout}
                className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-lg transition-all"
              >
                Proceed to Checkout
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CartPage;