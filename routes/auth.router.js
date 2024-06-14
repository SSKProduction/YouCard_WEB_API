import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import { bodyValidatorMiddleware } from "../middlewares/body-validator.middleware.js";
import {
  memberLoginValidator,
  memberRegisterValidator,
} from "../validators/auth.validator.js";

const authRouter = Router();

authRouter
  .route("/login")
  .post(bodyValidatorMiddleware(memberLoginValidator), authController.login)
  .all((_, res) => res.sendStatus(405));

authRouter
  .route("/register")
  .post(
    bodyValidatorMiddleware(memberRegisterValidator),
    authController.register
  )
  .all((_, res) => res.sendStatus(405));

authRouter
  .get("/google", authController.googleAuth)
  .get("/google/callback", authController.googleAuthCallback);

export default authRouter;
