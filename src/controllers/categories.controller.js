import db from "../config/db.config.js";
import asyncHandler from "../utils/asyncHandler.utils.js";

export const getCategories = asyncHandler(async (req, res) => {
  const categories = await db.mutual_fund.findMany({
    select: { category: true },
    distinct: ["category"],
  });

  const result = [];

  for (const { category } of categories) {
    const subCategories = await db.mutual_fund.findMany({
      where: { category },
      select: { fund_category: true },
      distinct: ["fund_category"],
    });

    result.push({
      category,
      subcategories: subCategories.map((sub) => sub.fund_category),
    });
  }

  res.status(200).json({ success: true, result });
});
