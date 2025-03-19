import express from "express"

import { addressRouter } from "./addressRouter.js"
import { adminRouter } from "./adminRouter.js"
import { cartRouter } from "./cartRouter.js"
import { couponRouter } from "./couponRouter.js"
import { menuItemRouter } from "./menuItemRouter.js"
import { paymentRouter } from "./paymentRouter.js"
import {restaurantRouter} from "./restaurantRouter.js"
import {userRouter} from "./userRouter.js"

const router = express.Router();

router.use("/user", userRouter);
router.use("/admin", adminRouter);
router.use("/address", addressRouter);
router.use("/cart", cartRouter);
router.use("/coupon", couponRouter);
router.use("/menuitem", menuItemRouter);
router.use("/restaurant", restaurantRouter);
router.use("/payment", paymentRouter);

export const apiRouter = router;