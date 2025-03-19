import express from 'express'
import {addMenuItem,updateMenu,getMenuByName,getAllMenu,getMenuItemById,deleteMenuItem} from "../controllers/menuController.js"
import { userMiddleware, restaurantMiddleware } from '../middlewares/userMiddleware.js'
import { upload } from '../middlewares/multerMiddleware.js'

const router = express.Router()

router.post("/create",restaurantMiddleware,upload.single("image"),addMenuItem)
router.put("/update/menu/:menuItemId",restaurantMiddleware,upload.single("image"),updateMenu)
router.get("/by/:name",getMenuByName)
router.get("/all",getAllMenu)
router.get("/:restaurantId/item/:menuItemId",getMenuItemById)
router.delete("/delete/:menuItemId",restaurantMiddleware,deleteMenuItem)

export const menuItemRouter = router