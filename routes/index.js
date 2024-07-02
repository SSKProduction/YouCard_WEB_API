import { Router } from "express";
import authRouter from "./auth.router.js";
import memberRouter from "./member.router.js";
import partnerRouter from "./partner.router.js";
const mainRouter = Router();

mainRouter.use("/auth", authRouter);
mainRouter.use("/member", memberRouter);
mainRouter.use("/partner", partnerRouter);

export default mainRouter;
