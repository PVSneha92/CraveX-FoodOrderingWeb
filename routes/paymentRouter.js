import express from "express";
import {
  createPayment,
  getPayments,
  verifyPayment,
} from "../controllers/paymentController.js";
import {userMiddleware} from "../middlewares/userMiddleware.js"
const router = express.Router();

router.post("/create/:orderId", userMiddleware, createPayment);
router.post("/verify", userMiddleware, verifyPayment);
router.get("/transaction", userMiddleware, getPayments);

export const paymentRouter = router;