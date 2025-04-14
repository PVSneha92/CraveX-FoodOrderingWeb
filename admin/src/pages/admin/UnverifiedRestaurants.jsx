import React, { useEffect, useState } from "react";
import axiosInstance from "../../config/axiosInstance";
import { toast } from "react-hot-toast";

const UnverifiedRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRestaurants = async () => {
    try {
      const response = await axiosInstance.get("/restaurant/unverfiy/all");
      setRestaurants(response.data.restaurant || []);
    } catch (err) {
      console.error("Error fetching unverified restaurants:", err);
      toast.error("Failed to load unverified restaurants.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (restaurantId) => {
    const loadingToast = toast.loading("Verifying...");
    try {
      await axiosInstance.put(`/admin/verify/${restaurantId}`);
      setRestaurants((prev) => prev.filter((r) => r._id !== restaurantId));
      toast.success("Restaurant verified successfully!", { id: loadingToast });
    } catch (err) {
      console.error("Verification failed:", err);
      toast.error("Failed to verify restaurant.", { id: loadingToast });
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Unverified Restaurants</h2>
      {restaurants.length === 0 ? (
        <p className="text-red-600">No unverified restaurants found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Image</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Phone</th>
                <th className="px-4 py-2 border">Rating</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {restaurants.map((res) => (
                <tr key={res._id} className="text-center">
                  <td className="px-4 py-2 border">
                    <img
                      src={res.image}
                      alt={res.name}
                      className="w-16 h-16 object-cover mx-auto rounded"
                    />
                  </td>
                  <td className="px-4 py-2 border font-medium">{res.name}</td>
                  <td className="px-4 py-2 border">{res.email}</td>
                  <td className="px-4 py-2 border">{res.phone}</td>
                  <td className="px-4 py-2 border">{res.rating}</td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => handleVerify(res._id)}
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                    >
                      Verify
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
};

export default UnverifiedRestaurants;
