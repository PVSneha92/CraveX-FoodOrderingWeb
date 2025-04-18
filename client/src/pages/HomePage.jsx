import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useFetch from "../hooks/useFetch";
import RestaurantList from "../components/RestaurantList";
import { FaSearch, FaUtensils, FaStar, FaClock } from "react-icons/fa";

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  // Fetch user profile
  const [profile, isLoading, error] = useFetch("/user/profile");

  // Fetch all restaurants
  const [allRestaurantsData, restaurantsLoading, restaurantsError] =
    useFetch("/restaurant/all");

  useEffect(() => {
    if (allRestaurantsData?.restaurant) {
      setRestaurants(allRestaurantsData.restaurant);
      setFilteredRestaurants(allRestaurantsData.restaurant);
    }
  }, [allRestaurantsData]);

  // Handle loading & errors
  if (isLoading || restaurantsLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (error || restaurantsError) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-red-400">
        Error: {error?.message || restaurantsError?.message}
      </div>
    );
  }

  // Handle search input changes
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 0) {
      const uniqueCategories = [
        ...new Set(
          restaurants.flatMap((restaurant) =>
            restaurant.menu.map((item) => item.category)
          )
        ),
      ];

      const matchingSuggestions = uniqueCategories.filter((category) =>
        category.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(matchingSuggestions);

      const filtered = restaurants.filter((restaurant) => {
        const nameMatch = restaurant.name
          .toLowerCase()
          .includes(query.toLowerCase());
        const menuItemMatch = restaurant.menu.some(
          (item) =>
            item.name.toLowerCase().includes(query.toLowerCase()) ||
            item.category.toLowerCase().includes(query.toLowerCase())
        );
        return nameMatch || menuItemMatch;
      });
      setFilteredRestaurants(filtered);
    } else {
      setSuggestions([]);
      setFilteredRestaurants(restaurants);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setSuggestions([]);

    const filtered = restaurants.filter((restaurant) =>
      restaurant.menu.some(
        (item) => item.category.toLowerCase() === suggestion.toLowerCase()
      )
    );
    setFilteredRestaurants(filtered);
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim() === "") {
      setFilteredRestaurants(restaurants);
      return;
    }

    const filtered = restaurants.filter((restaurant) => {
      const nameMatch = restaurant.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const menuItemMatch = restaurant.menu.some(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return nameMatch || menuItemMatch;
    });
    setFilteredRestaurants(filtered);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Welcome Message */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome{" "}
            <span className="text-amber-400">
              {profile?.user?.name || "Foodie"}
            </span>
          </h1>
          <div className="w-24 h-1 bg-amber-500 mx-auto mb-4"></div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Discover delicious meals from top restaurants near you
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl mx-auto relative mb-16"
        >
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search for food, restaurants, or cuisines..."
              className="w-full py-4 pl-12 pr-16 rounded-full bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500 text-white placeholder-gray-400 shadow-lg transition-all duration-300"
              value={searchQuery}
              onChange={handleSearch}
              onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
            />
            <FaSearch className="absolute left-5 text-gray-400 text-lg" />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="absolute right-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full p-3 shadow-lg hover:shadow-amber-500/30 transition-all"
              onClick={handleSearchSubmit}
            >
              <FaSearch className="h-5 w-5" />
            </motion.button>
          </div>

          {/* Search Suggestions */}
          <AnimatePresence>
            {suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute z-10 w-full mt-2 bg-gray-800 rounded-xl shadow-2xl border border-gray-700 overflow-hidden"
              >
                <ul>
                  {suggestions.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="px-5 py-3 hover:bg-gray-700 cursor-pointer flex items-center border-b border-gray-700 last:border-b-0"
                      onClick={() => handleSuggestionClick(item)}
                    >
                      <FaUtensils className="text-amber-400 mr-3" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Restaurant List Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-between items-center mb-8"
        >
          <h2 className="text-2xl font-bold text-amber-400 flex items-center">
            <FaUtensils className="mr-3" />
            {searchQuery
              ? `Results for "${searchQuery}"`
              : "Featured Restaurants"}
          </h2>
          <div className="text-gray-400">
            {filteredRestaurants.length} {filteredRestaurants.length === 1 ? "restaurant" : "restaurants"} found
          </div>
        </motion.div>

        {/* Restaurant List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {filteredRestaurants.length > 0 ? (
            <RestaurantList restaurants={filteredRestaurants} />
          ) : (
            <div className="text-center py-16">
              <div className="text-amber-400 text-5xl mb-4">
                <FaUtensils />
              </div>
              <h3 className="text-xl font-medium mb-2">No restaurants found</h3>
              <p className="text-gray-400 max-w-md mx-auto">
                Try adjusting your search or filter to find what you're looking for
              </p>
            </div>
          )}
        </motion.div>

        {/* Featured Categories */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-20"
        >
          <h3 className="text-xl font-bold mb-6 text-white flex items-center">
            <FaStar className="text-amber-400 mr-2" />
            Popular Categories
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Pizza', 'Burgers', 'Sushi', 'Indian', 'Italian', 'Chinese', 'Mexican', 'Desserts'].map((category) => (
              <motion.div
                whileHover={{ y: -5 }}
                key={category}
                className="bg-gray-800 rounded-xl p-4 cursor-pointer border border-gray-700 hover:border-amber-400 transition-all"
                onClick={() => {
                  setSearchQuery(category);
                  handleSuggestionClick(category);
                }}
              >
                <div className="flex items-center">
                  <div className="bg-amber-500/10 p-2 rounded-lg mr-3">
                    <FaUtensils className="text-amber-400" />
                  </div>
                  <span className="font-medium">{category}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;