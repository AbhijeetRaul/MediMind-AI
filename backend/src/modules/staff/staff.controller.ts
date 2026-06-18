import {
  Request,
  Response,
} from "express";

import {
  createReceptionist,
  getReceptionists,
  deleteReceptionist,
} from "./staff.service";

export const
createReceptionistHandler =
async (
  req: Request,
  res: Response
) => {
  try {
    const receptionist =
      await createReceptionist(
        req.body
      );

    res.status(
      201
    ).json(
      receptionist
    );
  } catch (
    error: any
  ) {
    res.status(
      400
    ).json({
      message:
        error.message,
    });
  }
};

export const
getReceptionistsHandler =
async (
  _req:
    Request,
  res:
    Response
) => {
  const staff =
    await getReceptionists();

  res.json(
    staff
  );
};

export const
deleteReceptionistHandler =
async (
  req:
    Request,
  res:
    Response
) => {
  await deleteReceptionist(
    req.params.id as string
  );

  res.json({
    message:
      "Deleted",
  });
};