import { Request, Response } from "express";
import {
  createDoctor,
  getAllDoctors,
  deleteDoctor,
  updateDoctor,
} from "./doctor.service";

export const createDoctorHandler =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const doctor =
        await createDoctor(
          req.body
        );

      res.status(201).json(
        doctor
      );
    } catch (error: any) {
  console.log(
    "DELETE ERROR:",
    error
  );

  res.status(400).json({
    message:
      error.message,
  });
}
  };

export const getDoctorsHandler =
  async (
    _req: Request,
    res: Response
  ) => {
    const doctors =
      await getAllDoctors();

    res.json(doctors);
  };

  export const deleteDoctorHandler =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      await deleteDoctor(
        req.params.id as string
      );

      res.json({
        message:
          "Doctor deleted",
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
updateDoctorHandler =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const doctor =
        await updateDoctor(
          req.params
            .id as string,
          req.body
        );

      res.json(
        doctor
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