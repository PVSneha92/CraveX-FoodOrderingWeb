import express from "express";
import {
  createOrder,
  getAllOrders,
  getAllRestaurantOrders,
  getOrderById,
  updateOrderStatus,
  updateOrderUser,
} from "../../controllers/orderController.js";
import {
  authMiddleware,
  restaurantMiddleware,
} from "../../middileware/authmiddileware.js";
const router = express.Router();

router.post("/create", authMiddleware, createOrder);
router.get("/get/all", authMiddleware, getAllOrders);
router.get("/by/:orderId", authMiddleware, getOrderById);
router.put("/update/:orderId", authMiddleware, updateOrderUser);
router.put("/update/status/:orderId", restaurantMiddleware, updateOrderStatus);
router.get("/restaurant-order", restaurantMiddleware, getAllRestaurantOrders);

export const orderRouter = router;
