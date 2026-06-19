import { Router } from "express";

import {
  createMedicalRecordHandler,
  getMedicalRecordsHandler,
  getPatientMedicalRecordsHandler,
  deleteMedicalRecordHandler,
} from "./medical-record.controller";

import {
  protect,
  authorize,
} from "../../middleware/auth.middleware";

const router = Router();

router.post(
  "/",
  protect,
  authorize(
    "ADMIN",
    "DOCTOR"
  ),
  createMedicalRecordHandler
);

router.get(
  "/",
  protect,
  authorize(
    "ADMIN",
    "DOCTOR",
    "RECEPTIONIST"
  ),
  getMedicalRecordsHandler
);

router.get(
  "/patient/:patientId",
  protect,
  getPatientMedicalRecordsHandler
);

router.delete(
  "/:id",
  protect,
  authorize("ADMIN"),
  deleteMedicalRecordHandler
);

export default router;