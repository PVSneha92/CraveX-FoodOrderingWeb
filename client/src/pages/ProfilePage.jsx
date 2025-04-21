import React, { useState, useEffect } from "react";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiEdit,
  FiSave,
  FiClock,
  FiMapPin,
  FiTrash,
  FiPlus,
} from "react-icons/fi";
import useFetch from "../hooks/useFetch";
import axiosInstance from "../config/axiosInstance";
import { useNavigate } from "react-router-dom";

const AddressForm = ({ address, onSave, onCancel }) => {
  const [formData, setFormData] = useState(
    address || {
      name: "",
      houseName: "",
      streetName: "",
      landmark: "",
      city: "",
      state: "",
      pincode: "",
      phone: "",
    }
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 mt-6 shadow-lg transition-all duration-300 transform hover:shadow-xl">
      <h3 className="text-xl font-medium mb-4 text-white flex items-center">
        <FiMapPin className="mr-2 text-amber-400" />
        {address ? "Edit Address" : "Add New Address"}
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-gray-300 text-sm font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white p-3 rounded-lg border border-gray-600 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/50 transition"
              required
              placeholder="Enter your full name"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-gray-300 text-sm font-medium mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white p-3 rounded-lg border border-gray-600 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/50 transition"
              required
              placeholder="Enter phone number"
            />
          </div>
          <div className="md:col-span-2 space-y-1">
            <label className="block text-gray-300 text-sm font-medium mb-1">
              House/Flat No.
            </label>
            <input
              type="text"
              name="houseName"
              value={formData.houseName}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white p-3 rounded-lg border border-gray-600 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/50 transition"
              required
              placeholder="Enter house/flat number"
            />
          </div>
          <div className="md:col-span-2 space-y-1">
            <label className="block text-gray-300 text-sm font-medium mb-1">
              Street Address
            </label>
            <input
              type="text"
              name="streetName"
              value={formData.streetName}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white p-3 rounded-lg border border-gray-600 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/50 transition"
              required
              placeholder="Enter street address"
            />
          </div>
          <div className="md:col-span-2 space-y-1">
            <label className="block text-gray-300 text-sm font-medium mb-1">
              Landmark
            </label>
            <input
              type="text"
              name="landmark"
              value={formData.landmark}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white p-3 rounded-lg border border-gray-600 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/50 transition"
              placeholder="Nearby landmark (optional)"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-gray-300 text-sm font-medium mb-1">
              City
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white p-3 rounded-lg border border-gray-600 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/50 transition"
              required
              placeholder="Enter city"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-gray-300 text-sm font-medium mb-1">
              State
            </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white p-3 rounded-lg border border-gray-600 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/50 transition"
              required
              placeholder="Enter state"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-gray-300 text-sm font-medium mb-1">
              PIN Code
            </label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white p-3 rounded-lg border border-gray-600 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/50 transition"
              required
              placeholder="Enter PIN code"
            />
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-5 py-2.5 rounded-lg transition-all duration-300 hover:shadow-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white px-5 py-2.5 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/20"
          >
            <FiSave /> Save Address
          </button>
        </div>
      </form>
    </div>
  );
};

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [address, setAddress] = useState(null);
  const [isLoadingAddress, setIsLoadingAddress] = useState(true);

  // Fetch user data
  const [apiData, isLoading, error] = useFetch("/user/profile");
  const user = apiData?.user;

  // Fetch address data
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await axiosInstance.get("/address/get");
        setAddress(response.data.address);
      } catch (error) {
        console.error("Error fetching address:", error);
      } finally {
        setIsLoadingAddress(false);
      }
    };

    if (user) {
      fetchAddress();
    }
  }, [user]);

  // Update formData when user data is available
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone || "",
      });
    }
  }, [user]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save profile changes
  const handleSave = async () => {
    try {
      const response = await axiosInstance.put("/user/update", formData);
      if (response.data) {
        setIsEditing(false);
        setFormData(response.data.user); // Update local state
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // Save address changes
  const handleSaveAddress = async (formData) => {
    try {
      setIsLoadingAddress(true);
      const response = address
        ? await axiosInstance.put("/address/update/new", formData)
        : await axiosInstance.post("/address/create", formData);
      setAddress(response.data.address);
      setIsEditingAddress(false);
    } catch (error) {
      console.error("Error saving address:", error);
    } finally {
      setIsLoadingAddress(false);
    }
  };

  // Delete address
  const handleDeleteAddress = async () => {
    try {
      setIsLoadingAddress(true);
      await axiosInstance.delete(`/address/delete/${address._id}`);
      setAddress(null);
    } catch (error) {
      console.error("Error deleting address:", error);
    } finally {
      setIsLoadingAddress(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-lg font-medium">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex items-center justify-center">
        <div className="text-center max-w-md p-6 bg-gray-800 rounded-xl shadow-lg">
          <p className="text-red-400 mb-4 text-lg font-medium">
            Error loading profile
          </p>
          <p className="text-gray-300 mb-6">
            We couldn't load your profile information. Please try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-300 hover:shadow-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex items-center justify-center">
        <div className="text-center max-w-md p-6 bg-gray-800 rounded-xl shadow-lg">
          <p className="text-lg font-medium mb-4">No user data found</p>
          <p className="text-gray-300 mb-6">
            Please sign in to view your profile.
          </p>
        </div>
      </div>
    );
  }

  // Format join date
  const joinDate = new Date(user.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Profile Card */}
        <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:shadow-3xl">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-gray-700 to-gray-800 p-6 flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gray-600 overflow-hidden border-4 border-amber-400/80 shadow-lg">
              <img
                src={user.profilePic || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-2xl font-bold text-white">{user.name}</h1>
              <div className="flex items-center justify-center md:justify-start text-gray-300 gap-1 mt-1">
                <FiClock className="text-sm text-amber-400" />
                <span className="text-sm">
                  Member since {joinDate}
                </span>
              </div>
            </div>
            <button
              onClick={isEditing ? handleSave : () => setIsEditing(true)}
              className="ml-auto bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/20"
            >
              {isEditing ? (
                <>
                  <FiSave /> Save Changes
                </>
              ) : (
                <>
                  <FiEdit /> Edit Profile
                </>
              )}
            </button>
          </div>

          {/* Profile Content */}
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Personal Information */}
              <div className="space-y-6">
                <div className="relative">
                  <h2 className="text-xl font-semibold text-amber-400 pb-2 inline-block relative">
                    <span className="relative z-10 px-1 bg-gray-800">
                      Personal Information
                    </span>
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-amber-500/30 to-transparent"></span>
                  </h2>

                  <div className="flex items-start gap-4 mt-6 p-4 bg-gray-700/50 rounded-xl hover:bg-gray-700/70 transition">
                    <div className="p-2 bg-gray-600 rounded-lg text-amber-400">
                      <FiUser className="text-lg" />
                    </div>
                    <div className="flex-1">
                      <label className="text-gray-400 text-sm font-medium">
                        Full Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-400/50 mt-1 transition"
                        />
                      ) : (
                        <p className="text-white mt-1">{user.name}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-4 mt-4 p-4 bg-gray-700/50 rounded-xl hover:bg-gray-700/70 transition">
                    <div className="p-2 bg-gray-600 rounded-lg text-amber-400">
                      <FiMail className="text-lg" />
                    </div>
                    <div className="flex-1">
                      <label className="text-gray-400 text-sm font-medium">
                        Email
                      </label>
                      <p className="text-white mt-1">{user.email}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                <div className="relative">
                  <h2 className="text-xl font-semibold text-amber-400 pb-2 inline-block relative">
                    <span className="relative z-10 px-1 bg-gray-800">
                      Contact Information
                    </span>
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-amber-500/30 to-transparent"></span>
                  </h2>

                  <div className="flex items-start gap-4 mt-6 p-4 bg-gray-700/50 rounded-xl hover:bg-gray-700/70 transition">
                    <div className="p-2 bg-gray-600 rounded-lg text-amber-400">
                      <FiPhone className="text-lg" />
                    </div>
                    <div className="flex-1">
                      <label className="text-gray-400 text-sm font-medium">
                        Phone
                      </label>
                      {isEditing ? (
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-400/50 mt-1 transition"
                        />
                      ) : (
                        <p className="text-white mt-1">
                          {user.phone || "Not provided"}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Address Section */}
            <div className="mt-12">
              <div className="flex items-center justify-between mb-6">
                <div className="relative">
                  <h2 className="text-xl font-semibold text-amber-400 pb-2 inline-block relative">
                    <span className="relative z-10 px-1 bg-gray-800">
                      Shipping Address
                    </span>
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-amber-500/30 to-transparent"></span>
                  </h2>
                </div>
                {!isEditingAddress && address && (
                  <button
                    onClick={() => setIsEditingAddress(true)}
                    className="flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/20"
                  >
                    <FiEdit /> Edit Address
                  </button>
                )}
              </div>

              {isEditingAddress || !address ? (
                <AddressForm
                  address={address}
                  onSave={handleSaveAddress}
                  onCancel={() => setIsEditingAddress(false)}
                />
              ) : (
                <div className="bg-gray-700 p-6 rounded-xl border border-gray-600 shadow-lg transition-all duration-300 hover:shadow-xl">
                  <div className="flex items-start mb-4">
                    <div className="p-2 bg-gray-600 rounded-lg text-amber-400 mr-3">
                      <FiMapPin className="text-lg" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-white">
                        {address.name}
                      </h3>
                      <p className="text-gray-400">{address.phone}</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-gray-300 pl-12">
                    <p>
                      {address.houseName}, {address.streetName}
                    </p>
                    {address.landmark && <p>Near {address.landmark}</p>}
                    <p>
                      {address.city}, {address.state} - {address.pincode}
                    </p>
                  </div>

                  <div className="flex gap-3 mt-6 pl-12">
                    <button
                      onClick={() => setIsEditingAddress(true)}
                      className="flex-1 flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-500 text-white px-4 py-2.5 rounded-lg transition-all duration-300 hover:shadow-lg"
                    >
                      <FiEdit /> Edit
                    </button>
                    <button
                      onClick={handleDeleteAddress}
                      className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white px-4 py-2.5 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20"
                    >
                      <FiTrash /> Delete
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Order History Section */}
            <div className="mt-12">
              <div className="relative mb-6">
                <h2 className="text-xl font-semibold text-amber-400 pb-2 inline-block relative">
                  <span className="relative z-10 px-1 bg-gray-800">
                    Recent Orders
                  </span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-amber-500/30 to-transparent"></span>
                </h2>
              </div>
              <div className="bg-gray-700/50 rounded-xl p-6 border border-gray-600/50">
                <div className="text-center py-8">
                  <p className="text-gray-400 mb-4">
                    You haven't placed any orders yet
                  </p>
                  <button className="bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/20">
                    Start Shopping
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;