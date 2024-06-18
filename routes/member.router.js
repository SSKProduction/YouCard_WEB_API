import { Router } from "express";
import memberController from "../controllers/member.controller.js";

const memberRouter = Router();

memberRouter
  .route("/:name-:lastname-:id")
  .get(memberController.getOne)
  .all((_, res) => res.sendStatus(405));

export default memberRouter;
