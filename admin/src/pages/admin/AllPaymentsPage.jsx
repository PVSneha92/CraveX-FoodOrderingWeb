import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";

export default function AllPaymentsPage() {
  const [search, setSearch] = useState("");
  const [data, isLoading, error] = useFetch("/payment/transaction");

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString();
  };

  const filteredData = data?.data?.filter((payment) => {
    const query = search.toLowerCase();
    return (
      payment.transactionId?.toLowerCase().includes(query) ||
      payment.orderId?.toLowerCase().includes(query) ||
      payment.user?.name?.toLowerCase().includes(query)
    );
  });

  if (isLoading) {
    return <div className="p-6 text-gray-700">Loading payments...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Payment Transactions
      </h2>

      <div className="mb-6">
        <input
          type="text"
          placeholder="🔍 Search by Transaction ID, Order ID, or User"
          className="w-full px-5 py-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left font-semibold">
                  Transaction ID
                </th>
                <th className="px-6 py-4 text-left font-semibold">Order ID</th>
                <th className="px-6 py-4 text-left font-semibold">User</th>
                <th className="px-6 py-4 text-left font-semibold">Amount</th>
                <th className="px-6 py-4 text-left font-semibold">
                  Date & Time
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData?.length > 0 ? (
                filteredData.map((payment) => (
                  <tr key={payment._id} className="hover:bg-gray-50 border-b">
                    <td className="px-6 py-4">{payment.transactionId}</td>
                    <td className="px-6 py-4">{payment.orderId}</td>
                    <td className="px-6 py-4">{payment.user?.name || "N/A"}</td>
                    <td className="px-6 py-4 font-medium text-green-600">
                      ₹{payment.amount}
                    </td>
                    <td className="px-6 py-4">
                      {formatDateTime(payment.createdAt)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500">
                    No matching records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
