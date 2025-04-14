import express from "express";
import {
  createPayment,
  getPayments,
  getRestaurantPayments,
  verifyPayment,
} from "../../controllers/paymentController.js";
import { authMiddleware } from "../../middileware/authmiddileware.js";
const router = express.Router();

router.post("/create/:orderId", authMiddleware, createPayment);
router.post("/verify", authMiddleware, verifyPayment);
router.get("/transaction", authMiddleware, getPayments);
router.get("/all/transaction", getPayments);
export const paymentRouter = router;
