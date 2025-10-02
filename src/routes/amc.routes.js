import { Router } from "express";
import { getAmcFunds, getAMCs } from "../controllers/amc.controller.js";

const router = Router();

router.get("/", getAMCs);
router.get("/:amcName", getAmcFunds);

export default router;
