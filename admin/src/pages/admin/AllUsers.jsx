import React, { useState } from "react";
import useFetch from "../../hooks/useFetch.jsx";
import axiosInstance from "../../config/axiosInstance.jsx";

function AllUsers() {
  const [data, isLoading, error, refetch] = useFetch("/user/users");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/user/delete/${id}`);
      refetch();
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      refetch();
      setFilteredUsers([]);
      return;
    }
    try {
      const response = await axiosInstance.get(`/user/by/${searchTerm}`);
      setFilteredUsers(response.data.user ? [response.data.user] : []);
    } catch (err) {
      console.error("Error searching user:", err);
      setFilteredUsers([]);
    }
  };

  const displayData = filteredUsers.length > 0 ? filteredUsers : data?.users;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        All Users
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
        <p className="text-center text-gray-500">Loading users...</p>
      ) : displayData?.length === 0 ? (
        <p className="text-center text-red-500">No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border rounded-xl overflow-hidden">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-3 px-4 text-left">Image</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Phone</th>
                <th className="py-3 px-4 text-left">Role</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y">
              {displayData.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50 transition">
                  <td className="py-3 px-4">
                    <img
                      src={user.profilePic}
                      alt={user.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="py-3 px-4 font-medium">{user.name}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">{user.phone}</td>
                  <td className="py-3 px-4 italic">{user.role}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleDelete(user._id)}
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

export default AllUsers;
