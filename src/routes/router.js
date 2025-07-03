import { Router } from "express";
import {
  getAll,
  getFundByCode,
  getFundByISIN,
  getFundBySchemeCode,
} from "../controllers/getAll.controller.js";

export const router = Router();

router.get("/all", getAll);
router.get("/isin/:isin", getFundByISIN);
router.get("/code/:code", getFundByCode);
router.get("/scheme_code/:scheme_code", getFundBySchemeCode);
