import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import axiosInstance from "../../config/axiosInstance.jsx";

function AllRestaurants() {
  const [data, isLoading, error, refetch] = useFetch("/restaurant/all");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/restaurant/delete/${id}`);
      refetch();
    } catch (err) {
      console.error("Error deleting restaurant:", err);
    }
  };

  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      refetch();
      setFilteredRestaurants([]);
      return;
    }
    try {
      const response = await axiosInstance.get(`/restaurant/by/${searchTerm}`);
      setFilteredRestaurants(
        response.data.restaurant ? [response.data.restaurant] : []
      );
    } catch (err) {
      console.error("Error searching restaurant:", err);
      setFilteredRestaurants([]);
    }
  };

  const displayData =
    filteredRestaurants.length > 0 ? filteredRestaurants : data?.restaurant;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        All Restaurants
      </h2>

      {/* Search */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded w-full sm:max-w-md shadow-sm focus:outline-none focus:ring focus:border-blue-400"
        />
        <button
          onClick={handleSearch}
          className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-semibold"
        >
          Search
        </button>
      </div>

      {/* Table */}
      {isLoading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : displayData?.length === 0 ? (
        <p className="text-center text-red-500">No restaurants found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border rounded-xl overflow-hidden">
            <thead className="bg-gray-100 text-gray-700 sticky top-0">
              <tr>
                <th className="py-3 px-4 text-left">Image</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Phone</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y">
              {displayData.map((rest) => (
                <tr key={rest._id} className="hover:bg-gray-50 transition">
                  <td className="py-3 px-4">
                    <img
                      src={rest.image}
                      alt={rest.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="py-3 px-4 font-medium">{rest.name}</td>
                  <td className="py-3 px-4">{rest.email}</td>
                  <td className="py-3 px-4">{rest.phone}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleDelete(rest._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AllRestaurants;
