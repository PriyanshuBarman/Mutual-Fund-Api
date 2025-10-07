import { Router } from "express";
import {
  getFundByISIN,
  getFundByCode,
  getFundBySchemeCode,
} from "../controllers/singleRetrieval.controller.js";

const router = Router();

router.get("/isin/:isin", getFundByISIN);

router.get("/code/:code", getFundByCode);

router.get("/scheme_code/:schemeCode", getFundBySchemeCode);

export default router;
