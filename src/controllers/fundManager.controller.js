import db from "../../config/db.js";
import asyncHandler from "../utils/asyncHandler.utils.js";

export const getFundManagerFunds = asyncHandler(async (req, res) => {
  const { managerName } = req.params;

  const funds = await db.mutual_fund.findMany({
    where: {
      fund_manager: {
        contains: managerName,
      },
    },
  });

  res.status(200).json({ success: true, funds });
});
