import { Router } from "express";
import { getAmcFunds, getAMCs } from "../controllers/amc.controller.js";

const router = Router();

router.get("/", getAMCs);
router.get("/:amcCode", getAmcFunds);

export default router;
