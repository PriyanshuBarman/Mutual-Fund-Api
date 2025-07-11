import "dotenv/config";
import express from "express";
import cors from "cors";
import notFoundHandler from "./src/middlewares/notFoundHandler.js";
import globalErrorHandler from "./src/middlewares/globalErrorHandler.js";
import fundRoutes from "./src/routes/index.routes.js";

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:5173", credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/funds", fundRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Envest Helper API");
});

app.use(notFoundHandler);
app.use(globalErrorHandler);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running");
});
