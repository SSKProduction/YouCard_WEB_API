import { Router } from "express";
import promoController from "../controllers/promo.controller.js";
import { bodyValidatorMiddleware } from "../middlewares/body-validator.middleware.js";
import { promo } from "../validators/promo.validator.js";

const promoRouter = Router();

promoRouter
  .route("/")
  .get(promoController.getAll)
  .post(bodyValidatorMiddleware(promo), promoController.create)
  .all((_, res) => res.sendStatus(405));

export default promoRouter;
