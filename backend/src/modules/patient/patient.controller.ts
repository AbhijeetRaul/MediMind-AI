import { Request, Response } from "express";
import {
  createPatient,
  getAllPatients,
  deletePatient,
  updatePatient,
} from "./patient.service";

export const createPatientHandler =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const patient =
        await createPatient(
          req.body
        );

      res.status(201).json(
        patient
      );
    } catch (error: any) {
  console.log(
    "PATIENT ERROR:",
    error
  );

  res.status(400).json({
    message:
      error.message,
  });
}
  };

export const getPatientsHandler =
  async (
    _req: Request,
    res: Response
  ) => {
    const patients =
      await getAllPatients();

    res.json(patients);
  };

  export const
deletePatientHandler =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      await deletePatient(
        req.params
          .id as string
      );

      res.json({
        message:
          "Patient deleted",
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

  export const
updatePatientHandler =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const patient =
        await updatePatient(
          req.params
            .id as string,
          req.body
        );

      res.json(
        patient
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