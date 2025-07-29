import db from "../config/db.config.js";
import asyncHandler from "../utils/asyncHandler.utils.js";
import { buildWhereClause } from "../utils/buildWhereClause.utils.js";

export const filterFunds = asyncHandler(async (req, res) => {
  const { sort_by, order_by = "desc", limit, offset } = req.query;

  const whereCondition = buildWhereClause(req.query);
  const take = limit ? Number(limit) : undefined;
  const skip = offset ? Number(offset) : undefined;

  // Default sort: fund_rating, return_3y (popularity)
  let orderByClause;
  if (!sort_by || sort_by === "popularity") {
    orderByClause = [{ fund_rating: "desc" }, { return_3y: "desc" }];
  } else {
    orderByClause = [{ [sort_by]: order_by }];
  }

  const funds = await db.mutual_fund.findMany({
    where: {
      AND: [
        whereCondition,
        {
          OR: [{ sip_available: "Y" }, { lump_available: "Y" }],
        },
      ],
    },
    orderBy: orderByClause,
    take,
    skip,
  });

  const totalCount = await db.mutual_fund.count({
    where: {
      AND: [
        whereCondition,
        {
          OR: [{ sip_available: "Y" }, { lump_available: "Y" }],
        },
      ],
    },
  });

  res.status(200).json({
    success: true,
    count: funds.length,
    totalCount,
    hasMore: skip + take < totalCount,
    funds,
  });
});
