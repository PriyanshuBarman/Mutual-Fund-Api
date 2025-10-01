import db from "../../config/db.js";
import { buildComparisonObject } from "../utils/buildComparisonObject.utils.js";

export const mergeComparisonArr = async (fund) => {
  // Get top 4 similar funds
  const similarFunds = await db.mutual_fund.findMany({
    where: {
      fund_category: fund.fund_category,
      category: fund.category,
      scheme_code: { not: fund.scheme_code },
      plan: fund.plan,
    },
    orderBy: {
      fund_rating: "desc",
    },
    take: 4,
    select: {
      name: true,
      short_name: true,
      scheme_code: true,
      fund_rating: true,
      expense_ratio: true,
      aum: true,
      ISIN: true,
      return_1m: true,
      return_6m: true,
      return_1y: true,
      return_3y: true,
      return_5y: true,
      return_since_inception: true,
    },
  });

  // 🔧 Build comparison array (include current fund + 4 similar funds)
  const comparison = [buildComparisonObject(fund), ...similarFunds.map(buildComparisonObject)];

  return { ...fund, comparison };
};
