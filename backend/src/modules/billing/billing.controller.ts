import { Request, Response } from "express";

import {
  createBill,
  createTransaction,
  getBills,
} from "./billing.service";

export const createBillHandler =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const bill =
        await createBill(
          req.body
        );

      res.status(201).json(
        bill
      );
    } catch (error: any) {
  console.log(
    "BILL ERROR:",
    error
  );

  res.status(400).json({
    message:
      error.message,
  });
}
  };

export const createTransactionHandler =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const transaction =
        await createTransaction(
          req.body
        );

      res.status(201).json(
        transaction
      );
    } catch (error: any) {
  console.log(
    "TRANSACTION ERROR:",
    error
  );

  res.status(400).json({
    message:
      error.message,
  });
}
  };

export const getBillsHandler =
  async (
    _req: Request,
    res: Response
  ) => {
    const bills =
      await getBills();

    res.json(bills);
  };