import { Router } from "express";
import partnerController from "../controllers/partner.controller.js";
import { bodyValidatorMiddleware } from "../middlewares/body-validator.middleware.js";
import { partnerUpdate } from "../validators/partner.validator.js";

const partnerRouter = Router();

partnerRouter
  .route("/")
  .get(partnerController.getAll)
  .all((_, res) => res.sendStatus(405));
partnerRouter
  .route("/:id")
  .get(partnerController.getOne)
  .patch(bodyValidatorMiddleware(partnerUpdate), partnerController.update)
  .all((_, res) => res.sendStatus(405));
export default partnerRouter;
