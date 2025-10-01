import db from "../../config/db.js";
import asyncHandler from "../utils/asyncHandler.utils.js";

export const getCategories = asyncHandler(async (req, res) => {
  const result = await db.$queryRaw`
  SELECT fund_type, GROUP_CONCAT(DISTINCT fund_category ORDER BY fund_category) AS fund_categories
  FROM mutual_fund
  GROUP BY fund_type
`;

  res.status(200).json({ success: true, result });
});
