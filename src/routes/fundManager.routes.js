import { Router } from "express";
import { getFundManagerFunds } from "../controllers/fundManager.controller.js";

const router = Router();

router.get("/:managerName", getFundManagerFunds);

export default router;
