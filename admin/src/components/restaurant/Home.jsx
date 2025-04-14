import React from "react";
import useFetch from "../../hooks/useFetch";

function Home() {
  const [data, isLoading, error] = useFetch(
    "/restaurant/get/restaurant/profile"
  );

  // Get the restaurant name from the fetched data
  const restaurantName = data?.findRestaurant?.name;

  if (isLoading) {
    return <div className="text-center text-lg text-gray-600">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-lg text-red-600">
        Error fetching data.
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-6">
        Welcome back, {restaurantName || "Restaurant"}!
      </h1>
      <p className="text-center text-lg text-gray-600">
        We are happy to have you manage your restaurant here.
      </p>
    </div>
  );
}

export default Home;
