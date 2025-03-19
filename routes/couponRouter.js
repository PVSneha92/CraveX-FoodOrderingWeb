import express from 'express'
import { createCoupon } from '../controllers/couponController.js'
import {userMiddleware,roleMiddleware } from '../middlewares/userMiddleware.js'

const router = express.Router()

router.post("/create",userMiddleware,roleMiddleware("Admin"),createCoupon)

export const couponRouter = router
