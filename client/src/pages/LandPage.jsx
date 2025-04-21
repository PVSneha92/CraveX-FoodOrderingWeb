import React, { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import { FiClock, FiTruck, FiSmile } from "react-icons/fi";
import { FaGooglePlay, FaAppStore } from "react-icons/fa";

export default function LandPage() {
  const [activeStep, setActiveStep] = useState(0);

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    beforeChange: (current, next) => setActiveStep(next),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "20px"
        }
      }
    ]
  };

  const popularDishes = [
    {
      id: 1,
      name: "Gourmet Pizza",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
      description: "Wood-fired with artisanal toppings",
      rating: 4.8
    },
    {
      id: 2,
      name: "Hyderabadi Biriyani",
      image: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a",
      description: "Fragrant basmati rice with tender meat",
      rating: 4.9
    },
    {
      id: 3,
      name: "Premium Burger",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
      description: "Angus beef with aged cheddar",
      rating: 4.7
    },
    {
      id: 4,
      name: "Authentic Shawarma",
      image: "https://i0.wp.com/chefsbinge.com/wp-content/uploads/2024/09/Chicken-Shawarma-Close-Up-1-of-1.jpg?resize=1000%2C1000&ssl=1",
      description: "Marinated chicken with garlic sauce",
      rating: 4.6
    },
    {
      id: 5,
      name: "Truffle Pasta",
      image: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb",
      description: "Handmade pasta with black truffle",
      rating: 4.9
    },
    {
      id: 6,
      name: "Sushi Platter",
      image: "https://images.unsplash.com/photo-1580822184713-fc5400e7fe10",
      description: "Chef's selection of 12 pieces",
      rating: 5.0
    }
  ];

  const steps = [
    {
      icon: <FiClock className="text-3xl" />,
      title: "Choose Your Food",
      description: "Browse our chef-curated menu with seasonal specials"
    },
    {
      icon: <FiTruck className="text-3xl" />,
      title: "Fast Delivery",
      description: "Get your food in 30 minutes or it's free"
    },
    {
      icon: <FiSmile className="text-3xl" />,
      title: "Enjoy Your Meal",
      description: "Savor restaurant-quality food at home"
    }
  ];

  return (
    <div className="overflow-hidden">
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-repeat" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/food.png')" }}></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row items-center justify-between"
          >
            <div className="md:w-1/2 mb-12 md:mb-0">
              <h1 className="text-white font-bold text-5xl lg:text-6xl leading-tight mb-6">
                <span className="text-amber-300">Taste </span>that best,<br /> its on time.!
              </h1>
              <p className="text-gray-300 text-xl mb-8 max-w-lg">
                Experience restaurant-quality dining at home with our chef-prepared meals, delivered fast and fresh.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to={"/home"}>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-amber-300 text-gray-900 font-bold rounded-lg hover:bg-amber-400 transition duration-300 shadow-lg"
                  >
                    Order Now
                  </motion.button>
                </Link>
                <motion.div 
                  whileHover={{ scale: 1.03 }}
                  className="flex gap-3"
                >
                  <button className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition duration-300 flex items-center gap-2">
                    <FaAppStore className="text-xl" />
                    <span>App Store</span>
                  </button>
                  <button className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition duration-300 flex items-center gap-2">
                    <FaGooglePlay className="text-xl" />
                    <span>Google Play</span>
                  </button>
                </motion.div>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="relative"
              >
                <img
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
                  alt="Delicious food"
                  className="w-full rounded-2xl shadow-2xl border-4 border-amber-300 transform hover:scale-105 transition duration-500"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl">
                  <div className="text-amber-500 font-bold text-lg">30 Min Delivery</div>
                  <div className="text-gray-600 text-sm">Guaranteed</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <div className="text-4xl font-bold text-amber-500 mb-2">10K+</div>
              <div className="text-gray-600">Happy Customers</div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <div className="text-4xl font-bold text-amber-500 mb-2">500+</div>
              <div className="text-gray-600">Menu Items</div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <div className="text-4xl font-bold text-amber-500 mb-2">15</div>
              <div className="text-gray-600">Master Chefs</div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <div className="text-4xl font-bold text-amber-500 mb-2">24/7</div>
              <div className="text-gray-600">Service Available</div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white" id="menu">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Our <span className="text-amber-500">Popular</span> Dishes
            </h2>
            <div className="w-24 h-1.5 bg-amber-400 mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Chef's special selections loved by our customers
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Slider {...carouselSettings} className="px-2 pb-10">
              {popularDishes.map((dish) => (
                <div key={dish.id} className="px-3">
                  <motion.div 
                    whileHover={{ y: -10 }}
                    className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 border border-gray-100 h-full flex flex-col"
                  >
                    <div className="relative overflow-hidden rounded-xl w-full h-48 mb-4 group">
                      <img 
                        src={dish.image} 
                        alt={dish.name} 
                        className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                      />
                      <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center">
                        ⭐ {dish.rating}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{dish.name}</h3>
                    <p className="text-gray-600">{dish.description}</p>
                  </motion.div>
                </div>
              ))}
            </Slider>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-repeat" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/diagonal-striped-brick.png')" }}></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              How It <span className="text-amber-400">Works</span>
            </h2>
            <div className="w-24 h-1.5 bg-amber-400 mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Getting your favorite food has never been easier
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className={`text-center p-8 rounded-xl bg-gray-800/50 backdrop-blur-sm border ${activeStep === index ? 'border-amber-400 shadow-lg' : 'border-gray-700'}`}
              >
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${activeStep === index ? 'bg-amber-400 text-gray-900' : 'bg-gray-700 text-amber-400'}`}>
                  {step.icon}
                </div>
                <h3 className={`text-xl font-bold mb-3 ${activeStep === index ? 'text-amber-400' : 'text-white'}`}>
                  {step.title}
                </h3>
                <p className="text-gray-300">
                  {step.description}
                </p>
                <div className="mt-4 text-amber-400 font-bold">
                  Step {index + 1}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      <section className="py-20 bg-gradient-to-r from-amber-400 to-amber-500 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-repeat" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/food.png')" }}></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Ready to experience gourmet dining at home?
            </h2>
            <p className="text-gray-900 text-xl mb-8 max-w-2xl mx-auto font-medium">
              Join our community of food lovers and get your first order with 20% off!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={"/home"}>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 transition duration-300 shadow-lg flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Order Now
                </motion.button>
              </Link>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-100 transition duration-300 shadow-lg"
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}