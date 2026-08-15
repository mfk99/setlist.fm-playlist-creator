import { Router } from "express";
import authentication from "../controllers/authController.js";

const authRouter = Router();

authRouter.get("/me", authentication);

export default authRouter;
