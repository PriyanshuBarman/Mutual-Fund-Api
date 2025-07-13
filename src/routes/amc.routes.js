import { Router } from "express";
import { getAMCs } from "../controllers/amc.controller.js";

const router = Router();

router.use("/", getAMCs);

export default router;
