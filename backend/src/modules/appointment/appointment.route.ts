import { Router } from "express";

import {
  createAppointmentHandler,
  getAppointmentsHandler,
  deleteAppointmentHandler,
  updateAppointmentHandler,
} from "./appointment.controller";

import {
  protect,
  authorize,
} from "../../middleware/auth.middleware";

const router = Router();

router.post(
  "/",
  protect,
  authorize("ADMIN"),
  createAppointmentHandler
);

router.get(
  "/",
  protect,
  getAppointmentsHandler
);

router.put(
  "/:id",
  protect,
  authorize("ADMIN"),
  updateAppointmentHandler
);

router.delete(
  "/:id",
  protect,
  authorize("ADMIN"),
  deleteAppointmentHandler
);

export default router;