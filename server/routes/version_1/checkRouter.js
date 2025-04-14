import express from "express";
import {
  authMiddleware,
  restaurantMiddleware,
  roleMiddleware,
} from "../../middileware/authmiddileware.js";
import { checkUser } from "../../controllers/authContoller.js";
import { checkRestaurant } from "../../controllers/restaurantController.js";
const router = express.Router();

router.get("/user", authMiddleware, checkUser);
router.get("/admin", authMiddleware, roleMiddleware("admin"), checkUser);
router.get("/restaurant", restaurantMiddleware, checkRestaurant);
export const checkRouter = router;
