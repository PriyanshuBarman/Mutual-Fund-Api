import { Router } from "express";
import { search } from "../controllers/search.controller.js";

export const router = Router();

router.get("/", search);

export default router;
