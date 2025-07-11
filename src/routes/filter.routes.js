import { Router } from "express";
import { filterFunds } from "../controllers/filter.controller.js";

const router = Router();

router.get("/", filterFunds); // /api/v1/funds/filter?category=Equity&fund_house=HDFC

export default router;
