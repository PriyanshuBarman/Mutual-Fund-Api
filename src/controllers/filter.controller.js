import db from "../config/db.config.js";
import asyncHandler from "../utils/asyncHandler.utils.js";
import { buildWhereClause } from "../utils/buildWhereClause.utils.js";

export const filterFunds = asyncHandler(async (req, res) => {
  const whereCondition = buildWhereClause(req.query);
  const { sort_by = "fund_rating", order_by = "desc", limit } = req.query;

  const funds = await db.mutual_fund.findMany({
    where: whereCondition,
    orderBy: {
      [sort_by]: order_by,
    },
    take: limit ? Number(limit) : undefined,
  });

  res.status(200).json({ success: true, count: funds.length, funds });
});
