import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import axiosInstance from "../../config/axiosInstance";
import toast from "react-hot-toast";

function Restaurant() {
  const [data, isLoading, error, refetch] = useFetch(
    "/restaurant/get/restaurant/profile"
  );
  const [selectedStatus, setSelectedStatus] = useState("");
  const [newImageFile, setNewImageFile] = useState(null);

  if (isLoading)
    return <p className="text-center mt-4 text-blue-600">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500 mt-4">Error fetching data</p>;

  const { findRestaurant } = data;

  const handleStatusChange = async () => {
    try {
      await axiosInstance.put("/restaurant/update", {
        isOpen: selectedStatus === "open",
      });
      toast.success(`Restaurant marked as ${selectedStatus.toUpperCase()}`);
      refetch();
      setSelectedStatus("");
    } catch (err) {
      console.error("Status update failed:", err);
      toast.error("Failed to update status");
    }
  };

  const handleImageUpload = async () => {
    if (!newImageFile) return;

    const formData = new FormData();
    formData.append("image", newImageFile);

    try {
      await axiosInstance.put("/restaurant/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Image uploaded successfully!");
      refetch();
      setNewImageFile(null);
    } catch (err) {
      console.error("Image upload failed:", err);
      toast.error("Failed to upload image");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-8 space-y-6 border border-gray-200 flex flex-col md:flex-row">
      {/* Image Section */}
      <div className="md:w-1/3 p-4">
        <img
          src={findRestaurant.image}
          alt="Restaurant"
          className="w-full h-64 object-cover rounded-xl border border-gray-300 shadow-lg"
        />
        <div className="text-center mt-4">
          <button
            onClick={handleImageUpload}
            disabled={!newImageFile}
            className={`w-full py-2 px-4 rounded-xl font-medium transition duration-300 mt-2 ${
              newImageFile
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Upload Image
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="md:w-2/3 p-4 space-y-4">
        <h2 className="text-3xl font-bold text-gray-800 text-center md:text-left">
          {findRestaurant.name}
        </h2>

        <div className="space-y-2 text-gray-700 text-base">
          <p>
            <span className="font-semibold">Email:</span> {findRestaurant.email}
          </p>
          <p>
            <span className="font-semibold">Phone:</span> {findRestaurant.phone}
          </p>
          <p>
            <span className="font-semibold">Status:</span>{" "}
            <span
              className={`font-semibold ${
                findRestaurant.isOpen ? "text-green-600" : "text-red-600"
              }`}
            >
              {findRestaurant.isOpen ? "🟢 Open" : "🔴 Closed"}
            </span>
          </p>
        </div>

        {/* Status Update Section */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Change Status
          </label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
          >
            <option value="">-- Select Status --</option>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
          </select>
          <button
            onClick={handleStatusChange}
            disabled={!selectedStatus}
            className={`w-full mt-3 py-2 px-4 rounded-xl font-medium transition duration-300 ${
              selectedStatus
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Update Status
          </button>
        </div>

        {/* Image Upload Section */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Upload New Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setNewImageFile(e.target.files[0])}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-gray-50"
          />
        </div>
      </div>
    </div>
  );
}

export default Restaurant;
