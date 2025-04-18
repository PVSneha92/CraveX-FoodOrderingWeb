import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiShoppingCart, FiPlus, FiTrash2 } from "react-icons/fi";
import { HiOutlineMinusSm, HiOutlinePlusSm } from "react-icons/hi";
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
      toast.success("Item removed from cart");
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
      toast.success("Cart updated");
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
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500 mb-4"></div>
          <p className="text-gray-600">Loading your delicious items...</p>
        </div>
      </div>
    );
  }

  if (error && error.response?.status !== 404) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-[60vh] flex items-center justify-center p-6"
      >
        <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md w-full">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Oops!</h3>
          <p className="text-gray-600 mb-6">
            {error.message || "We couldn't load your cart items"}
          </p>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={fetchCart}
            className="bg-amber-500 text-white px-6 py-3 rounded-lg font-medium"
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
        className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center"
      >
        <div className="bg-amber-100 p-6 rounded-full mb-6">
          <FiShoppingCart className="text-4xl text-amber-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          Your cart feels lonely
        </h2>
        <p className="text-gray-500 max-w-md mb-8">
          No items in your cart yet. Let's add some delicious food!
        </p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/menu"
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-lg font-medium shadow-md"
          >
            <FiPlus className="text-lg" />
            Explore Menu
          </Link>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Cart</h1>
          <div className="w-16 h-1 bg-amber-500"></div>
          <p className="text-gray-500 mt-2">
            {cart.items.length} {cart.items.length === 1 ? "item" : "items"} • Total: ₹{cart.totalPrice}
          </p>
        </motion.div>

        <AnimatePresence>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-6 mb-8"
          >
            {cart.items.map((item) => (
              <motion.div
                key={item._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex gap-4 p-5 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <motion.div whileHover={{ scale: 1.05 }}>
                  <img
                    src={item.foodImage}
                    alt={item.foodName}
                    className="w-24 h-24 rounded-lg object-cover border border-gray-100"
                  />
                </motion.div>

                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-gray-900 text-lg">
                      {item.foodName}
                    </h3>
                    <p className="font-bold text-gray-900">₹{item.totalItemPrice}</p>
                  </div>

                  <p className="text-sm text-gray-500 mb-4">
                    ₹{item.totalItemPrice / item.quantity} per item
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => updateQuantity(item.foodId, "decrement")}
                        disabled={item.quantity <= 1}
                        className={`px-3 py-2 ${
                          item.quantity <= 1
                            ? "text-gray-300 bg-gray-100"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <HiOutlineMinusSm />
                      </motion.button>
                      <span className="px-4 py-1 text-gray-700 font-medium">
                        {item.quantity}
                      </span>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => updateQuantity(item.foodId, "increment")}
                        className="px-3 py-2 text-gray-700 hover:bg-gray-50"
                      >
                        <HiOutlinePlusSm />
                      </motion.button>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeItemFromCart(item.foodId)}
                      className="text-gray-400 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-all"
                    >
                      <FiTrash2 />
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
            transition={{ delay: 0.4 }}
            className="bg-white p-6 rounded-xl border border-gray-100 shadow-lg sticky bottom-6"
          >
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <div className="flex items-baseline gap-2">
                  <p className="text-gray-600">Subtotal:</p>
                  <p className="text-xl font-bold text-gray-900">
                    ₹{cart.totalPrice}
                  </p>
                </div>
                {cart.discount > 0 && (
                  <p className="text-sm text-green-600 mt-1">
                    You saved ₹{cart.discount}
                  </p>
                )}
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleCheckout}
                className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-8 py-3 rounded-lg font-medium shadow-md transition-all"
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