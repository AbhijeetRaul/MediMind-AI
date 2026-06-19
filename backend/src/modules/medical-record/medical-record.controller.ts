import { Request, Response } from "express";
import {
  createMedicalRecord,
  getAllMedicalRecords,
  getPatientMedicalRecords,
  deleteMedicalRecord,
} from "./medical-record.service";

export const createMedicalRecordHandler =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const record =
        await createMedicalRecord(
          req.body
        );

      res.status(201).json(
        record
      );
    } catch (
      error: any
    ) {
      res.status(400).json({
        message:
          error.message,
      });
    }
  };

export const getMedicalRecordsHandler =
  async (
    _req: Request,
    res: Response
  ) => {
    const records =
      await getAllMedicalRecords();

    res.json(records);
  };

export const getPatientMedicalRecordsHandler =
  async (
    req: Request,
    res: Response
  ) => {
    const records =
      await getPatientMedicalRecords(
        req.params.patientId
      );

    res.json(records);
  };

export const deleteMedicalRecordHandler =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      await deleteMedicalRecord(
        req.params.id
      );

      res.json({
        message:
          "Medical record deleted",
      });
    } catch (
      error: any
    ) {
      res.status(400).json({
        message:
          error.message,
      });
    }
  };