import express from "express";
import {fetchRole, Login, Profile, signUp, updateProfile} from "../controllers/userController.js"
import { userMiddleware } from "../middlewares/userMiddleware.js";

const router = express.Router();
router.post("/signup",signUp);
router.post("/login",Login);
router.get("/profile",userMiddleware,Profile);
router.get("/role",userMiddleware,fetchRole);
router.put("/update",userMiddleware,updateProfile);

export const userRouter = router;