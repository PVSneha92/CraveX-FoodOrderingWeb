import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axiosInstance from "../../config/axiosInstance";
import { toast } from "react-hot-toast";

function Menu() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    isAvailable: true,
  });
  const [imageFile, setImageFile] = useState(null);
  const [editId, setEditId] = useState(null);
  const [restaurant, setRestaurant] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRestaurant = async () => {
    try {
      setIsLoading(true);
      const { data } = await axiosInstance.get(
        "/restaurant/get/restaurant/profile"
      );
      setRestaurant(data.findRestaurant);
      setIsLoading(false);
    } catch (err) {
      setError("Error loading data");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurant();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      isAvailable: true,
    });
    setImageFile(null);
    setEditId(null);
  };

  const createMenu = async () => {
    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("description", formData.description);
      form.append("price", formData.price);
      form.append("isAvailable", formData.isAvailable);
      form.append("image", imageFile);

      await axiosInstance.post("/menu/create", form);
      toast.success("Menu item created");
      resetForm();
      fetchRestaurant();
    } catch (error) {
      console.error("Create Error:", error);
      toast.error("Failed to create menu item");
    }
  };

  const updateMenu = async () => {
    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("description", formData.description);
      form.append("price", formData.price);
      form.append("isAvailable", formData.isAvailable);
      if (imageFile) {
        form.append("image", imageFile);
      }

      await axiosInstance.put(`/menu/update/menu/${editId}`, form);
      toast.success("Menu item updated");
      resetForm();
      fetchRestaurant();
    } catch (error) {
      console.error("Update Error:", error);
      toast.error("Failed to update menu item");
    }
  };

  const deleteMenu = async (menuItemId) => {
    try {
      await axiosInstance.delete(`/menu/delete/${menuItemId}`);
      toast.success("Menu item deleted");
      fetchRestaurant();
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error("Failed to delete menu item");
    }
  };

  const handleEdit = (item) => {
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price,
      isAvailable: item.isAvailable,
    });
    setImageFile(null);
    setEditId(item._id);
  };

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">🍔 Menu Management</h2>

      {/* Create / Update Form */}
      <div className="bg-white p-4 rounded shadow mb-8">
        <h3 className="text-lg font-semibold mb-4">
          {editId ? "Edit Menu Item" : "Add New Menu Item"}
        </h3>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Item Name"
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full mb-2"
        />

        <label className="flex items-center space-x-2 mb-4">
          <input
            type="checkbox"
            name="isAvailable"
            checked={formData.isAvailable}
            onChange={handleChange}
            className="accent-yellow-600"
          />
          <span>Available</span>
        </label>

        <div className="flex space-x-2">
          <button
            onClick={editId ? updateMenu : createMenu}
            className="bg-yellow-800 text-white px-4 py-2 rounded"
          >
            {editId ? "Update Menu" : "Create Menu"}
          </button>
          {editId && (
            <button
              onClick={resetForm}
              className="bg-gray-300 text-black px-4 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Menu List */}
      <h3 className="text-xl font-semibold mb-4">📋 Menu List</h3>
      <div className="space-y-4">
        {restaurant?.menu?.length > 0 ? (
          restaurant.menu.map((item) => (
            <div
              key={item._id}
              className="flex items-start space-x-4 p-4 bg-white rounded shadow"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-1">
                <h4 className="text-lg font-bold">{item.name}</h4>
                <p className="text-sm text-gray-600">{item.description}</p>
                <p className="text-sm font-semibold mt-1">₹{item.price}</p>
                <p className="text-sm">
                  {item.isAvailable ? "✅ Available" : "❌ Not Available"}
                </p>
              </div>
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteMenu(item._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No menu items available.</p>
        )}
      </div>
    </div>
  );
}

export default Menu;
