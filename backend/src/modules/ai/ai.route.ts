import { Router } from "express";

import { askAI } from "./ai.controller";

import {
  protect,
} from "../../middleware/auth.middleware";

const router = Router();

router.post(
  "/ask",
  protect,
  askAI
);

export default router;