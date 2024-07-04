import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import { bodyValidatorMiddleware } from "../middlewares/body-validator.middleware.js";
import {
  memberLoginValidator,
  memberRegisterValidator,
  partnerRegisterValidator,
} from "../validators/auth.validator.js";

const authRouter = Router();

authRouter
  .route("/login")
  .post(bodyValidatorMiddleware(memberLoginValidator), authController.login)
  .all((_, res) => res.sendStatus(405));

authRouter
  .route("/register/member")
  .post(
    bodyValidatorMiddleware(memberRegisterValidator),
    authController.registerMember
  )
  .all((_, res) => res.sendStatus(405));

authRouter
  .route("/register/partner")
  .post(
    bodyValidatorMiddleware(partnerRegisterValidator),
    authController.registerPartner
  )
  .all((_, res) => res.sendStatus(405));
authRouter
  .get("/google", authController.googleAuth)
  .get("/google/callback", authController.googleAuthCallback);

export default authRouter;
