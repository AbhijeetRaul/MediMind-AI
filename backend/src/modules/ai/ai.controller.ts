import { Request, Response } from "express";

import {
  medicalAssistant,
} from "./ai.service";

export const askAI =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const { query } =
        req.body;

      const response =
        await medicalAssistant(
          query
        );

      res.json({
        response,
      });
    } catch (error: any) {
      console.error(error);

      res.status(500).json({
        message:
          "AI failed",
      });
    }
  };