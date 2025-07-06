import "dotenv/config";
import express from "express";
import { router } from "./src/routes/router.js";
import cors from "cors";

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:5173", credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.send("Welcome to Envest Helper API");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running");
});