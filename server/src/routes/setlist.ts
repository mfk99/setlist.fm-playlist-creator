import { Router } from "express";
import page from "../controllers/setlistController.js";

const setlistRouter = Router();

setlistRouter.get("/page", page);

export default setlistRouter;
