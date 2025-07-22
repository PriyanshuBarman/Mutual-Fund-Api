import db from "../config/db.config.js";
import asyncHandler from "../utils/asyncHandler.utils.js";
import { normalizeSearchQuery } from "../utils/normalizeSearchQuery.utils.js";

export const search = asyncHandler(async (req, res) => {
  const { limit = 5 } = req.query;
  const query = normalizeSearchQuery(req.query.query);

  const firstTwoQueryWords = query.split(" ").slice(0, 2).join(" ");

  const funds = await db.mutual_fund.findMany({
    where: {
      OR: [
        { name: { contains: firstTwoQueryWords } },
        { short_name: { contains: firstTwoQueryWords } },
        { amc_name: { contains: firstTwoQueryWords } },
        { fund_category: { contains: firstTwoQueryWords } },
      ],
      plan: "Growth",
    },

    orderBy: {
      _relevance: {
        fields: ["name", "short_name", "amc_name", "fund_category"],
        search: query,
        sort: "desc",
      },
    },

    select: {
      name: true,
      code: true,
      scheme_code: true,
      ISIN: true,
      short_name: true,
      short_code: true,
      fund_category: true,
    },

    take: Number(limit),
  });

  res.status(200).json({ success: true, funds });
});
