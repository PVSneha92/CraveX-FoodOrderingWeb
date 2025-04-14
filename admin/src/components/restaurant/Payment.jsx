import React from "react";
import useFetch from "../../hooks/useFetch";

function Payment() {
  const [data, isLoading, error] = useFetch("/payment/all/transaction");

  if (isLoading)
    return <div className="text-center text-lg text-gray-600">Loading...</div>;
  if (error)
    return (
      <div className="text-center text-lg text-red-600">
        Error loading payments.
      </div>
    );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-6">
        Payment Transactions
      </h1>
      {data && data.message === "Payments fetched successfully" ? (
        <div>
          {data.data.map((payment) => (
            <div
              key={payment._id}
              className="bg-white shadow-lg rounded-lg p-4 mb-4 border border-gray-200"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                <div className="flex flex-col">
                  <p className="text-lg font-medium text-gray-700">
                    <strong>Amount:</strong> ₹{payment.amount}
                  </p>
                  <p className="text-md text-gray-600">
                    <strong>User Name:</strong>{" "}
                    {payment.user ? payment.user.name : "N/A"}
                  </p>
                </div>
                <div className="flex flex-col">
                  <p className="text-md text-gray-700">
                    <strong>Order ID:</strong> {payment.orderId}
                  </p>
                  <p
                    className={`text-md font-semibold ${
                      payment.status === "success"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    <strong>Status:</strong> {payment.status}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-lg text-gray-600">
          No payments found.
        </div>
      )}
    </div>
  );
}

export default Payment;
