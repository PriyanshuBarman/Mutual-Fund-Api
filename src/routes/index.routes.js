import { Router } from "express";
import filterRoutes from "./filter.routes.js";
import singleRetrievalRoutes from "./singleRetrieval.routes.js";

const router = Router();

router.use("/", singleRetrievalRoutes);
router.use("/", filterRoutes);

export default router;
