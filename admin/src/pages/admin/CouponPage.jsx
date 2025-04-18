import React, { useState } from "react";
import axiosInstance from "../../config/axiosInstance"; // make sure baseURL is set
import toast from "react-hot-toast";

const CouponPage = () => {
  const [couponData, setCouponData] = useState({
    code: "",
    discountPercentage: "",
    minOrderVal: "",
    MaxDiscValue: "",
    expiryDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCouponData({ ...couponData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/admin/coupons", couponData);
      toast.success(response.data.message);
      setCouponData({
        code: "",
        discountPercentage: "",
        minOrderVal: "",
        MaxDiscValue: "",
        expiryDate: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create coupon");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Create New Coupon</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="code"
          placeholder="Coupon Code"
          value={couponData.code}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="discountPercentage"
          placeholder="Discount Percentage"
          value={couponData.discountPercentage}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="minOrderVal"
          placeholder="Minimum Order Value"
          value={couponData.minOrderVal}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="MaxDiscValue"
          placeholder="Maximum Discount Value"
          value={couponData.MaxDiscValue}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          name="expiryDate"
          value={couponData.expiryDate}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-amber-500 text-white py-2 rounded hover:bg-amber-600 transition"
        >
          Create Coupon
        </button>
      </form>
    </div>
  );
};

export default CouponPage;
