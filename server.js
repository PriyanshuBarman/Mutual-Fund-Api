import express from "express";
import { router } from "./src/routes/router.js";
// import "./src/scripts/seedMfData.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running");
});
