import { Router } from "express";
import memberController from "../controllers/member.controller.js";
import { bodyValidatorMiddleware } from "../middlewares/body-validator.middleware.js";
import {
  memberUpdatePwdValidator,
  memberUpdateValidator,
} from "../validators/member.validator.js";

const memberRouter = Router();

memberRouter
  .route("/:name-:lastname-:id")
  .get(memberController.getOne)
  .patch(
    bodyValidatorMiddleware(memberUpdateValidator),
    memberController.update
  )
  .put(
    bodyValidatorMiddleware(memberUpdatePwdValidator),
    memberController.updatePassword
  )
  .delete(memberController.delete)
  .all((_, res) => res.sendStatus(405));

export default memberRouter;
