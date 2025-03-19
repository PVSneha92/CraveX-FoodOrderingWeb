import express from 'express'
import {addMenuItem,updateMenu,getMenuByName,getAllMenu,getMenuItemById,deleteMenuItem} from "../controllers/menuController.js"
import { upload } from '../middlewares/multerMiddleware.js'

const router = express.Router()

router.post("/create/:restaurantId",upload.single("image"),addMenuItem)
router.put("/update/:restaurantId/menu/:menuItemId",upload.single("image"),updateMenu)
router.get("/by/:name",getMenuByName)
router.get("/all",getAllMenu)
router.get("/:restaurantId/item/:menuItemId",getMenuItemById)
router.delete("/:restaurantId/delete/:menuItemId",deleteMenuItem)

export const menuItemRouter = router