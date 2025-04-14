import React from "react";

function HomePage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      <div className="text-center p-10 max-w-2xl bg-white rounded-2xl shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl">
        <div className="mb-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20 mx-auto text-yellow-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-yellow-800 mb-6">
          Welcome to Cravex Admin
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Manage restaurants, users, and orders all in one place.
        </p>
        <button className="px-8 py-3 bg-yellow-600 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-700 transition-colors duration-300">
          Get Started
        </button>
      </div>
    </div>
  );
}

export default HomePage;
