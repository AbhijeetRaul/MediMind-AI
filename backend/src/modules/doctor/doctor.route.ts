import { Router } from "express";
import {
  createDoctorHandler,
  getDoctorsHandler,
  deleteDoctorHandler,
  updateDoctorHandler,
} from "./doctor.controller";

import {
  protect,
  authorize,
} from "../../middleware/auth.middleware";

const router = Router();

router.post(
  "/",
  protect,
  authorize("ADMIN"),
  createDoctorHandler
);

router.get(
  "/",
  protect,
  getDoctorsHandler
);

router.delete(
  "/:id",
  deleteDoctorHandler
);

router.put(
  "/:id",
  updateDoctorHandler
);

export default router;