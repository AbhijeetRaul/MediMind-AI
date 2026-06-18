import { Router } from "express";

import {
  createBillHandler,
  createTransactionHandler,
  getBillsHandler,
} from "./billing.controller";

import {
  protect,
  authorize,
} from "../../middleware/auth.middleware";

const router = Router();

router.post(
  "/bill",
  protect,
  authorize("ADMIN"),
  createBillHandler
);

router.post(
  "/transaction",
  protect,
  authorize("ADMIN"),
  createTransactionHandler
);

router.get(
  "/",
  protect,
  getBillsHandler
);

export default router;