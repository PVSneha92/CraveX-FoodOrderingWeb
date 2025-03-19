import express from 'express'
import {Login, signUp, Profile, updateProfile, fetchRole } from "../controllers/userController.js"
import { verifyRestaurant } from '../controllers/adminController.js';
import {userMiddleware} from "../middlewares/userMiddleware.js"

const router = express.Router()

router.post("/login", Login);
router.post("/signup", signUp);
router.get("/profile", userMiddleware, Profile);
router.put("/update", userMiddleware, updateProfile);
router.get("/profile/role", userMiddleware, fetchRole);
router.put("/verify/:restaurantId",verifyRestaurant)

export const adminRouter = router
