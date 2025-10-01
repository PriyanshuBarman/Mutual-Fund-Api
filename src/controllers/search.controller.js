import db from "../../config/db.js";
import asyncHandler from "../utils/asyncHandler.utils.js";
import { normalizeSearchQuery } from "../utils/normalizeSearchQuery.utils.js";

export const search = asyncHandler(async (req, res) => {
  const { limit = 5 } = req.query;
  const query = normalizeSearchQuery(req.query.query);

  const funds = await db.mutual_fund.findMany({
    where: {
      AND: query.split(" ").map((word) => ({
        OR: [
          { name: { contains: word } },
          { short_name: { contains: word } },
          { amc_name: { contains: word } },
          { fund_category: { contains: word } },
        ],
      })),
      plan: "Growth",
    },

    select: {
      name: true,
      short_name: true,
      code: true,
      scheme_code: true,
      ISIN: true,
      fund_category: true,
      detail_info: true,
    },

    take: Number(limit),
  });

  res.status(200).json({ success: true, funds });
});
