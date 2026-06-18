import { Request, Response } from "express";
import { prisma }
from "../../lib/prisma";
import {
  loginUser,
  registerUser,
} from "./auth.service";

export const register = async (
  req: Request,
  res: Response
) => {
  try {
    const user = await registerUser(req.body);

    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const login = async (
  req: Request,
  res: Response
) => {
  try {
    const { email, password } = req.body;

    const user = await loginUser(
      email,
      password
    );

    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

 export const getProfile =
  async (
    req: any,
    res: Response
  ) => {
    try {
      const user =
        await prisma.user.findUnique(
          {
            where: {
              id:
                req.user
                  .userId,
            },

            select: {
              fullName:
                true,
              email:
                true,
              role: true,
            },
          }
        );

      console.log(
        "USER FOUND:",
        user
      );

      return res.json(
        user
      );
    } catch (
      error
    ) {
      console.error(
        "PROFILE ERROR:",
        error
      );

      return res
        .status(500)
        .json({
          message:
            "Failed to fetch profile",
        });
    }
  };