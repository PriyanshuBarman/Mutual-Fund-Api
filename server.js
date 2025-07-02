import express from "express";
import "./src/scripts/seedMfData.js";

const app = express();

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running");
});
