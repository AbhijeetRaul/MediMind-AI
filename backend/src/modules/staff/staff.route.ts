import {
  Router,
} from "express";

import {
  createReceptionistHandler,
  getReceptionistsHandler,
  deleteReceptionistHandler,
} from "./staff.controller";

const router =
  Router();

router.post(
  "/",
  createReceptionistHandler
);

router.get(
  "/",
  getReceptionistsHandler
);

router.delete(
  "/:id",
  deleteReceptionistHandler
);

export default
router;