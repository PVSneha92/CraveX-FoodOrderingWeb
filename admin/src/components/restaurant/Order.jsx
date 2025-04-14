import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import axiosInstance from "../../config/axiosInstance";
import toast from "react-hot-toast";

const STATUS_OPTIONS = [
  "pending",
  "confirmed",
  "preparing",
  "out for delivery",
  "delivered",
];

function Order() {
  const [data, isLoading, error, refetch] = useFetch("/order/restaurant-order");
  const [statusMap, setStatusMap] = useState({});
  const [showHistory, setShowHistory] = useState(false); // State to control history visibility

  const handleStatusChange = (orderId, newStatus) => {
    setStatusMap((prev) => ({
      ...prev,
      [orderId]: newStatus,
    }));
  };

  const updateOrder = async (order) => {
    const selectedStatus = statusMap[order._id] || order.status;

    try {
      const res = await axiosInstance.put(`/order/update/status/${order._id}`, {
        status: selectedStatus,
        deliveryAddress: order.deliveryAddress?._id,
      });

      toast.success(res.data?.message || "Status updated");
      refetch();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update order");
    }
  };

  if (isLoading) return <div className="text-center mt-4">Loading...</div>;

  if (error) {
    return (
      <div className="text-center mt-4 text-red-600">
        {error?.message || "Something went wrong while fetching orders."}
      </div>
    );
  }

  if (!data?.orders || data.orders.length === 0) {
    return (
      <div className="text-center mt-4 text-gray-600">No orders found.</div>
    );
  }

  // Separate orders
  const activeOrders = data.orders.filter(
    (order) => order.status !== "delivered"
  );
  const deliveredOrders = data.orders.filter(
    (order) => order.status === "delivered"
  );

  const renderOrderCard = (order, isDelivered = false) => (
    <div
      key={order._id}
      className="border rounded-xl shadow-md p-4 bg-white space-y-4"
    >
      {/* User Info */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">User: {order.user.name}</h2>
          <p className="text-sm text-gray-500">Phone: {order.user.phone}</p>
          <p className="text-sm text-gray-600 mt-1">
            Current Status:{" "}
            <span className="capitalize font-medium">{order.status}</span>
          </p>
        </div>
      </div>

      {/* Status Update */}
      {!isDelivered && (
        <div className="flex items-center gap-4">
          <select
            value={statusMap[order._id] || order.status}
            onChange={(e) => handleStatusChange(order._id, e.target.value)}
            className="border rounded-md px-3 py-2"
          >
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>

          <button
            onClick={() => updateOrder(order)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Update Status
          </button>
        </div>
      )}

      {/* Food Details */}
      {order.foodDetails.map((food) => (
        <div key={food._id} className="flex gap-4 items-center">
          <img
            src={food.foodImage}
            alt={food.foodName}
            className="w-24 h-24 rounded-lg object-cover"
          />
          <div>
            <h3 className="text-lg font-medium">{food.foodName}</h3>
            <p>Quantity: {food.quantity}</p>
            <p>Price: ₹{food.totalItemPrice}</p>
          </div>
        </div>
      ))}

      {/* Delivery Address */}
      <div className="text-sm text-gray-700 mt-2">
        <p>City: {order.deliveryAddress?.city}</p>
        <p>State: {order.deliveryAddress?.state}</p>
        <p>Phone: {order.deliveryAddress?.phone}</p>
      </div>

      {/* Coupon */}
      <div className="text-sm mt-2">
        <p>
          Coupon:{" "}
          {order.coupon?.code ? (
            <span className="text-green-600 font-medium">
              {order.coupon.code}
            </span>
          ) : (
            <span className="text-gray-500">No coupon applied</span>
          )}
        </p>
      </div>
    </div>
  );

  return (
    <div className="p-4 space-y-8">
      {/* Active Orders */}
      <div>
        <h1 className="text-2xl font-bold mb-2">Active Orders</h1>
        {activeOrders.length > 0 ? (
          <div className="space-y-4">
            {activeOrders.map((order) => renderOrderCard(order))}
          </div>
        ) : (
          <p className="text-gray-500">No active orders</p>
        )}
      </div>

      {/* Button to toggle History */}
      <div className="text-center mt-4">
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-800"
        >
          {showHistory ? "Hide Order History" : "Show Order History"}
        </button>
      </div>

      {/* Show Delivered Orders (History) */}
      {showHistory && (
        <div>
          <h1 className="text-2xl font-bold mb-2">
            Delivered Orders (History)
          </h1>
          {deliveredOrders.length > 0 ? (
            <div className="space-y-4">
              {deliveredOrders.map((order) => renderOrderCard(order, true))}
            </div>
          ) : (
            <p className="text-gray-500">No delivered orders yet</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Order;
