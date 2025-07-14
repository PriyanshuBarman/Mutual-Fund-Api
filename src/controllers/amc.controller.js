import db from "../config/db.config.js";
import asyncHandler from "../utils/asyncHandler.utils.js";

export const getAMCs = asyncHandler(async (req, res) => {
  // Get all fund houses with counts in a single query
  const fundHousesWithCounts = await db.$queryRaw`
    SELECT 
      fund_house, 
      short_code,
      detail_info,
      COUNT(*) as total_funds,
      MIN(fund_name) as fund_name
    FROM mutual_fund
    GROUP BY fund_house, short_code, detail_info
    ORDER BY fund_house ASC
  `;

  // Get all categories with counts in a single query
  const categoriesWithCounts = await db.$queryRaw`
    SELECT 
      fund_house, 
      category, 
      COUNT(*) as count 
    FROM mutual_fund 
    GROUP BY fund_house, category
  `;

  // Process the results
  const fundHouseMap = new Map();

  // Initialize fund houses
  fundHousesWithCounts.forEach((fh) => {
    fundHouseMap.set(fh.fund_house, {
      fund_name: fh.fund_name,
      fund_house: fh.fund_house,
      short_code: fh.short_code,
      detail_info: fh.detail_info,
      total_funds: Number(fh.total_funds),
      categories: [],
    });
  });

  // Add categories
  categoriesWithCounts.forEach((cat) => {
    const amc = fundHouseMap.get(cat.fund_house);
    if (amc) {
      amc.categories.push({
        name: cat.category,
        count: Number(cat.count),
      });
    }
  });

  const amcs = Array.from(fundHouseMap.values());

  res.status(200).json({ success: true, amcs });
});
