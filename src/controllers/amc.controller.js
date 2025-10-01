import db from "../../config/db.js";
import asyncHandler from "../utils/asyncHandler.utils.js";

export const getAMCs = asyncHandler(async (req, res) => {
  const amcs = await db.mutual_fund.findMany({
    select: {
      amc_code: true,
      amc_name: true,
    },
    distinct: ["amc_name"],
  });

  res.status(200).json({ success: true, count: amcs.length, amcs });
});
