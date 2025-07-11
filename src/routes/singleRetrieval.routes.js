import { Router } from "express";
import { getFundByIsin, getFundByCode, getFundBySchemeCode } from "../controllers/singleRetrieval.controller.js";

const router = Router();

router.get("/isin/:isin", getFundByIsin);

router.get("/code/:code", getFundByCode);

router.get("/scheme-code/:schemeCode", getFundBySchemeCode);

export default router;
