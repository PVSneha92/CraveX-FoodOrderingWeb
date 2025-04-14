import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout.jsx";
import ErrorPage from "../pages/admin/ ErrorPage.jsx"; // 🔧 Fixed spacing in import path
import AdminDashboard from "../pages/admin/AdminDashboard.jsx";
import LoginPage from "../pages/admin/LoginPage.jsx";
import ProtectRoutes from "./ProtectRoutes.jsx";
import RestaurantLanding from "../pages/RestaurantLanding.jsx";
import AllRestaurants from "../pages/admin/AllRestaurants.jsx";
import HomePage from "../pages/admin/HomePage.jsx";
import AllUsers from "../pages/admin/AllUsers.jsx";
import UnverifiedRestaurants from "../pages/admin/UnverifiedRestaurants.jsx";
import AllPaymentsPage from "../pages/admin/AllPaymentsPage.jsx";
import RestaurantLoginPage from "../pages/restaurant/RestaurantLogin.jsx";
import RestaurantSignupPage from "../pages/restaurant/RestaurantSignupPage.jsx";
import RestaurantDashboard from "../pages/restaurant/RestaurantDashboard.jsx";
import Home from "../components/restaurant/Home.jsx";
import Menu from "../components/restaurant/Menu.jsx";
import Order from "../components/restaurant/Order.jsx";
import Payment from "../components/restaurant/Payment.jsx";
import Restaurant from "../components/restaurant/Restaurant.jsx";
const Route = createBrowserRouter([
  {
    path: "/",
    element: <AdminLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      { path: "restaurant/login", element: <RestaurantLoginPage /> },
      { path: "restaurant/signup", element: <RestaurantSignupPage /> },

      {
        path: "",
        element: <RestaurantLanding />,
      },
      {
        element: <ProtectRoutes />,
        children: [
          {
            path: "restaurant",
            element: <RestaurantDashboard />,
            children: [
              {
                path: "dashboard",
                element: <Home />,
              },
              {
                path: "menu",
                element: <Menu />,
              },
              {
                path: "orders",
                element: <Order />,
              },
              {
                path: "payments",
                element: <Payment />,
              },
              {
                path: "profile",
                element: <Restaurant />,
              },
            ],
          },

          // Admin Routes
          {
            path: "admin",
            element: <AdminDashboard />, // 👈 layout with sidebar and <Outlet />
            children: [
              {
                path: "", // /dashboard
                element: <HomePage />,
              },
              {
                path: "restaurants", // /dashboard/restaurants
                element: <AllRestaurants />,
              },
              {
                path: "users", // /dashboard/restaurants
                element: <AllUsers />,
              },
              {
                path: "verify/restaurant", // /dashboard/restaurants
                element: <UnverifiedRestaurants />,
              },
              {
                path: "all/payments", // /dashboard/restaurants
                element: <AllPaymentsPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default Route;
