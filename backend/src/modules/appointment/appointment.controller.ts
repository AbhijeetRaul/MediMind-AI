import { Request, Response } from "express";

import {
  createAppointment,
  getAppointments,
  deleteAppointment,
  updateAppointment,
} from "./appointment.service";

export const createAppointmentHandler =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const appointment =
        await createAppointment(
          req.body
        );

      res.status(201).json(
        appointment
      );
    } catch (error: any) {
      res.status(400).json({
        message:
          error.message,
      });
    }
  };

export const getAppointmentsHandler =
  async (
    _req: Request,
    res: Response
  ) => {
    const appointments =
      await getAppointments();

    res.json(
      appointments
    );
  };

  export const
deleteAppointmentHandler =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      await deleteAppointment(
        req.params
          .id as string
      );

      res.json({
        message:
          "Appointment deleted",
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
updateAppointmentHandler =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const appointment =
        await updateAppointment(
          req.params
            .id as string,
          req.body
        );

      res.json(
        appointment
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