import {
  Router,
} from "express";

import {
  createOrder,
} from "./payment.controller";

import {
  protect,
} from "../../middleware/auth.middleware";

const router =
  Router();

router.post(
  "/create-order",
  protect,
  createOrder
);

export default router;