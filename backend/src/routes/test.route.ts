import { Router } from "express";
import {
  protect,
  authorize,
} from "../middleware/auth.middleware";

const router = Router();

router.get(
  "/admin",
  protect,
  authorize("ADMIN"),
  (_req, res) => {
    res.json({
      message:
        "Welcome Admin 🚀",
    });
  }
);

router.get(
  "/doctor",
  protect,
  authorize("DOCTOR"),
  (_req, res) => {
    res.json({
      message:
        "Welcome Doctor 🩺",
    });
  }
);

export default router;