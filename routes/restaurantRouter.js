import express from 'express'
import { addRestaurant, loginRestaurant,getAllRestaurant,getRestaurantById,getRestaurantByName,deleteRestaurant,updateRestaurant, logout } from '../controllers/restaurantController.js'
import { upload } from '../middlewares/multerMiddleware.js'
import { restaurantMiddleware } from '../middlewares/userMiddleware.js';

const router = express.Router()

router.post("/register", upload.single("Restaurant_Image"), addRestaurant); 
router.post("/login", loginRestaurant);
router.put(
  "/update",restaurantMiddleware,
  upload.single("Restaurant_Image"),
  updateRestaurant
);

router.get("/by/:restaurantName", getRestaurantByName);
router.get("/all", getAllRestaurant);
router.get("/id/:restaurantId", getRestaurantById);
router.delete("/delete",restaurantMiddleware, deleteRestaurant);
router.post("/logout",logout)


export const restaurantRouter = router