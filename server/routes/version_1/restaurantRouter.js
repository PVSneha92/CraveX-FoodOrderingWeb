import express from "express";
import {
  deleteRestaurant,
  getAllRestaurant,
  getRestaurantById,
  getRestaurantByName,
  getRestaurantProfile,
  getUnverified,
  loginRestaurant,
  logout,
  registerRestaurant,
  updateRestaurant,
} from "../../controllers/restaurantController.js";
import { upload } from "../../middileware/multermiddileware.js";
import {
  authMiddleware,
  restaurantMiddleware,
  roleMiddleware,
} from "../../middileware/authmiddileware.js";
const router = express.Router();

router.post("/register", upload.single("image"), registerRestaurant);
router.post("/login", loginRestaurant);
router.put(
  "/update",
  restaurantMiddleware,
  upload.single("image"),
  updateRestaurant
);

router.get("/by/:name", getRestaurantByName);
router.get("/all", getAllRestaurant);
router.get(
  "/unverfiy/all",
  authMiddleware,
  roleMiddleware("admin"),
  getUnverified
);
router.get("/id/:restaurantId", getRestaurantById);
router.delete("/remove", restaurantMiddleware, deleteRestaurant);
router.post("/logout", restaurantMiddleware, logout);
router.delete(
  "/delete/:restaurantId",
  authMiddleware,
  roleMiddleware("admin"),
  deleteRestaurant
);
router.get(
  "/get/restaurant/profile",
  restaurantMiddleware,
  getRestaurantProfile
);

export const restaurantRouter = router;
