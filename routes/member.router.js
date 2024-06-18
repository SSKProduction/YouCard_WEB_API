import { Router } from "express";
import memberController from "../controllers/member.controller.js";
import { bodyValidatorMiddleware } from "../middlewares/body-validator.middleware.js";
import { memberUpdateValidator } from "../validators/member.validator.js";

const memberRouter = Router();

memberRouter
  .route("/:name-:lastname-:id")
  .get(memberController.getOne)
  .patch(
    bodyValidatorMiddleware(memberUpdateValidator),
    memberController.update
  )
  .all((_, res) => res.sendStatus(405));

export default memberRouter;
