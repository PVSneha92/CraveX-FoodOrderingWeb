import express from 'express'
import { addToCart } from '../controllers/cartController.js'
import {userMiddleware} from '../middlewares/userMiddleware.js'

const router = express.Router()

router.post("/item",userMiddleware,addToCart)
/*
router.delete("/remove/:foodId",authMiddleware,deleteCartItem)
router.put("/update",authMiddleware,addQuantity)
router.get("/all",authMiddleware,getCart)
*/
export const cartRouter = router
