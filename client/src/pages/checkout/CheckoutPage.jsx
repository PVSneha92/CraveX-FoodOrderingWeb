import React, { useState } from "react";
import AddressSection from "./AddressSection";
import PriceDetails from "./PriceDetails";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import CouponSection from "./CouponSession";
import { motion } from "framer-motion";

function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [savedAddresses, isLoading, error] = useFetch("/address/get");
  const [address, setAddress] = useState({
    name: "",
    houseName: "",
    streetName: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const { cart, cartId } = location.state || {};

  const [discount, setDiscount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(cart ? cart.totalPrice : 0);

  const handleDiscountApplied = (discount, finalPrice) => {
    setDiscount(discount);
    setFinalPrice(finalPrice);
  };

  if (!cart) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-xl shadow-xl max-w-md border border-blue-100">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-6">Please add items to your cart before checkout</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-all duration-300 shadow-md"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Complete Your Purchase</h1>
          <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Address Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center mr-4 text-white font-bold">
                  1
                </div>
                <h2 className="text-xl font-bold text-gray-800">
                  Shipping Information
                </h2>
              </div>
              <AddressSection
                address={address}
                setAddress={setAddress}
                savedAddresses={savedAddresses}
                setSelectedAddressId={setSelectedAddressId}
                selectedAddressId={selectedAddressId}
              />
            </div>
          </motion.div>

          {/* Order Summary */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Coupon Section */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center mr-4 text-white font-bold">
                  2
                </div>
                <h2 className="text-xl font-bold text-gray-800">
                  Apply Discount
                </h2>
              </div>
              <CouponSection
                cartId={cart?._id}
                onDiscountApplied={handleDiscountApplied}
                selectedCoupon={selectedCoupon}
                setSelectedCoupon={setSelectedCoupon}
              />
            </div>

            {/* Price Summary */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
              <PriceDetails
                cart={cart}
                discount={discount}
                finalPrice={finalPrice}
                selectedCoupon={selectedCoupon}
                selectedAddressId={selectedAddressId}
                setSelectedCoupon={setSelectedCoupon}
                setSelectedAddressId={setSelectedAddressId}
                address={address}
              />
              
              
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;