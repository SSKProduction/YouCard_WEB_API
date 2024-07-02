import { Router } from "express";
import partnerController from "../controllers/partner.controller.js";

const partnerRouter = Router();

partnerRouter
  .route("/")
  .get(partnerController.getAll)
  .all((_, res) => res.sendStatus(405));
partnerRouter
  .route("/:id")
  .get(partnerController.getOne)
  .all((_, res) => res.sendStatus(405));
export default partnerRouter;
