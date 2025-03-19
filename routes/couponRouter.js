import express from 'express'
import { createCoupon } from '../controllers/couponController.js'
import {userMiddleware} from '../middlewares/userMiddleware.js'

const router = express.Router()

router.post("/create",userMiddleware,createCoupon)

export const couponRouter = router
