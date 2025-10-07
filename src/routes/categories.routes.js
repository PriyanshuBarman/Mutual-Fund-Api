import { Router } from "express";
import {
  getCategories,
  getFundCategoryRank,
} from "../controllers/categories.controller.js";

const router = Router();

router.get("/", getCategories);
router.get("/:schemeCode", getFundCategoryRank);

export default router;
