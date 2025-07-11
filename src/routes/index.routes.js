import { Router } from "express";
import filterRoutes from "./filter.routes.js";
import singleRetrievalRoutes from "./singleRetrieval.routes.js";
import categoriesRoutes from "./categories.routes.js";

const router = Router();

router.use("/", singleRetrievalRoutes);
router.use("/", filterRoutes);
router.use("/categories", categoriesRoutes);

export default router;
