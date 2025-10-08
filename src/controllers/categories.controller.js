import db from "../../config/db.js";
import asyncHandler from "../utils/asyncHandler.utils.js";
import { toSafeNumber } from "../utils/formaters.utils.js";

export const getCategories = asyncHandler(async (req, res) => {
  const result = await db.$queryRaw`
  SELECT fund_type, GROUP_CONCAT(DISTINCT fund_category ORDER BY fund_category) AS fund_categories
  FROM mutual_fund
  GROUP BY fund_type
`;

  res.status(200).json({ success: true, result });
});

export const getFundCategoryRank = asyncHandler(async (req, res) => {
  const schemeCode = parseInt(req.params.schemeCode);

  // 1. get fund returns
  const fund = await db.mutual_fund.findUnique({
    where: { scheme_code: schemeCode },
    select: {
      fund_category: true,
      return_1y: true,
      return_3y: true,
      return_5y: true,
      return_since_inception: true,
    },
  });
  if (!fund) throw new Error("Fund not found");

  // 2. category averages
  const categoryAvg = await db.mutual_fund.aggregate({
    _avg: {
      return_1y: true,
      return_3y: true,
      return_5y: true,
    },
    where: { fund_category: fund.fund_category },
  });

  // 3. Raw SQL: compute ranks with window functions but return only this fund's row
  const [rankRow] = await db.$queryRaw`
    SELECT scheme_code, rank_1y, rank_3y, rank_5y
    FROM (
      SELECT
        scheme_code,
        RANK() OVER (PARTITION BY fund_category ORDER BY return_1y DESC) AS rank_1y,
        RANK() OVER (PARTITION BY fund_category ORDER BY return_3y DESC) AS rank_3y,
        RANK() OVER (PARTITION BY fund_category ORDER BY return_5y DESC) AS rank_5y
      FROM mutual_fund
      WHERE fund_category = ${fund.fund_category}
    ) t
    WHERE scheme_code = ${schemeCode};
  `;

  res.status(200).json({
    success: true,
    returns: {
      "1Y": fund.return_1y,
      "3Y": fund.return_3y,
      "5Y": fund.return_5y,
      All: fund.return_since_inception,
    },
    category_average: {
      "1Y": categoryAvg._avg.return_1y ?? null,
      "3Y": categoryAvg._avg.return_3y ?? null,
      "5Y": categoryAvg._avg.return_5y ?? null,
    },
    rank_in_category: {
      "1Y": toSafeNumber(rankRow?.rank_1y),
      "3Y": toSafeNumber(rankRow?.rank_3y),
      "5Y": toSafeNumber(rankRow?.rank_5y),
    },
  });
});
