import "dotenv/config";
import express from "express";
import cors from "cors";
import notFoundHandler from "./src/middlewares/notFoundHandler.js";
import globalErrorHandler from "./src/middlewares/globalErrorHandler.js";
import routes from "./src/routes/index.routes.js";

const app = express();

const allowOrigins = [process.env.FRONTEND_URL, process.env.DEV_FRONTEND_URL];

app.use(cors({ origin: allowOrigins, credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/mutual-funds", routes);

app.use(notFoundHandler);
app.use(globalErrorHandler);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port", process.env.PORT || 3000);
});
