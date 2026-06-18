import {
  Request,
  Response,
} from "express";

import {
  razorpay,
} from "../../lib/razorpay";

export const
createOrder =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const {
        amount,
      } = req.body;

      const order =
        await razorpay.orders.create(
          {
            amount:
              amount *
              100,

            currency:
              "INR",
          }
        );

      res.json(
        order
      );
    } catch (
      error
    ) {
      console.log(
        error
      );

      res.status(500)
        .json({
          message:
            "Payment failed",
        });
    }
  };