import { Router } from "express";
import filterRoutes from "./filter.routes.js";
import singleRetrievalRoutes from "./singleRetrieval.routes.js";
import categoriesRoutes from "./categories.routes.js";
import searchRoute from "./search.routes.js";
import amcRoutes from "./amc.routes.js";

const router = Router();

router.use("/funds", singleRetrievalRoutes);
router.use("/funds", filterRoutes);
router.use("/categories", categoriesRoutes);
router.use("/search", searchRoute);
router.use("/amc", amcRoutes);

export default router;
