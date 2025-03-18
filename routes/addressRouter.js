import express from 'express'
import { createCustomerAddress, deleteCustomerAddress } from '../controllers/addressController.js'
import {userMiddleware} from '../middlewares/userMiddleware.js'

const router = express.Router()

router.post("/create",userMiddleware,createCustomerAddress)
router.delete("/delete/:addressId",userMiddleware,deleteCustomerAddress)

export const addressRouter = router
