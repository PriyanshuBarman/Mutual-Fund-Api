import express from "express";
import run from "./src/controllers/test.controller.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/ping", async (req, res) => {
  const data = await run();
  res.status(200).json({ message: "ok" });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running");
});
