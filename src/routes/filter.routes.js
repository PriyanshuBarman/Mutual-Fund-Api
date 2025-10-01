import { Router } from "express";
import { filterFunds } from "../controllers/filter.controller.js";

const router = Router();

router.get("/", filterFunds); // ?category=Equity&amc_name=HDFC Mutual Fund

export default router;
