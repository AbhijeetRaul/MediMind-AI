import { Router } from "express";

import {
  createPatientHandler,
  getPatientsHandler,
  deletePatientHandler,
  updatePatientHandler,
} from "./patient.controller";

import {
  protect,
  authorize,
} from "../../middleware/auth.middleware";

const router = Router();

router.post(
  "/",
  protect,
  authorize("ADMIN"),
  createPatientHandler
);

router.get(
  "/",
  protect,
  getPatientsHandler
);

router.delete(
  "/:id",
  protect,
  authorize("ADMIN"),
  deletePatientHandler
);

router.put(
  "/:id",
  protect,
  authorize("ADMIN"),
  updatePatientHandler
);

export default router;