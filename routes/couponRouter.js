import express from 'express'
import { addCoupon } from '../controllers/couponController.js'
import {userMiddleware} from '../middlewares/userMiddleware.js'

const router = express.Router()

router.post("/create",userMiddleware,addCoupon)

export const couponRouter = router
