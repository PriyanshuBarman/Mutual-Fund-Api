import db from "../config/db.config.js";
import asyncHandler from "../utils/asyncHandler.utils.js";
import { buildWhereClause } from "../utils/buildWhereClause.utils.js";

export const filterFunds = asyncHandler(async (req, res) => {
  const { sort_by = "fund_rating", order_by = "desc", limit, offset } = req.query;

  const whereCondition = buildWhereClause(req.query);

  const take = limit ? Number(limit) : undefined;
  const skip = offset ? Number(offset) : undefined;

  const funds = await db.mutual_fund.findMany({
    where: whereCondition,
    orderBy: {
      [sort_by]: order_by,
    },
    take,
    skip,
  });

  const totalCount = await db.mutual_fund.count({
    where: whereCondition,
  });

  res
    .status(200)
    .json({
      success: true,
      count: funds.length,
      totalCount,
      hasMore: skip + take < totalCount,
      funds,
    });
});
